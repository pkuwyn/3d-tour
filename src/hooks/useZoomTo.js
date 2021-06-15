import { useEffect } from "react";
import { useCesium } from "resium";
import { Math } from "cesium";

export function useZoomTo(ref) {
  let { viewer } = useCesium();

  useEffect(() => {
    viewer.zoomTo(ref.current.cesiumElement);
    // viewer.flyTo(ref.current.cesiumElement);
  }, [ref, viewer]);
}
