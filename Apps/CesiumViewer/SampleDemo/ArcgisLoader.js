define(['Cesium/Scene/ArcGisMapServerImageryProvider'], function(
    ArcGisMapServerImageryProvider
) {
    function ArcgisLoader(theViewer) {
        this._viewer = theViewer;
    }

    ArcgisLoader.prototype.execute = function() {
        const esriProvider = new ArcGisMapServerImageryProvider({
            url:
                'http://172.16.11.6:6080/arcgis/rest/services/CityDesignV6/XJXQCSSJPlanMap/MapServer'
        });

        this._viewer.imageryLayers.addImageryProvider(esriProvider);

        const globe = this._viewer.scene.globe;
        globe.tileLoadProgressEvent.addEventListener(queueLength => {
            console.log(
                `ArcgisLoader 队列总长度: ${queueLength}\t (${globe._surface._tileLoadQueueHigh.length}, ${globe._surface._tileLoadQueueMedium.length}, ${globe._surface._tileLoadQueueLow.length} )`
            );
        });

        const varInterval = setInterval(() => {
            if (globe.tilesLoaded) {
                console.log('ArcgisLoader 加载完成');
                clearInterval(varInterval);
            }
        }, 200);
    };

    return ArcgisLoader;
});
