import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import CustomModal from '../../../../layouts/CustomModal';
import { notify } from '../../../common/Notify';
import { Formik } from 'formik';
import SelectField from '../../../common/SelectField';
import InputField from '../../../common/InputField';



function AddUser({showModal,setShowModal}) {
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formValidityDate, setFormValidityDate] = useState(new Date());


    const formSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        notify('Completed notify')
      }
      const initialValues = {}
      const marketTypeOptions = ["Type 1", "Type 2", "Type 3"];
  return (
    <>
    <CustomModal
            showModal={showModal}
            title={"Add User"}
            handleModalClose={() => setShowModal(false)}
          >
             <Formik
        initialValues={initialValues}
        // validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-md-6  mb-2">
                <div className="form-group mb-3">
                  <InputField
                    label="Name"
                    name="singleBed"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              </div>
              <div className="col-md-6  mb-2">
                <div className="form-group mb-3">
                  <InputField
                    label="Phone"
                    name="singleBed"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              </div>
              <div className="col-md-6  mb-2">
                <div className="form-group mb-3">
                  <InputField
                    label="Email"
                    name="singleBed"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <SelectField
                  label="Role Type"
                  name="marketType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values}
                  options={marketTypeOptions}
                />
              </div>
              <div className="col-md-6 m-b30">
                <label>From Date</label>
                <DatePicker
                  className="form-control"
                  selected={values.roomStartDate}
                  onChange={(date) => setFieldValue("roomStartDate", date)}
                />
              </div>
              <div className="col-md-6 m-b30">
                <label>To Date</label>
                <DatePicker
                  className="form-control"
                  selected={values.roomEndDate}
                  onChange={(date) => setFieldValue("roomEndDate", date)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
                   Add User
                  </button>
          </form>
        )}
      </Formik>
          </CustomModal>
    </>
  )
}

export default AddUser;