import React from 'react'
import DatePicker from "react-datepicker";
import CustomModal from '../../layouts/CustomModal';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import InputField from './InputField';
import SelectField from './SelectField';
import notify from './Notify';


const AddModal = ({setShowModal,showModal,title}) => {

  const navigate = useNavigate()
  const date = new Date()

  const initialValues = {cancelDate:date,dueDate:date}
  const TypeOptions = ['Transfer','Hotel','Activity']
  return (
    <>
    <Formik initialValues={initialValues} 
         onSubmit={(values, { setSubmitting }) => {
            setShowModal(false)
            notify({message:`${title} Added Successfully`})
          }}>
        {({
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  })=>(

    <CustomModal
            showModal={showModal}
            title={"Add Fields"}
            handleModalClose={() => {
              setShowModal(false)
            //   setFormComponent('setupForm')
            //   navigate('/enquiry/quotation')
            }
            }
          >
            <div className="card-body">
              <div className="basic-form">
            <form
              onSubmit={handleSubmit}
            >
                  <div className="row">
                    <div className="mb-3 col-md-6">
                        <InputField
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                    />
                    </div>
                   
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Fields
                  </button>
            </form>
          </div>
        </div>
      </CustomModal>
  )}
    </Formik>
    </>
  )
}

export default AddModal