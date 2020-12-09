import React from "react";
import classes from "./cardStyle.module.css";

const front = (props) => {
  return (
    <div className={classes.front} onClick={props.clicked}>
      {props.children}
    </div>
  );
};

export default front;
