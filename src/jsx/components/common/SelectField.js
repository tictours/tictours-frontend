import React from 'react'

function SelectField(props) {
    const { label, name, values, options, optionValue,optionLabel,...restProps } = props
    return (
        <div className="form-group mb-3">
            <label className="text-label">{label}</label>
            <select
                {...restProps}
                // defaultValue={"option"}
                id="inputState"
                className="form-control"
                name={name}
                value={values?values[name]:name}
            >
                <option value="option" disabled>
                    Choose...
                </option>
                {options.map((option, key) => (
                    <option key={key} value={optionValue ? option[optionValue]:option}>{optionLabel?option[optionLabel]:option}</option>
                ))}

            </select>
        </div>
    )
}

export default SelectField