const Cesium = window.Cesium;

function initialViewer(element) {
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
            maximumLevel: 18
        })
    });
}

function addWmts(theViewer) {
    if (theViewer) {
        const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url:
                'http://10.14.3.71:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJBaseMap/MapServer/WMTS',
            layer: 'XJXQCSSJBaseMap',
            style: 'default',
            tileMatrixSetID: 'default028mm',
            format: 'image/png'
        });

        imageryProvider.readyPromise.then(status => {
            if (status) {
                theViewer.camera.flyTo({
                    destination: imageryProvider.rectangle
                });
            }
        });

        theViewer.imageryLayers.addImageryProvider(imageryProvider);
    }
}

function addArcgisLayer(theViewer) {
    if (theViewer) {
        theViewer.imageryLayers.addImageryProvider(
            new Cesium.ArcGisMapServerImageryProvider({
                url: `http://10.14.3.71:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJPlanMap/MapServer`
            })
        );

        theViewer.imageryLayers.addImageryProvider(
            new Cesium.ArcGisMapServerImageryProvider({
                url: `http://10.14.3.71:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJDataMap/MapServer`,
                layers: '68'
            })
        );
    }
}

const viewer = initialViewer('cesiumContainer');
addWmts(viewer);
addArcgisLayer(viewer);
