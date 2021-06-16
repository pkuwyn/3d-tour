import React from "react";

import { Cartesian3, Cartesian2, NearFarScalar } from "cesium";
import { Entity, LabelGraphics, BillboardGraphics, useCesium } from "resium";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import locationIcon from "../assets/icon/location-red.png";

export function HotSpotEntity({ hotspot }) {
  const { viewer, scene } = useCesium();
  const { labelName, x, y, z, up, id } = hotspot;
  const matches = useMediaQuery("(min-width:600px)");

  const size = 30;
  const offset = matches ? 25 : 20;
  const fontSize = matches ? "16px sans-serif" : "14px sans-serif";
  const positionCartesian = new Cartesian3(
    Number(x),
    Number(y),
    Number(z) + Number(up)
  );
  // const clampedCartesian = scene.clampToHeight(positionCartesian);
  return (
    <Entity position={positionCartesian} name={labelName} id={id}>
      <BillboardGraphics image={locationIcon} width={size} height={size} />
      <LabelGraphics
        text={labelName}
        font={fontSize}
        showBackground
        pixelOffset={new Cartesian2(0.0, -offset)}
      />
    </Entity>
  );
}
