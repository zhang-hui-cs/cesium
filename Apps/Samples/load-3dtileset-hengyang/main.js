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
            maximumLevel: 18
        })
    });

    newViewer.scene.debugShowFramesPerSecond = true;

    return newViewer;
}

function add3dTileset() {
    tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: 'http://10.14.3.21:2001/osgb/hengyang/tileset.json',
            immediatelyLoadDesiredLevelOfDetail: true
        })
    );

    viewer.flyTo(tileset);
}

let tileset = null;
const viewer = initialViewer('cesiumContainer');
add3dTileset(viewer);

document.addEventListener('keydown', event => {
    if (event.key == '1') {
        tileset.maximumScreenSpaceError = 16;
    } else if (event.key == '2') {
        tileset.maximumScreenSpaceError = 256;
    } else if (event.key == '3') {
        tileset.maximumScreenSpaceError = 1024;
    }
});
