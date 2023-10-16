import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CustomModal from "../../../layouts/CustomModal";
import notify from "../../common/Notify";
import { Formik, useFormik } from "formik";
import SelectField from "../../common/SelectField";
import InputField from "../../common/InputField";
import ReactSelect from "../../common/ReactSelect";
import { axiosPost, axiosPut } from "../../../../services/AxiosInstance";
import { URLS } from "../../../../constants";
import { useDispatch } from "react-redux";
import { FormAction } from "../../../../store/slices/formSlice";
import { notifyCreate, notifyError } from "../../../utilis/notifyMessage";
import { useAsync } from "../../../utilis/useAsync";

const statusOptions = [
  { label: "Active", value:1 },
  { label: "Inactive", value:0 },
];
const AddAgent = ({ showModal, setShowModal, editId, setEditId }) => {

  const isEdit = !!editId
  const url = URLS.AGENT_URL
  const editUrl = `${URLS.AGENT_URL}/${editId}`
  const countryData = useAsync(URLS.COUNTRY_URL) 
  const editData = useAsync(editUrl,isEdit) 
  const data = editData?.data?.data

  const dispatch = useDispatch()
  const initialValues = {
    name:'',phone:'',email:'',address:'',country:{label:'',value:''},status:{ label: "Active", value:1 },
  };
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setValues,
    resetForm
  } = useFormik({initialValues,
    onSubmit: async(values) => {
      try {
        let response;
        const data = {
          name : values.name,
          phone : values.phone,
          email : values.email,
          address : values.address,
          country_id : values.country.value,
        }
    
        if (isEdit) {
          response = await axiosPut(editUrl, data);
        } else {
          response = await axiosPost(url, data);
        }
        if (response.success) {
          dispatch(FormAction.setRefresh());
          resetForm()
          setShowModal(false);
          if (isEdit) {
            setEditId("");
          }
          notifyCreate('Agent', isEdit)
        }
      } catch (error) {
        const errMsg = error.response?.data?.data?.errors
        const firstErr = Object.values(errMsg)[0][0]
        notifyError(firstErr ? firstErr : 'Oops Something Went Wrong')
      }
    }
  })
  

  useEffect(() => {
    if(isEdit && showModal){
      const obj = {
        name : data?.name,
        phone : data?.phone,
        email : data?.email,
        address : data?.address,
        country : {label:data?.country_name,value:data?.country_id},
      }
      setValues(obj)
    // setFieldValue('name',data?.name)
    // setFieldValue('phone',data?.phone)
    // setFieldValue('email',data?.email)
    // setFieldValue('address',data?.address)
    // setFieldValue('country',{label:data?.country_name,value:data?.country_id})
  }
  
    return () => {
      resetForm()
    }
  }, [editId,data?.id,showModal])
  
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={`${isEdit?'Edit':'Add'} Agent`}
        handleModalClose={() => {
          setShowModal(false) 
          setEditId('')
        }}
      >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6  mb-2">
                  <InputField
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
                <div className="col-md-6  mb-2">
                  <InputField
                    label="Phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
                <div className="col-md-6  mb-2">
                  <InputField
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
                <div className="col-md-6  mb-2">
                  <div className="form-group mb-3">
                    <label className="text-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <ReactSelect
                    value={values.country}
                    label="Country"
                    options={countryData?.data?.data}
                    optionLabel='name'
                    optionValue='id'
                    onChange={(selected) => setFieldValue("country", selected)}
                  />
                </div>
                <div className="col-lg-6 mb-2">
                  <ReactSelect
                      isSearchable={false}
                      label="Status"
                      options={statusOptions}
                      optionLabel="label"
                      optionValue="value"
                      value={values?.status}
                      onChange={(selected) =>
                        setFieldValue("status", selected)
                      }
                    />
                  </div>
                {/* <div className="col-md-6 mb-2">
                  <SelectField
                    label="Role Type"
                    name="marketType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                    options={marketTypeOptions}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <ReactSelect
                    label='Country'
                    options={countryOptions}
                    onChange={(selected) =>
                      setFieldValue("mealType", selected)
                    }
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <ReactSelect
                    label='Language'
                    options={languageOptions}
                    onChange={(selected) =>
                      setFieldValue("mealType", selected)
                    }
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
                </div> */}
              </div>
              <button type="submit" className="btn btn-primary mt-4">
              {`${isEdit?'Edit':'Add'} Agent`}
              </button>
            </form>
      </CustomModal>
    </>
  );
};

export default AddAgent;
