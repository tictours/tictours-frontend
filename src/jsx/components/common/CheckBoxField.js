import React from "react";

export function CheckBoxField(props) {
    const {
        key = '',
        name,
        value,
        inputValue = '',
        className = '',
        labelClassName = '',
        inputClassName = '',
        ...restProps
    } = props;

    return (
        <div
            key={key}
            className={`form-check form-check-inline  fw-normal ${className}`}
        >
            <label className={`form-check-label ${labelClassName}`}>
                <input
                    {...restProps}
                    name={name}
                    type="checkbox"
                    className={`form-check-input ${inputClassName}`}
                    value={value}
                //   defaultChecked
                />
                {inputValue}
            </label>
            {/* <span className="ms-2 amenity-count">{`12${key}`}</span> */}
        </div>
    );
}
