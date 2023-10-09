import { useFormik } from "formik";
import React from "react";
import ReactSelect from "../../common/ReactSelect";
import { SETUP } from "../../../../constants";
import InputField from "../../common/InputField";
import CustomModal from "../../../layouts/CustomModal";
import DatePicker from "react-datepicker";
import TimePickerPicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
const typeOptions = [
  { label: "Type 1", value: "1" },
  { label: "Type 2", value: "2" },
  { label: "Type 3", value: "3" },
  { label: "Type 4", value: "4" },
];
const destinationOptions = [
  { value: "Dubai", label: "Dubai" },
  { value: "Qatar", label: "Qatar" },
  { value: "Europe", label: "Europe" },
  { value: "India", label: "India" },
  { value: "America", label: "America" },
];
const activityOptions = [
  { label: "Activity 1", value: "1" },
  { label: "Activity 2", value: "2" },
  { label: "Activity 3", value: "3" },
  { label: "Activity 4", value: "4" },
];

const InsertActivity = ({ showModal, setShowModal, data, onClick }) => {
  const initialValues = {
    startDate: SETUP.TODAY_DATE,
  };
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({ initialValues });

  const handleSetup = () => {
    onClick(values.activity.label, setShowModal);
  };
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={"Create Activity"}
        handleModalClose={() => {
          setShowModal(false);
        }}
      >
        <div className="card-body">
          <div className="basic-form">
            <form>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <ReactSelect
                      label="Destination"
                      onChange={(selected) =>
                        setFieldValue("destination", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={destinationOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-4">
                    <ReactSelect
                      label="Type"
                      onChange={(selected) => setFieldValue("type", selected)}
                      onBlur={handleBlur}
                      // values={values}
                      options={typeOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-4">
                    <ReactSelect
                      label="Activity"
                      onChange={(selected) =>
                        setFieldValue("activity", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={activityOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-4">
                    <InputField
                      label="No of person"
                      name="person"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-8">
                    <InputField
                      label="Description"
                      name="description"
                      // type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                      isTextarea
                    />
                  </div>
                  <div className="col-sm-4">
                    <label>Start Date</label>
                    <DatePicker
                      className="form-control"
                      selected={values.startDate}
                      onChange={(date) => setFieldValue("startDate", date)}
                    />
                  </div>

                  <div className="col-sm-4">
                    <InputField
                      label="Start Time"
                      name="startTime"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-4">
                    <InputField
                      label="End Time"
                      name="endTime"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSetup}
              >
                Setup Activity
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default InsertActivity;
