import React from "react";

const Input = (props) => {
  const { label, value, type, set, isError } = props;

  const validate = (e) => {
    if (e.target.value === "") {
      e.target.style.border = "1px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
  };
  return (
    <React.Fragment>
      <label>{label}</label>
      <input
        className={isError ? "inputError" : ""}
        value={value}
        type={type ? type : "text"}
        onChange={(e) => {
          set ? set(e.target.value) : alert("please login")
        }}
      />
    </React.Fragment>
  );
};

export default Input;
