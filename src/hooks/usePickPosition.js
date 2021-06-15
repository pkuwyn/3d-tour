import { useEffect } from "react";
import { useCesium } from "resium";
import * as Cesium from "cesium";

// https://sandcastle.cesium.com/index.html?src=Picking.html

export function usePickPosition() {
  let { viewer } = useCesium();
  const { scene, camera, canvas } = viewer;
  var entity = viewer.entities.add({
    label: {
      show: false,
      showBackground: true,
      font: "14px monospace",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(15, 0),
    },
  });

  let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction((click) => {
    let cartesian = viewer.camera.pickEllipsoid(
      click.position,
      scene.globe.ellipsoid
    );
    console.log(cartesian);
    if (cartesian) {
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      console.log(cartographic);
      var longitudeString = Cesium.Math.toDegrees(
        cartographic.longitude
      ).toFixed(3);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
        6
      );

      entity.position = cartesian;
      entity.label.show = true;
      entity.label.text =
        ": " +
        ("   " + longitudeString).slice(-7) +
        "\u00B0" +
        "\n: " +
        ("   " + latitudeString).slice(-7) +
        "\u00B0";
    } else {
      entity.label.show = false;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
