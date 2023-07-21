import React from 'react'

function InputField(props) {
  const { label, type = 'text', placeholder = '', name, values, ...restProps } = props
  return (
    <div className="form-group mb-3">
      {label && <label className="text-label">{label}</label>}
      <input
        {...restProps}
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={values[name]}
      />
    </div>
  )
}

export default InputField