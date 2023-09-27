import React from "react";

function SelectField(props) {
  const {
    formClass,
    selectClass,
    label,
    name,
    values,
    setValue,
    selected = '',
    options,
    optionValue,
    optionLabel,
    onChange,
    showLabelValue=false,
    formik,
    ...restProps
  } = props;

  const isRequired = restProps.required

  const handleSelectChange = (e) => {
    onChange(e)
    if(showLabelValue){
      const selectedLabel = e.target.options[e.target.selectedIndex].text; // Get the selected option's label
      setValue(`${name}Label`,selectedLabel)
    }
  } 
  return (
    <div className={`form-group mb-3 ${formClass}`}>
      {!!label && <label className="text-label">{label} {isRequired && <span>*</span>}</label>}
      <select
        {...restProps}
        // defaultValue={"option"}
        id="inputState"
        className={`form-control ${selectClass}`}
        name={name}
        value={values && !!values[name] ? values[name] : selected}
        onChange={handleSelectChange}
      >
        {!!options?.length ? (
          <>
            <option value="" selected="true" disabled>
              Choose...
            </option>
            {options.map((option, key) => (
              <option
                key={key}
                value={optionValue ? option[optionValue] : option}
              >
                {optionLabel ? option[optionLabel] : option}
              </option>
            ))}
          </>
        ) : (
          <option value="option" disabled>
            Empty !
          </option>
        )}
      </select>
      {formik?.touched[name] && formik?.errors[name] && (
            <div
            className="invalid-feedback animated fadeInUp" style={{ display: "block" }}>{formik.errors[name]}</div>
          )}
    </div>
  );
}

export default SelectField;
