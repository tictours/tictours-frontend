import React from 'react'
import DatePicker from "react-datepicker";
import CustomModal from '../../../../layouts/CustomModal';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import InputField from '../../../common/InputField';
import SelectField from '../../../common/SelectField';
import notify from '../../../common/Notify';


const AddModal = ({setShowModal,showModal}) => {

  const navigate = useNavigate()
  const date = new Date()

  const initialValues = {cancelDate:date,dueDate:date}
  const TypeOptions = ['Transfer','Hotel','Activity']
  return (
    <>
    <Formik initialValues={initialValues} 
         onSubmit={(values, { setSubmitting }) => {
            setShowModal(false)
            notify({message:'Supplier Payment Added Successfully'})
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
            title={"Add Currency"}
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
                    <div className="mb-3 col-md-4">
                        <InputField
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                    />
                    </div>
                    <div className="mb-3 col-md-4">
                        <InputField
                        label="Symbol"
                        name="symbol"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                    />
                    </div>
                    <div className="mb-3 col-md-4">
                        <InputField
                        label="Code"
                        name="code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                    />
                    </div>
                    <div className="mb-3 col-md-4">
                        <InputField
                        label="Exchange Rate"
                        name="rate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        type='number'
                    />
                 </div>
                    <div className="mb-3 col-md-4">
                        <InputField
                        label="Currency Format"
                        name="format"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        type='number'
                    />
                 </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Currency
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