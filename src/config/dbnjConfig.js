import { Cartesian3 } from "cesium";

export const appTitle = "澹泊宁静一期考古遗址";

export const dataUri = `${process.env.REACT_APP_DATA_URI}/dbnj-data.json`;
export const imgRootUri = `${process.env.REACT_APP_DATA_URI}/img/dbnj`;

export const extent = {
  west: 116.289886,
  south: 40.007385,
  east: 116.290788,
  north: 40.007981,
};
export const tileModelUri =
  "http://archaeology.yungujian.com/dbnj/20210105/3dtile/Scene/dbnj_3dtile_0105.json";

const config = { appTitle, dataUri, tileModelUri };

export const calcCameraFlyTo = (position) => {
  return new Cartesian3(position.x - 2.46, position.y + 6.3, position.z + 4.5);
};

let direction = new Cartesian3(
  0.3951563557908955,
  -0.75336484149765,
  -0.5256356818874456
);
let up = new Cartesian3(
  0.3575604131719229,
  -0.40093786411836985,
  0.8434449478469378
);

export const cameraFlyToOrientation = {
  direction,
  up,
};
