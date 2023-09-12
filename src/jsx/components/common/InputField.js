import React from "react";

function InputField(props) {
  const {
    label,
    type = "text",
    isTextarea = false,
    placeholder = "",
    name,
    values,
    inputValue,
    ...restProps
  } = props;
  return (
    <div className="form-group mb-3">
      {label && <label className="text-label">{label}</label>}
      {isTextarea ? (
        <textarea
          {...restProps}
          className="form-control"
          placeholder={placeholder}
          name={name}
          value={values ? values[name] : inputValue}
        />
      ) : (
        <input
          {...restProps}
          type={type}
          className="form-control"
          placeholder={placeholder}
          name={name}
          value={values ? values[name] : inputValue}
        />
      )}
    </div>
  );
}

export default InputField;
