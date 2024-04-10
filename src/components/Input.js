import React from "react";

const Input = (props) => {

  const { label, value, set , isError } = props;

  const validate = (e) => {
    if (e.target.value === "") {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
  }
  return (
    <React.Fragment>
      <label>{label}</label>
      <input
        className = {isError ? 'inputError' : ''}
        type="text"
        value={value}
        onChange={(e) => {
          props.set(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default Input;
