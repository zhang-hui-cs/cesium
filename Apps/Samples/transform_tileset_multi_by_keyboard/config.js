const Cesium = window.Cesium;

function ConfigTool() {
    this._config = {
        viewer: null,
        modelMatrix: Cesium.Matrix4.fromArray([
            0.9933820974048085,
            -0.05921169013565031,
            0.0984173983953198,
            0,
            0.07757388029737741,
            0.9777858491060097,
            -0.1947232045331208,
            0,
            -0.08470124940773618,
            0.20106916481479492,
            0.9759082381604578,
            0,
            -450.7107137899068,
            1138.1161687285526,
            4524.277490399174,
            1
        ]),
        tilesetUrls: [
            'http://localhost:2001/%E6%B9%98%E6%B1%9F%E6%96%B0%E5%8C%BA%E5%9F%8E%E5%B8%82%E8%AE%BE%E8%AE%A1%E5%B9%B3%E5%8F%B0/meixihu_prime/tileset.json',
            'http://localhost:2001/%E6%B9%98%E6%B1%9F%E6%96%B0%E5%8C%BA%E5%9F%8E%E5%B8%82%E8%AE%BE%E8%AE%A1%E5%B9%B3%E5%8F%B0/%E5%9C%B0%E5%9D%97/meixihu/tileset.json'
        ],
        tilesetObjs: [],
        center: {
            position: Cesium.Cartesian3.fromDegrees(
                112.870655,
                28.180864,
                10000
            ),
            axisX: null,
            axisY: null,
            axisZ: null
        }
    };

    Object.defineProperty(this, 'config', {
        get: () => this._config
    });
}

function loadTileset(config) {
    if (Array.isArray(config.tilesetUrls)) {
        config.tilesetUrls.forEach(ii => {
            config.tilesetObjs.push(
                config.viewer.scene.primitives.add(
                    new Cesium.Cesium3DTileset({
                        url: ii,
                        modelMatrix: config.modelMatrix,
                        debugShowBoundingVolume: true
                    })
                )
            );
        });
    }
}

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

function loadArcgis(viewer) {
    if (viewer) {
        viewer.imageryLayers.addImageryProvider(
            new Cesium.ArcGisMapServerImageryProvider({
                url:
                    'http://10.14.3.71:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJPlanMap/MapServer'
            })
        );
    }
}

function addCenterPoint(config) {
    if (config && config.viewer) {
        const cartographic = Cesium.Cartographic.fromCartesian(
            config.center.position
        );

        const position = Cesium.Cartesian3.fromDegrees(
            (cartographic.longitude * 180.0) / Math.PI,
            (cartographic.latitude * 180.0) / Math.PI,
            30
        );

        const pointEntity = config.viewer.entities.add({
            position: position,
            point: {
                pixelSize: 10,
                color: Cesium.Color.INDIGO
            }
        });

        console.log(pointEntity);

        config.viewer.zoomTo(pointEntity);
    }
}

function initialCenter(config) {
    if (config && config.viewer) {
        addCenterPoint(config);

        // config.viewer.camera.flyTo({
        //     destination: config.center.position
        // });

        const matrix4 = Cesium.Transforms.eastNorthUpToFixedFrame(
            config.center.position
        );

        config.center.axisX = Cesium.Cartesian3.fromCartesian4(
            Cesium.Matrix4.getColumn(matrix4, 0, new Cesium.Cartesian4())
        );

        config.center.axisY = Cesium.Cartesian3.fromCartesian4(
            Cesium.Matrix4.getColumn(matrix4, 1, new Cesium.Cartesian4())
        );

        config.center.axisZ = Cesium.Cartesian3.fromCartesian4(
            Cesium.Matrix4.getColumn(matrix4, 2, new Cesium.Cartesian4())
        );
    }
}

ConfigTool.prototype.initial = function() {
    this._config.viewer = initialViewer('cesiumContainer');
    initialCenter(this._config);
    loadArcgis(this._config.viewer);
    loadTileset(this._config);
};

ConfigTool._instance = null;

ConfigTool.getInstance = function() {
    if (ConfigTool._instance === null) {
        ConfigTool._instance = new ConfigTool();
        ConfigTool._instance.initial();
    }

    return ConfigTool._instance;
};

export { ConfigTool };
