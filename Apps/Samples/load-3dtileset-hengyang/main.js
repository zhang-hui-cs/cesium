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
            url: 'http://10.14.3.21:2001/osgb/hengyang/tileset.json',
        })
    );

    // viewer.flyTo(tileset);

    tileset.readyPromise.then(function (theTileset) {
        const sphere = theTileset.boundingSphere;
        const center = sphere.center;
        const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        console.log('tileset.readyPromise.transform', matrix);

        let cartesian4 = Cesium.Matrix4.getColumn(
            matrix,
            1,
            new Cesium.Cartesian4()
        );
        cartesian4 = Cesium.Cartesian4.multiplyByScalar(
            cartesian4,
            sphere.radius * 1.5,
            new Cesium.Cartesian4()
        );

        const cartesian3 = new Cesium.Cartesian3(
            cartesian4.x,
            cartesian4.y,
            cartesian4.z
        );

        const modelMatrix = Cesium.Matrix4.fromTranslation(
            cartesian3,
            new Cesium.Matrix4()
        );

        const tileset2 = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: 'http://10.14.3.21:2001/osgb/hengyang/tileset.json',
                modelMatrix: modelMatrix,
            })
        );

        viewer.flyTo(tileset2);
    });
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
