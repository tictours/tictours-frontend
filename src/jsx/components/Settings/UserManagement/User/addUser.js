import React, { useState } from "react";
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

function AddUser({ showModal, setShowModal, editId, setEditId }) {
  const isEdit = !!editId;
  const dispatch = useDispatch();
  const initialValues = {};
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      signUp(values)
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
  console.log("vall", values);
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
            <div className="col-md-6  mb-2">
              <InputField
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
              />
            </div>
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
                onChange={(selected) => setFieldValue("role", selected)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <ReactSelect
                label="Country"
                optionLabel="name"
                optionValue="id"
                options={countryOptions}
                onChange={(selected) => setFieldValue("country", selected)}
              />
            </div>
            <div className="col-md-6 mb-2">
              <ReactSelect
                label="Language"
                optionLabel="language"
                optionValue="id"
                options={languageOptions}
                onChange={(selected) => setFieldValue("language", selected)}
              />
            </div>

            <div className="col-md-6 m-b30">
              <label>From Date</label>
              <DatePicker
                className="form-control"
                selected={values.fromDate}
                onChange={(date) => setFieldValue("fromDate", date)}
              />
            </div>
            <div className="col-md-6 m-b30">
              <label>To Date</label>
              <DatePicker
                className="form-control"
                selected={values.toDate}
                onChange={(date) => setFieldValue("toDate", date)}
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
