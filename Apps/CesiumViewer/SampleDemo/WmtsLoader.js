define(['Cesium/Scene/WebMapTileServiceImageryProvider'], function(
    WebMapTileServiceImageryProvider
) {
    function WmtsLoader(theViewer) {
        this._viewer = theViewer;
    }

    WmtsLoader.prototype.execute = function() {
        for (const layerName of [
            // '001_010',
            // '011_020',
            // '021_030',
            // '031_040',
            // '041_050',
            // '051_060',
            // '061_070',
            // '071_080',
            // '081_090',
            '091_135'
        ]) {
            const wmts = new WebMapTileServiceImageryProvider({
                url: `http://swz-desktop:6080/arcgis/rest/services/cs25d_northeast/${layerName}/MapServer/WMTS`,
                layer: layerName,
                style: 'default',
                tileMatrixSetID: 'default028mm',
                format: 'image/png',
                cache: {
                    enable: true,
                    maxLength: 2048
                }
            });

            this._viewer.imageryLayers.addImageryProvider(wmts);
        }
    };

    return WmtsLoader;
});
