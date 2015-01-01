import React from 'react'
import Select from "react-select";


function ReactSelect(props) {
  const { ...restProps } = props
  return (
    <Select  {...restProps} />
  )
}

export default ReactSelect