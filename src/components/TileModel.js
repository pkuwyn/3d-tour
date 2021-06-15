import React from "react";
import { Cesium3DTileset } from "resium";
import {
  useZoomTo,
  useGlobe,
  useFPV,
  useTest,
  usePickPosition,
} from "../hooks";

//utils
import { useGlobal } from "../utils";

export function TileModel({ url, ...otherProps }) {
  const ref = React.useRef(null);
  const { globalState } = useGlobal();
  console.log(globalState);
  useZoomTo(ref);
  useGlobe();
  // useTest();
  // useFPV();
  // usePickPosition();
  return (
    <>
      <Cesium3DTileset url={url} maximumScreenSpaceError={1} ref={ref} />
    </>
  );
}
