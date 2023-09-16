import React from "react";
import Select from "react-select";

function ReactSelect(props) {
  const { label, optionLabel = 'label', optionValue = 'value', ...restProps } = props;
  const selectStyle = {
    borderColor: "#D5DFE7",
    padding: "2px 20px",
    borderRadius: "0.625rem",
  };
  const options = props.options
  const data = options?.map((opt) => {
    return { label: opt[optionLabel], value: opt[optionValue] }
  })
  console.log('select', data)
  return (
    <div className="form-group mb-3">
      {label && <label className="text-label">{label}</label>}
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
    </div>
  );
}

export default ReactSelect;
