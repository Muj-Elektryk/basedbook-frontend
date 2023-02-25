import React from "react";
import classes from "./Checkbox.module.css";

const Checkbox = React.forwardRef((props:any, ref) => {
    return (
      <div className={classes.checkboxFlex}>
        <input
          // @ts-ignore
          ref={ref}
          id={props.id}
          type={props.radio ? "radio" : "checkbox"}
          name={props.name}
          className={props.radio ? classes.radio : classes.checkbox}
          onChange={props.onChange}
          checked={props.checked}
        />
        <label htmlFor={props.id} className={classes.label}>
          {props.label || "nieDałeśLabela"}
        </label>
      </div>
    );
});

export default Checkbox;