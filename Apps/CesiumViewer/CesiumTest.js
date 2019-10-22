define([
    'Cesium/Core/Cartesian3',
    'Cesium/Core/defined',
    'Cesium/Core/Ion',
    'Cesium/Core/IonResource',
    'Cesium/Core/Math',
    'Cesium/Core/Matrix3',
    'Cesium/Core/ScreenSpaceEventHandler',
    'Cesium/Core/ScreenSpaceEventType',
    'Cesium/Core/Transforms',
    'Cesium/Scene/Cesium3DTileset',
    './SampleDemo/ArcgisLoader',
    './SampleDemo/TilesetLoader',
    './SampleDemo/WmtsLoader'
], function(
    Cartesian3,
    defined,
    Ion,
    IonResource,
    CesiumMath,
    Matrix3,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Transforms,
    Cesium3DTileset,
    ArcgisLoader,
    TilesetLoader,
    WmtsLoader
) {
    'use strict';

    function CesiumTest(theViewer) {
        this._viewer = theViewer;
    }

    CesiumTest.prototype.execute = function() {
        Ion.defaultAccessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYmM0ZWUwZS01ZGI1LTRjYTEtOTM4Yi1hNmU3MzRiMzQxZjIiLCJpZCI6NzQ4NSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0OTUxMjU3OX0.MQCNQxnMHinQd-qkt-oOkUpIgkl4sRPh4o8s3l3UTOI';

        config(this._viewer);

        addDemoes(this._viewer);

        this._viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(112.956038, 28.251618, 1000),
            duration: 0
        });
    };

    function addDemoes(viewer) {
        // let loader = new WmtsLoader(viewer);
        // loader.execute();

        // new TilesetLoader(viewer).execute();

        new ArcgisLoader(viewer).execute();
    }

    function config(viewer) {
        viewer.bottomContainer.style.display = 'none';
        viewer.timeline.container.style.display = 'none';
        viewer.animation.container.style.display = 'none';
        viewer._toolbar.style.display = 'none';

        viewer.scene.debugShowFramesPerSecond = true;
        viewer.scene.requestRenderMode = true;

        // viewer.scene.screenSpaceCameraController.enableTilt = false;
        // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 750;
        // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 15000;
    }

    return CesiumTest;
});
