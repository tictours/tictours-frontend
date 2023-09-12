import React from "react";
import Select from "react-select";

function ReactSelect(props) {
  const { label, ...restProps } = props;
  const selectStyle = {
    borderColor: "#D5DFE7",
    padding: "2px 20px",
    borderRadius: "0.625rem",
  };
  return (
    <div className="form-group mb-3">
      {label && <label className="text-label">{label}</label>}
      <Select
        {...restProps}
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
