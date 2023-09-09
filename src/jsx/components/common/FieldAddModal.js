import React, { useEffect } from 'react'
import DatePicker from "react-datepicker";
import CustomModal from '../../layouts/CustomModal';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import InputField from './InputField';
import SelectField from './SelectField';
import notify from './Notify';
import { axiosPost } from '../../../services/AxiosInstance';
import { useDispatch } from 'react-redux';
import { FormAction } from '../../../store/slices/formSlice';


const AddModal = (props) => {
  const {btnTitle='Fields',setShowModal,showModal,
         title,editId,setEditId,parentName,parentData,url} = props

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const date = new Date()
  const isEdit = !!editId
  // console.log('is edit',isEdit,editId)

  const initialValues = {name:''}
  const TypeOptions = ['Transfer','Hotel','Activity']

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async(values) => {
      // Handle form submission here
      try {
        
        const response = await axiosPost(url,values)
        if(response.success){
          dispatch(FormAction.setRefresh())
          formik.setFieldValue('name','')
          setShowModal(false)
          if(isEdit){
            setEditId('')
          }
          notify({message:`${title} ${isEdit ? 'Edited' : 'Added'} Successfully`})
        }
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  });

  // useEffect(() => {
  //   // You can set the field value using setFieldValue
  //   if(isEdit){
  //     formik.setFieldValue('name', editId.name); // Replace 'fieldName' and 'New Value' with your actual field name and value
  //   }else{
  //     formik.setFieldValue('name', ''); // Replace 'fieldName' and 'New Value' with your actual field name and value
  //   }
  // }, [isEdit]);
  return (
    <CustomModal
            showModal={showModal}
            title={`${isEdit ? 'Edit' : 'Add'} ${title}`}
            handleModalClose={() => {
              setShowModal(false)
              setEditId('')
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
                    { !!parentName && <div className="mb-3 col-md-6">
                    <SelectField
                            label={parentName}
                            name={'type'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            values={formik.values}
                            options={parentData}
                            optionValue='id'
                            optionLabel='name'
                        />
                    </div> }
                   
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {`${isEdit ? 'Edit' : 'Add'} ${btnTitle}`}
                  </button>
            </form>
          </div>
        </div>
      </CustomModal>
  )
}

export default AddModal