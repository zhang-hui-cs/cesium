define([
    'Cesium/Core/Cartesian3',
    'Cesium/Core/Cartesian4',
    'Cesium/Core/Color',
    'Cesium/Core/defined',
    'Cesium/Core/Matrix4',
    'Cesium/Core/Transforms',
    'Cesium/DataSources/PolylineArrowMaterialProperty',
    'Cesium/Scene/Cesium3DTileset',
    'Cesium/Scene/ClippingPlane',
    'Cesium/Scene/ClippingPlaneCollection'
], function(
    Cartesian3,
    Cartesian4,
    Color,
    defined,
    Matrix4,
    Transforms,
    PolylineArrowMaterialProperty,
    Cesium3DTileset,
    ClippingPlane,
    ClippingPlaneCollection
) {
    function TilesetLoader(theViewer) {
        this._viewer = theViewer;
    }

    TilesetLoader.prototype.execute = function() {
        const tileset = this._viewer.scene.primitives.add(
            new Cesium3DTileset({
                url: 'http://localhost:2001/osgb/main/tileset.json',
                clippingPlanes: new ClippingPlaneCollection({
                    planes: [
                        new ClippingPlane(new Cartesian3(1, 0, 0), 0)
                        // new ClippingPlane(new Cartesian3(0, 1, 0), 0),
                        // new ClippingPlane(new Cartesian3(-1, 0, 0), 50),
                        // new ClippingPlane(new Cartesian3(-1, 0, 0), 200),
                        // new ClippingPlane(new Cartesian3(0, 1, 0), 2000),
                        // new ClippingPlane(new Cartesian3(0, -1, 0), 2000)
                    ]
                })
            })
        );

        const that = this;
        tileset.readyPromise.then(theTileset => {
            let pt = null;
            if (defined(theTileset.root.transform)) {
                pt = Matrix4.getTranslation(
                    theTileset.root.transform,
                    new Cartesian3()
                );
            } else {
                pt = Cartesian3.clone(
                    theTileset.root.boundingSphere.center,
                    new Cartesian3()
                );
            }

            that._viewer.entities.add({
                position: pt,
                point: {
                    pixelSize: 25
                }
            });

            drawAxis(that, pt);
        });

        this._viewer.flyTo(tileset);
    };

    function drawAxis(loader, pt) {
        const matrix4 = Transforms.eastNorthUpToFixedFrame(pt);

        let cartesian4 = new Cartesian4();

        cartesian4 = Matrix4.getColumn(matrix4, 0, cartesian4);
        let axis = new Cartesian3(cartesian4.x, cartesian4.y, cartesian4.z);
        drawAxisInternal(loader._viewer, pt, axis, Color.RED.withAlpha(0.5));

        cartesian4 = Matrix4.getColumn(matrix4, 1, cartesian4);
        axis = new Cartesian3(cartesian4.x, cartesian4.y, cartesian4.z);
        drawAxisInternal(loader._viewer, pt, axis, Color.GREEN.withAlpha(0.5));

        cartesian4 = Matrix4.getColumn(matrix4, 2, cartesian4);
        axis = new Cartesian3(cartesian4.x, cartesian4.y, cartesian4.z);
        drawAxisInternal(loader._viewer, pt, axis, Color.BLUE.withAlpha(0.5));
    }

    function drawAxisInternal(theViewer, pt, normal, color) {
        const dir = Cartesian3.multiplyByScalar(normal, 75, new Cartesian3());
        const pt2 = Cartesian3.add(pt, dir, new Cartesian3());

        theViewer.entities.add({
            polyline: {
                positions: [pt, pt2],
                width: 20,
                material: new PolylineArrowMaterialProperty(color)
            }
        });
    }

    return TilesetLoader;
});
