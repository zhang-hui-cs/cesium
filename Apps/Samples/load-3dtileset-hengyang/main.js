function initialViewer(element) {
    const newViewer = new Cesium.Viewer(element, {
        baseLayerPicker: false,
        fullscreenButton: false,
        homeButton: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        animation: false,
        navigationHelpButton: false,
        infoBox: false,
        geocoder: false,
        targetFrameRate: 25,
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
            url:
                'http://t0.tianditu.gov.cn/img_w/wmts?tk=9d2964079a8920b154e7bebe798f80ca',
            layer: 'img',
            style: 'default',
            tileMatrixSetID: 'w',
            format: 'tiles',
            maximumLevel: 18,
        }),
    });

    newViewer.scene.debugShowFramesPerSecond = true;

    return newViewer;
}

function add3dTileset(viewer) {
    const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: 'http://localhost:2001/immovables/main/tileset.json',
        })
    );

    viewer.flyTo(tileset);
}

function main() {
    const viewer = initialViewer('cesiumContainer');
    add3dTileset(viewer);

    document.addEventListener('keydown', (event) => {
        if (event.key == '1') {
            setSSE(viewer, 16);
            // tileset.maximumScreenSpaceError = 16;
        } else if (event.key == '2') {
            setSSE(viewer, 64);
        } else if (event.key == '3') {
            // tileset.maximumScreenSpaceError = 128;
            setSSE(viewer, 128);
        } else if (event.key == '4') {
            // tileset.maximumScreenSpaceError = 256;
            setSSE(viewer, 256);
        } else if (event.key == '5') {
            // tileset.maximumScreenSpaceError = 512;
            setSSE(viewer, 512);
        }
    });
}

function setSSE(viewer, sse) {
    const primitives = viewer.scene.primitives;
    for (let i = 0; i < primitives.length; i++) {
        const item = primitives.get(i);
        if (item instanceof Cesium.Cesium3DTileset) {
            item.maximumScreenSpaceError = sse;
        }
    }
}

main();
