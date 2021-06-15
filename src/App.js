import React from "react";

import {
  Viewer,
  Entity,
  ScreenSpaceEventHandler,
  ScreenSpaceEvent,
  LabelGraphics,
} from "resium";
import {
  Rectangle,
  Camera,
  ScreenSpaceEventType,
  KeyboardEventModifier,
} from "cesium";

//mui
import { makeStyles } from "@material-ui/core/styles";

//utils
import { GlobalContext, reducer, initialState } from "./utils";

//local
import { TileModel, ClickPositionEvent } from "./components/";
//config
import config from "./config/swcConfig";
// import config from "./config/dbnjConfig";

const { appTitle, dataUri, tileModelUri } = config;

const useStyles = makeStyles({
  "@global": {
    ".cesium-widget-credits": {
      display: "none !important",
    },
  },
});

//设置Home键视角-俯视舍卫城
const extent = Rectangle.fromDegrees(116.2923, 40.0092, 116.29301, 40.0089);
Camera.DEFAULT_VIEW_RECTANGLE = extent;
Camera.DEFAULT_VIEW_FACTOR = 0;

const App = () => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  //getData
  React.useEffect(() => {
    document.title = appTitle;
    fetch(dataUri)
      .then((res) => res.json())
      .then((jsonData) => dispatch({ type: "init", data: jsonData }))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useStyles();

  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      {globalState.data.length > 0 && (
        <Viewer
          full
          baseLayerPicker={false}
          animation={false}
          timeline={false}
          vrButton={false}
          homeButton
          navigationHelpButton={false}
          geocoder={false}
          skyBox={false}
          sceneModePicker={false}
        >
          <TileModel url={tileModelUri} />
          <ClickPositionEvent></ClickPositionEvent>

          {globalState.pin ? (
            <Entity position={globalState.pin.position} name="clicked">
              {/* <BillboardGraphics
                image={ExcavationLogo}
                width={size}
                height={size}
              /> */}
              <LabelGraphics
                text="clicked"
                font="16px sans-serif"
                showBackground
                // pixelOffset={new Cartesian2(0.0, -offset)}
              />
              {/* <HotSpotDescription hotspot={hotspot} /> */}
            </Entity>
          ) : null}
        </Viewer>
      )}
    </GlobalContext.Provider>
  );
};

export default App;
