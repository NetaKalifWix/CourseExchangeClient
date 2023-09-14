import React from "react";

const Input = (props) => {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <input
        type="text"
        value={props.value}
        onChange={(e) => {
          props.set(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default Input;
