define(['Cesium/Scene/ArcGisMapServerImageryProvider'], function(
    ArcGisMapServerImageryProvider
) {
    'use strict';

    function ArcgisLoader(theViewer) {
        this._viewer = theViewer;
    }

    ArcgisLoader.prototype.execute = function() {
        const layerIds = [];
        for (let i = 0; i <= 170; i++) {
            layerIds.push(i);
        }
        const esriProvider = new ArcGisMapServerImageryProvider({
            url:
                'http://swz-desktop:6080/arcgis/rest/services/cssj/XJXQCSSJPlanMap/MapServer',
            usePreCachedTilesIfAvailable: false
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
