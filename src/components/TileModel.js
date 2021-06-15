import React, { useRef } from "react";
import { Cesium3DTileset } from "resium";
import { useZoomTo, useGlobe } from "../hooks";

export function TileModel({ url, ...otherProps }) {
  const ref = useRef(null);
  useZoomTo(ref);
  useGlobe();
  return (
    <>
      <Cesium3DTileset url={url} maximumScreenSpaceError={1} ref={ref} />
    </>
  );
}
