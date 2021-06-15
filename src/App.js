import React from "react";

import { Viewer, Entity } from "resium";
import { Rectangle, Camera } from "cesium";

//mui
import { makeStyles } from "@material-ui/core/styles";

//local
import { TileModel } from "./components/";

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
  console.log(dataUri);
  const [data, setData] = React.useState(null);

  //getData
  React.useEffect(() => {
    document.title = appTitle;
    fetch(dataUri)
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useStyles();
  return (
    data && (
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
        <TileModel
          // url={`${process.env.PUBLIC_URL}/tileset/swc/swc_cesium.json`}
          url={tileModelUri}
        />
      </Viewer>
    )
  );
};

export default App;
