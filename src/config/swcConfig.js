import { Cartesian3 } from "cesium";

export const appTitle = "舍卫城南城门考古遗址";

export const extent = {
  west: 116.292153,
  south: 40.008887,
  east: 116.293168,
  north: 40.009258,
};

export const imgRootUri = `${process.env.REACT_APP_DATA_URI}/img/swc`;
// export const extent = [116.292153 40.009258]
// export const extent = [
//   new Cartesian3(-2166957.502576819, 4385975.14136971, 4078783.7254041163),
//   // new Cartesian3(-2166962.4495083825,4385984.152390585,4078771.682076293),
//   // new Cartesian3(-2166995.756152846,4385951.647763015,4078788.050793515),
//   new Cartesian3(-2167002.922853718, 4385961.516259566, 4078773.815402211),
// ];
export const dataUri = `${process.env.REACT_APP_DATA_URI}/swc-data.json`;

export const tileModelUri =
  "http://archaeology.yungujian.com/demo/swcModelViewer/Scene/swc_cesium.json";

//飞到一个点默认的飞行参数
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
