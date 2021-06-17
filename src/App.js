import React from "react";

import { Viewer, Entity, LabelGraphics, Scene, Globe } from "resium";
import { Rectangle, Camera, Color } from "cesium";

//mui
import { makeStyles } from "@material-ui/core/styles";

//utils
import { GlobalContext, reducer, initialState } from "./utils";

//local
import {
  TileModel,
  ClickPositionEvent,
  ClickEntityEvent,
  HotSpotEntity,
} from "./components";
import { ControlDrawer, PlayFab } from "./components/controls";
//config
import { appTitle, dataUri, tileModelUri, extent } from "./config";

const useStyles = makeStyles({
  "@global": {
    ".cesium-widget-credits": {
      display: "none !important",
    },
  },
});

//设置Home视角
const homeViewExtent = Rectangle.fromDegrees(
  extent.west,
  extent.south,
  extent.east,
  extent.north
);
// const homeViewExtent = Rectangle.fromCartesianArray(extent);
Camera.DEFAULT_VIEW_RECTANGLE = homeViewExtent;
Camera.DEFAULT_VIEW_FACTOR = 0;

const App = () => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  const positionLabel = globalState.pin ? (
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
  ) : null;

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

  //inject global css
  useStyles();

  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      {globalState.data.length > 0 ? (
        <>
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
            infoBox={false}
          >
            <Scene backgroundColor={Color.LIGHTSKYBLUE}>
              <Globe show={false}></Globe>
            </Scene>
            <TileModel url={tileModelUri} />
            <ClickPositionEvent></ClickPositionEvent>
            <ClickEntityEvent></ClickEntityEvent>
            {globalState.data
              .filter(({ entity }) => entity)
              .map((hotspot) => {
                return (
                  <HotSpotEntity
                    hotspot={hotspot}
                    key={hotspot.id}
                  ></HotSpotEntity>
                );
              })}

            {/* UI elements */}
            <ControlDrawer> </ControlDrawer>
            <PlayFab minFlyDuration={2000}></PlayFab>
          </Viewer>
        </>
      ) : null}
    </GlobalContext.Provider>
  );
};

export default App;

//https://materialdesignicons.com/
