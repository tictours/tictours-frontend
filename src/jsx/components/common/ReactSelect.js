import React from "react";
import Select from "react-select";

function ReactSelect(props) {
  const { label, optionLabel = 'label', optionValue = 'value',formik, ...restProps } = props;
  const selectStyle = {
    borderColor: "#D5DFE7",
    padding: "2px 20px",
    borderRadius: "0.625rem",
  };
  const options = props.options
  const data = options?.map((opt) => {
    return { label: opt[optionLabel], value: opt[optionValue] }
  })

  const isRequired = restProps.required
  const name = restProps.inputId
  const value = restProps.value
  
  return (
    <div className="form-group mb-3">
      {label && <label className="text-label">{label} {isRequired && <span>*</span>}</label>}
      <Select
        {...restProps}
        options={data}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            ...selectStyle,
          }),
        }}
        classNames={{
          control: (state) => "form-control",
        }}
      />
      {!value && formik?.touched[name] && formik?.errors[name] && (
            <div
            className="invalid-feedback animated fadeInUp" style={{ display: "block" }}>{formik.errors[name]}</div>
          )}
    </div>
  );
}

export default ReactSelect;
