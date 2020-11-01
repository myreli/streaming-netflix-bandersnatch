class VideoMediaPlayer {
    constructor({ manifest, network, videoComponent }) {
        this.manifest = manifest
        this.network = network
        this.videoComponent = videoComponent
        this.videoElement = null
        this.sourceBuffer = null
        this.selected = {}
        this.videoDuration = 0
        this.activeItem = {}
        this.selections = []
    }

    initializeCodec() {
        this.videoElement = document.getElementById("vid")
        const mediaSourceSupported = !!window.MediaSource

        if (!mediaSourceSupported) {
            alert('seu browser ou sistema não tem suporte a MSE')
            return
        }

        const codecSupported = MediaSource.isTypeSupported(this.manifest.codec)

        if(!codecSupported) {
            alert(`Seu browser não suporta o codec ${this.manifest.codec}`)
            return
        }

        const mediaSource = new MediaSource()
        this.videoElement.src = URL.createObjectURL(mediaSource)
        mediaSource.addEventListener("sourceopen", this.sourceOpenWrapper(mediaSource))
    }

    sourceOpenWrapper(mediaSource) {
        return async(_) => {
            this.sourceBuffer = mediaSource.addSourceBuffer(this.manifest.codec)
            const selected = this.selected = this.manifest.intro

            mediaSource.duration = this.videoDuration // não definir a duração deixa o vídeo como "LIVE" - assim como na netflix bandersnatch 
            await this.fileDownload(selected.url)
            setInterval(this.waitForQuestions.bind(this), 200)
        }
    }

    waitForQuestions() {
        const currentTime = parseInt(this.videoElement.currentTime)

        const option = this.selected.at === currentTime

        if(!option) return

        if(this.activeItem.url === this.selected.url) return

        this.videoComponent.configureModal(this.selected.options)

        this.activeItem = this.selected
    }

    async currentFileResolution() {
        const LOWEST_RESOLUTION = 144
        const prepareUrl = {
            // TODO: disponibilizar um arquivo de vídeo ainda menor, somente para calcular o throughput 
            url: this.manifest.finalizar.url,
            fileResolution: LOWEST_RESOLUTION,
            fileResolutionTag: this.manifest.fileResolutionTag,
            hostTag: this.manifest.hostTag
        }

        const url = this.network.parseManifestUrl(prepareUrl)
        return this.network.getProperResolution(url)
    }

    async nextChunk(data) {
        const key = data.toLowerCase()
        const selected = this.manifest[key]
        this.selected = {
            ...selected,
            at: parseInt(this.videoElement.currentTime + selected.at)
        }

        this.manageLag(this.selected)
        this.videoElement.play()

        await this.fileDownload(selected.url)
    }

    // TODO: melhorar o gerenciamento de lag utilizando os cálculos de tempo (start e end) de forma dinamica
    async manageLag(selected) {
        if(!!~this.selections.indexOf(selected.url)) {
            selected.at += 5
            return
        }

        this.selections.push(selected.url)
    }

    async fileDownload(url) {
        const fileResolution = await this.currentFileResolution()
        const prepareUrl = {
            url,
            fileResolution,
            fileResolutionTag: this.manifest.fileResolutionTag,
            hostTag: this.manifest.hostTag
        }

        const finalUrl = this.network.parseManifestUrl(prepareUrl)

        console.log(finalUrl)
        
        this.setVideoPlayerDuration(finalUrl)
        const data = await this.network.fetchVideo(finalUrl)

        this.processBufferSegments(data)
    }

    setVideoPlayerDuration(finalUrl) {
        const bars = finalUrl.split('/')
        const [name, videoDuration ] = bars[bars.length - 1].split('-')
        this.videoDuration += parseFloat(videoDuration)
    }

    async processBufferSegments(allSegments) {
        const sourceBuffer = this.sourceBuffer
        sourceBuffer.appendBuffer(allSegments)

        return new Promise((resolve, reject) => {
            const updateEnd = (_) => {
                sourceBuffer.removeEventListener("updateend", updateEnd)
                sourceBuffer.timestampOffset = this.videoDuration

                return resolve()
            }
            sourceBuffer.addEventListener("updateend", updateEnd)

            sourceBuffer.addEventListener("error", reject)
        })
    }
}