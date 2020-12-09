import React from "react";
import classes from "./cardStyle.module.css";

const back = (props) => {
  return (
    <div className={classes.back} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default back;
