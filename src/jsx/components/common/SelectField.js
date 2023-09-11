import React from 'react'

function SelectField(props) {
    const { formClass, selectClass, label, name, values, selected, options, optionValue, optionLabel, ...restProps } = props
    return (
        <div className={`form-group mb-3 ${formClass}`}>
            {!!label && <label className="text-label">{label}</label>}
            <select
                {...restProps}
                // defaultValue={"option"}
                id="inputState"
                className={`form-control ${selectClass}`}
                name={name}
                value={values ? values[name] : selected}
            >
                {!!options?.length ?
                    <>
                        <option value="option" disabled>
                            Choose...
                        </option>
                        {options.map((option, key) => (
                            <option key={key} value={optionValue ? option[optionValue] : option}>{optionLabel ? option[optionLabel] : option}</option>
                        ))}
                    </> : <option value="option" disabled>
                        Empty !
                    </option>
                }
            </select>
        </div>
    )
}

export default SelectField