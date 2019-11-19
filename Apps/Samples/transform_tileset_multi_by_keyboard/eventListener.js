import { ConfigTool } from './config.js';
import { Transform } from './transform.js';

const Cesium = window.Cesium;

function EventListener() {}

EventListener.prototype.onKeyDown = function() {
    document.addEventListener('keydown', event => {
        let offset = null;
        let rotation = null;
        const config = ConfigTool.getInstance().config;
        if (event.keyCode === 38) {
            // up arrow
            offset = Cesium.Cartesian3.multiplyByScalar(
                config.center.axisY,
                1,
                new Cesium.Cartesian3()
            );
        } else if (event.keyCode === 40) {
            // down arrow
            offset = Cesium.Cartesian3.multiplyByScalar(
                config.center.axisY,
                -1,
                new Cesium.Cartesian3()
            );
        } else if (event.keyCode === 37) {
            // left arrow
            offset = Cesium.Cartesian3.multiplyByScalar(
                config.center.axisX,
                -1,
                new Cesium.Cartesian3()
            );
            // move(option.tileset, option.tilesetParameters.centerAxisX, -1);
        } else if (event.keyCode === 39) {
            // right arrow
            offset = Cesium.Cartesian3.multiplyByScalar(
                config.center.axisX,
                1,
                new Cesium.Cartesian3()
            );
        } else if (event.key === '[') {
            // [
            // rotation = Cesium.Quaternion.fromAxisAngle(
            //     config.center.axisZ,
            //     (-0.005 * Math.PI) / 180
            // );
        } else if (event.key === ']') {
            // ]
            // rotation = Cesium.Quaternion.fromAxisAngle(
            //     config.center.axisZ,
            //     (0.005 * Math.PI) / 180
            // );
        }

        if (offset) {
            config.tilesetObjs.forEach(ii => {
                const modelMatrix = Transform.translate(ii, offset);
                if (modelMatrix) {
                    config.modelMatrix = modelMatrix;
                }
            });
        }

        if (rotation) {
            config.tilesetObjs.forEach(ii => {
                const modelMatrix = Transform.rotate(ii, rotation);
                if (modelMatrix) {
                    config.modelMatrix = modelMatrix;
                }
            });
        }

        console.log('modelMatrix', config.modelMatrix);
    });
};

export { EventListener };
