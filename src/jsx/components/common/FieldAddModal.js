import React, { useEffect } from 'react'
import DatePicker from "react-datepicker";
import CustomModal from '../../layouts/CustomModal';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import InputField from './InputField';
import SelectField from './SelectField';
import notify from './Notify';


const AddModal = ({setShowModal,showModal,title,editDetails,setEditDetails}) => {

  const navigate = useNavigate()
  const date = new Date()
  const isEdit = !!Object.keys(editDetails).length
  console.log('is edit',isEdit,editDetails)

  const initialValues = {cancelDate:date,dueDate:date}
  const TypeOptions = ['Transfer','Hotel','Activity']

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Handle form submission here
      setShowModal(false)
      setEditDetails({})
      notify({message:`${title} ${isEdit ? 'Edited' : 'Added'} Successfully`})
    },
  });

  useEffect(() => {
    // You can set the field value using setFieldValue
    if(isEdit){
      formik.setFieldValue('name', editDetails.name); // Replace 'fieldName' and 'New Value' with your actual field name and value
    }else{
      formik.setFieldValue('name', ''); // Replace 'fieldName' and 'New Value' with your actual field name and value
    }
  }, [isEdit]);
  return (
    <CustomModal
            showModal={showModal}
            title={`${isEdit ? 'Edit' : 'Add'} Fields`}
            handleModalClose={() => {
              setShowModal(false)
              setEditDetails({})
            //   setFormComponent('setupForm')
            //   navigate('/enquiry/quotation')
            }
            }
          >
            <div className="card-body">
              <div className="basic-form">
            <form
              onSubmit={formik.handleSubmit}
            >
                  <div className="row">
                    <div className="mb-3 col-md-6">
                        <InputField
                        label="Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        values={formik.values}
                    />
                    </div>
                   
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {`${isEdit ? 'Edit' : 'Add'} Fields`}
                  </button>
            </form>
          </div>
        </div>
      </CustomModal>
  )
}

export default AddModal