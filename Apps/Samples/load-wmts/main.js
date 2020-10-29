const Cesium = window.Cesium;

function initialViewer(element) {
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle(
        (112.48 * Math.PI) / 180.0,
        (27.971 * Math.PI) / 180.0,
        (112.972 * Math.PI) / 180.0,
        (28.391 * Math.PI) / 180.0
    );

    return new Cesium.Viewer(element, {
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
}

function addWmts(theViewer) {
    if (theViewer) {
        let imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url:
                'http://10.14.3.230:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJBaseMap/MapServer/WMTS',
            layer: 'XJXQCSSJBaseMap',
            style: 'default',
            tileMatrixSetID: 'default028mm',
            format: 'image/png',
        });

        theViewer.imageryLayers.addImageryProvider(imageryProvider);
    }
}

function addArcgisLayer(theViewer) {
    if (theViewer) {
        theViewer.imageryLayers.addImageryProvider(
            new Cesium.ArcGisMapServerImageryProvider({
                url: `http://172.30.3.199:6080/arcgis/rest/services/hx/JSXMSPJG_YZT/MapServer`,
            })
        );
    }
}

const viewer = initialViewer('cesiumContainer');
viewer.camera.flyHome(0);
// addWmts(viewer);
addArcgisLayer(viewer);
