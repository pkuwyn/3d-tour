import { useEffect } from "react";
import { useCesium } from "resium";

export function useZoomTo(ref) {
  let { viewer } = useCesium();

  useEffect(() => {
    viewer.zoomTo(ref.current.cesiumElement);
  }, [ref, viewer]);
}
