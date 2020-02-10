const Cesium = window.Cesium;

function initialViewer(element) {
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = new Cesium.Rectangle(
        (112.48 * Math.PI) / 180.0,
        (27.971 * Math.PI) / 180.0,
        (112.972 * Math.PI) / 180.0,
        (28.391 * Math.PI) / 180.0
    );
    // Cesium.Camera.DEFAULT_VIEW_FACTOR = -0.05;

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
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url:
                'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            maximumLevel: 17
        })
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //     url:
        //         'http://t0.tianditu.gov.cn/img_w/wmts?tk=9d2964079a8920b154e7bebe798f80ca',
        //     layer: 'img',
        //     style: 'default',
        //     tileMatrixSetID: 'w',
        //     format: 'tiles',
        //     maximumLevel: 18
        // })
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
            format: 'image/png'
        });

        // theViewer.imageryLayers.addImageryProvider(imageryProvider);

        imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
            url:
                'http://10.14.3.230:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJPlanMap_2/MapServer/WMTS',
            layer: 'XJXQCSSJPlanMap_2',
            style: 'default',
            tileMatrixSetID: 'default028mm',
            format: 'image/png'
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
viewer.camera.flyHome(0);
addWmts(viewer);
// addArcgisLayer(viewer);
