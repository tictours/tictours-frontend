import React from "react";

function InputField(props) {
  const {
    label,
    type = "text",
    isTextarea = false,
    placeholder = "",
    name,
    values,
    inputValue = '',
    className = '',
    labelClassName = '',
    inputClassName = '',
    ...restProps
  } = props;

  const isRequired = restProps.required
  return (
    <div className={`form-group mb-3 ${className}`}>
      {label && <label className={`text-label ${labelClassName}`}>{label} {isRequired && <span>*</span>}</label>}
      {isTextarea ? (
        <textarea
          {...restProps}
          className={`form-control ${inputClassName}`}
          placeholder={placeholder}
          name={name}
          value={values && !!values[name] ? values[name] : inputValue}
        />
      ) : (
        <input
          {...restProps}
          type={type}
          className={`form-control ${inputClassName}`}
          placeholder={placeholder}
          name={name}
          value={values && values[name] ? values[name] : inputValue}
        />
      )}
    </div>
  );
}

export default InputField;
