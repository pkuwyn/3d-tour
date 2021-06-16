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

export default config;
