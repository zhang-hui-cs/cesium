const Cesium = window.Cesium;

function Transform() {}

Transform.translate = function(tileset, offset) {
    if (tileset && offset) {
        const matrix = Cesium.Matrix4.fromTranslation(offset);
        return (tileset.modelMatrix = Cesium.Matrix4.multiply(
            tileset.modelMatrix,
            matrix,
            new Cesium.Matrix4()
        ));
    }
};

Transform.rotate = function(tileset, quaternion) {
    if (tileset && quaternion) {
        const matrix = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
            Cesium.Cartesian3.ZERO,
            quaternion,
            new Cesium.Cartesian3(1, 1, 1)
        );

        return (tileset.modelMatrix = Cesium.Matrix4.multiply(
            tileset.modelMatrix,
            matrix,
            new Cesium.Matrix4()
        ));
    }
};

export { Transform };
