import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomModal from "../../../layouts/CustomModal";
import notify from "../../common/Notify";
import { Formik } from "formik";
import SelectField from "../../common/SelectField";
import InputField from "../../common/InputField";
import ReactSelect from "../../common/ReactSelect";

const AddAgent = ({ showModal, setShowModal }) => {
  const initialValues = {};
  const marketTypeOptions = ["Type 1", "Type 2", "Type 3"];
  const countryOptions = [
    { label: "Country 1", value: "country1" },
    { label: "Country 2", value: "country2" },
    { label: "Country 3", value: "country3" },
    { label: "Country 4", value: "country4" },
    { label: "Country 5", value: "country5" },
  ];
  const languageOptions = [
    { label: "Language 1", value: "language1" },
    { label: "Language 2", value: "language2" },
    { label: "Language 3", value: "language3" },
    { label: "Language 4", value: "language4" },
    { label: "Language 5", value: "language5" },
  ];
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={"Add Agent"}
        handleModalClose={() => setShowModal(false)}
      >
        <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setShowModal(false);
            notify({ message: "User Added Successfully" });
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
                  <InputField
                    label="Name"
                    name="Name"
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
                    label="Country"
                    options={countryOptions}
                    onChange={(selected) => setFieldValue("mealType", selected)}
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
                Add User
              </button>
            </form>
          )}
        </Formik>
      </CustomModal>
    </>
  );
};

export default AddAgent;
