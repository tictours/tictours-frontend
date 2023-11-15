import { useFormik } from "formik";
import React, { useEffect } from "react";
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
const categoryOptions = [
  { label: "Category 1", value: "1" },
  { label: "Category 2", value: "2" },
  { label: "Category 3", value: "3" },
  { label: "Category 4", value: "4" },
];
const mealOptions = [
  { label: "Breakfast - 200 rs", value: "1" },
  { label: "Lunch - 250 rs", value: "2" },
  { label: "Dinner - 220 rs", value: "3" },
];
const roomAllotement = [
  { name: "single", allowed: 4 },
  { name: "double", allowed: 2 },
  { name: "triple", allowed: 5 },
  { name: "extra", allowed: 2 },
  { name: "child w", allowed: 1 },
  { name: "child n", allowed: 2 },
];

const InsertHotel = ({ showModal, setShowModal, data, onClick,editId,onClose }) => {
  const isEdit = !!editId || editId === 0
  const initialValues = {
    startDate: SETUP.TODAY_DATE,
    startTime: SETUP.START_TIME,
    endTime: SETUP.END_TIME,
    insertType:'hotel'
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
  } = useFormik({ initialValues });

  const handleSetup = () => {
    onClick(values, setShowModal);
  };
  useEffect(()=>{
    if(isEdit){
      setValues(data)
    }
  },[editId])
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={`${isEdit?'Edit':'Create'} Hotel`}
        handleModalClose={() => {
          onClose(setShowModal)
          resetForm()
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
                      value={values.destination}
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
                      value={values.type}
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
                      label="Category"
                      value={values.category}
                      onChange={(selected) =>
                        setFieldValue("category", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={categoryOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-4">
                    <ReactSelect
                      label="Room Type"
                      value={values.roomType}
                      onChange={(selected) =>
                        setFieldValue("roomtype", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={typeOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-5">
                    <InputField
                      label="Hotel Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-7">
                    <ReactSelect
                      label="Meal Plan"
                      value={values.mealPlan}
                      onChange={(selected) =>
                        setFieldValue("mealPlan", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={mealOptions}
                      optionValue="value"
                      optionLabel="label"
                      isMulti
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
                  {roomAllotement?.map((data) => (
                    <div className="col-sm-3">
                      <InputField
                        mb="0"
                        label={data.name}
                        name={data.name}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                      <p className="text-danger mb-3">{`max ${data.allowed}`}</p>
                    </div>
                  ))}

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
                Setup Hotel
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default InsertHotel;
