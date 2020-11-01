const MANIFEST_URL = 'manifest.json'
const localHost = ['127.0.0.1', 'localhost']

async function main() {
    const isLocal = !!~localHost.indexOf(window.location.hostname)
    const manifest = await (await fetch(MANIFEST_URL)).json()
    console.log(isLocal)
    console.log(manifest)
    const host = isLocal ? manifest.localHost : manifest.productionHost

    const videoComponent = new VideoComponent()

    const network = new Network({ host })

    const videoPlayer = new VideoMediaPlayer({
        manifest,
        network,
        videoComponent
    })

    videoPlayer.initializeCodec()
    videoComponent.initializePlayer()

    window.nextChunk = (data) => videoPlayer.nextChunk(data)
}

window.onload = main