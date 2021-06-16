import React from "react";
import { useCesium } from "resium";

// mui
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

export default function HideEntitiesSwitch(props) {
  const { viewer, entityCollection } = useCesium();
  const [state, setState] = React.useState(entityCollection._show);
  const handleClick = () => {
    entityCollection._show = !entityCollection._show;
    setState(entityCollection._show);
  };
  return (
    <FormControlLabel
      control={
        <Switch
          color="primary"
          checked={entityCollection._show}
          onChange={handleClick}
          name="知识点"
        />
      }
      label="知识点"
    />
  );
}
