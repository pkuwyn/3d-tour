import React from "react";
import { Cesium3DTileset } from "resium";
import { useZoomTo } from "../hooks";

//utils
import { useGlobal } from "../utils";

export function TileModel({ url, ...otherProps }) {
  const ref = React.useRef(null);
  useZoomTo(ref);

  return (
    <>
      <Cesium3DTileset url={url} maximumScreenSpaceError={1} ref={ref} />
    </>
  );
}
