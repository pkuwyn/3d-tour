import { useEffect } from "react";
import { useCesium } from "resium";

export function useGlobe() {
  let { viewer } = useCesium();

  useEffect(() => {
    viewer.scene.globe.show = false;
  }, [viewer]);
}
