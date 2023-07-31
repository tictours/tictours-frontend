import React from 'react'
import DatePicker from "react-datepicker";


const SetupForm = ({formik,setFormComponent}) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = formik

  const formSubmit = (e) => {
    e.preventDefault()
    setFormComponent('packageForm')
    console.log('submited',values)
  }
  return (
    <>
    <form 
    onSubmit={formSubmit}
    >
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <label>Package Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Start Date</label>
                      <DatePicker  className="form-control custom-input"
                        selected={values.formStartDate}
                        onChange={(date) => setFieldValue('formStartDate',date)}
                        />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>End Date</label>
                      <DatePicker  className="form-control custom-input"
                        selected={values.formEndDate}
                        onChange={(date) => setFieldValue('formEndDate',date)}
                        />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Adult</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        // placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Child</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        // placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-3">
                      <label>Destination</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control custom-input"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Dubai</option>
                        <option>Sharjah</option>
                        <option>Qatar</option>
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Validity</label>
                      <DatePicker  className="form-control custom-input"
                        selected={values.formValidityDate}
                        onChange={(date) => setFieldValue('formValidityDate',date)}
                        />
                    </div>
                    </div>
                  {/* <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <label>State</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Zip</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Check me out</label>
                    </div>
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Setup itinerary
                  </button>
                </form>
    </>
  )
}

export default SetupForm