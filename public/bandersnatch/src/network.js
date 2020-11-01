class Network {
    constructor({ host }) {
        this.host = host
    }

    parseManifestUrl({ url, fileResolution, fileResolutionTag, hostTag }) {
        return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host)
    }

    async fetchVideo(url) {
        const response = await fetch(url)
        return response.arrayBuffer()
    }

    async getProperResolution(url) {
        const LOWEST_RESOLUTION = 144
        const startMs = Date.now()
        const response = await fetch(url)
        await response.arrayBuffer()
        const endMs = Date.now()
        const durationInMs = (endMs - startMs)

        // TODO: foi feito calculo da duração em vez do throughput para simplificar

        const resolutions = [
            { start: 3001, end: 20000, resolution: 144 },
            { start: 901, end: 3000, resolution: 360 },
            { start: 0, end: 900, resolution: 720 },
        ]

        const item = resolutions.find(item => {
            return item.start <= durationInMs && item.end >= durationInMs
        })

        if(!item) return LOWEST_RESOLUTION
        
        return item.resolution
    }
}