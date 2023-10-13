import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CustomModal from "../../../../layouts/CustomModal";
import notify from "../../../common/Notify";
import { Formik, useFormik } from "formik";
import SelectField from "../../../common/SelectField";
import InputField from "../../../common/InputField";
import ReactSelect from "../../../common/ReactSelect";
import { signUp } from "../../../../../services/AuthService";
import { useAsync } from "../../../../utilis/useAsync";
import { URLS } from "../../../../../constants";
import { notifyCreate, notifyError } from "../../../../utilis/notifyMessage";
import { FormAction } from "../../../../../store/slices/formSlice";
import { useDispatch } from "react-redux";
import { formatDate, parseDate } from "../../../../utilis/date";
import CustomDatePicker from "../../../common/CustomDatePicker";
import { axiosPost, axiosPut } from "../../../../../services/AxiosInstance";

function AddUser({ showModal, setShowModal, editId, setEditId }) {
  const isEdit = !!editId;
  const editUrl = `${URLS.USER_GET_BY_ID_URL}/${editId}`
  const editData = useAsync(editUrl,isEdit)
  const tableData = editData?.data?.data

   const signUp = (values,id) => {
    //axios call
    let postData
    postData = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      first_name: values.firstName,
      last_name: values.secondName,
      role_id: values.role.value,
      country_id: values?.country?.value,
      language: values.language.value,
      address: values.address,
      start_date: formatDate(values.fromDate),
      end_date: formatDate(values.toDate),
    };
    if(!id){
      postData = {...postData,
        password: values.password,
        c_password: values.password,}
    }
  
    const baseUrl = process.env.REACT_APP_API_URL
    if(!!id){
     return axiosPut(baseUrl + `${URLS.USER_UPDATE_URL}/${id}`, postData);
    }else{
      return axiosPost(baseUrl + URLS.REGISTER_URL, postData);
    }
  }
  
  const dispatch = useDispatch();
  const initialValues = {};
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      signUp(values,editId)
        .then((res) => {
          if (isEdit) {
            setEditId("");
          }
          dispatch(FormAction.setRefresh());
          resetForm();
          setShowModal(false);
          notifyCreate(values.username, isEdit);
          // notify({message:`User ${isEdit ? 'Edited' : 'Added'} Successfully`})
        })
        .catch((err) => {
          console.log("sign err", err);
          notifyError(err);
        });
    },
  });
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if(isEdit){
      const role = tableData.roles[0]
    const value = {
    username: tableData.username,
    email: tableData.email,
    // password: tableData.password,
    phone: tableData.phone,
    firstName : tableData.first_name,
    secondName : tableData.last_name,
    role: {label:role.name,value:role.id},
    country: {label:tableData.country.name,value:tableData.country.id},
    language: {label:tableData.language_name,value:tableData.language},
    address: tableData.address,
    fromDate : tableData.start_date,
    toDate : tableData.end_date,
    }
    formik.setValues(value)
  }
  
    return () => {
      
    }
  }, [tableData])
  // const marketTypeOptions = ["Type 1", "Type 2", "Type 3"];
  // const countryOptions = [
  //   { label: "Country 1", value: "country1" },
  //   { label: "Country 2", value: "country2" },
  //   { label: "Country 3", value: "country3" },
  //   { label: "Country 4", value: "country4" },
  //   { label: "Country 5", value: "country5" },
  // ];
  // const languageOptions = [
  //   { label: "Language 1", value: "language1" },
  //   { label: "Language 2", value: "language2" },
  //   { label: "Language 3", value: "language3" },
  //   { label: "Language 4", value: "language4" },
  //   { label: "Language 5", value: "language5" },
  // ];
  const roleData = useAsync(URLS.USER_ROLE_URL);
  const roleOptions = roleData?.data?.data;
  const countryData = useAsync(URLS.COUNTRY_URL);
  const countryOptions = countryData?.data?.data;
  const languageData = useAsync(URLS.LANGUAGE_URL);
  const languageOptions = languageData?.data?.data;
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={`${isEdit ? "Edit" : "Add"} User`}
        handleModalClose={() => {
          setShowModal(false);
          setEditId("");
        }}
      >
        {/* <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setShowModal(false)
            setEditId('')
            notify({message:`User ${isEdit ? 'Edited' : 'Added'} Successfully`})
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
          }) => ( */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6  mb-2">
              <InputField
                label="User Name"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
              />
            </div>
            {!isEdit && <div className="col-md-6  mb-2">
              <InputField
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
              />
            </div>}
            <div className="col-md-6  mb-2">
              <InputField
                label="First Name"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
              />
            </div>
            <div className="col-md-6  mb-2">
              <InputField
                label="Last Name"
                name="secondName"
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
              {/* <div className="form-group mb-3">
                <label className="text-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
              </div> */}
              <InputField
                label="Address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                isTextarea
              />
            </div>
            <div className="col-md-6 mb-2">
              <ReactSelect
                label="Staff Role"
                options={roleOptions}
                optionLabel="name"
                optionValue="id"
                value={values.role}
                onChange={(selected) => setFieldValue("role", selected)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <ReactSelect
                label="Country"
                options={countryOptions}
                optionLabel="name"
                optionValue="id"
                value={values.country}
                onChange={(selected) => setFieldValue("country", selected)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <ReactSelect
                label="Language"
                options={languageOptions}
                optionLabel="language"
                optionValue="id"
                value={values.language}
                onChange={(selected) => setFieldValue("language", selected)}
              />
            </div>

            <div className="col-md-6 m-b30">
              {/* <label>From Date</label>
              <DatePicker
                dateFormat="yyyy-MM-dd"
                className="form-control"
                selected={parseDate(values.fromDate)}
                onChange={(date) => setFieldValue("fromDate", date)}
              /> */}
              <CustomDatePicker
                      label="From Date"
                      selected={formik.values?.fromDate}
                      onChange={(date) =>
                        formik.setFieldValue("fromDate", date)
                      }
                    />
            </div>
            <div className="col-md-6 m-b30">
              {/* <label>To Date</label>
              <DatePicker
                className="form-control"
                selected={parseDate(values.toDate)}
                onChange={(date) => setFieldValue("toDate", date)}
              /> */}
              <CustomDatePicker
                      label="To Date"
                      selected={formik.values?.toDate}
                      onChange={(date) =>
                        formik.setFieldValue("toDate", date)
                      }
                    />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            {`${isEdit ? "Edit" : "Add"} User`}
          </button>
        </form>
        {/* )}
        </Formik> */}
      </CustomModal>
    </>
  );
}

export default AddUser;
