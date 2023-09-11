const Input = (props) => {
  return (
    <label>
      {props.label}
      <input
        type="text"
        value={props.value}
        onChange={(e) => {
          props.set(e.target.value);
        }}
      />
    </label>
  );
};

export default Input;
