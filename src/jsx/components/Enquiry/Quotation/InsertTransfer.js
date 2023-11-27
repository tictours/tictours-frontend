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
import { FormSection } from "../../common/FormSection";
const nameOptions = [
  { label: "Vechile 1", value: "1" },
  { label: "Vechile 2", value: "2" },
  { label: "Vechile 3", value: "3" },
  { label: "Vechile 4", value: "4" },
];
const typeOptions = [
  { label: "Private", value: "1" },
  { label: "SIC", value: "2" },
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

const InsertTransfer = ({ showModal, setShowModal, data, onClick,editId,onClose }) => {
  const isEdit = !!editId || editId === 0
  const initialValues = {
    startDate: SETUP.TODAY_DATE,
    startTime: SETUP.START_TIME,
    endTime: SETUP.END_TIME,
    insertType:'transfer',
    type:{ label: "Private", value: "1" }
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
    resetForm()
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
        title={"Create Transfer"}
        handleModalClose={() => {
          onClose(setShowModal);
          resetForm()
        }}
      >
        <div className="card-body">
          <div className="basic-form">
            <form>
              <div className="card-body">
                <div className="row">
                <div className="col-sm-6">
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
                  {/* <div className="col-sm-4">
                    <ReactSelect
                      label="Vechile Name"
                      onChange={(selected) =>
                        setFieldValue("name", selected)
                      }
                      onBlur={handleBlur}
                      // values={values}
                      options={nameOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div> */}
                  <div className="col-sm-6">
                    <InputField
                      label="Vechile Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  
                  {/* <div className="col-sm-8">
                    <InputField
                      label="Note"
                      name="note"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div> */}
                  
                  {/* <div className="col-sm-6">
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
                  </div> */}

                  {/* <div className="col-sm-8">
                    <InputField
                      label="Description"
                      name="description"
                      // type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                      isTextarea
                    />
                  </div> */}
                 
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
                      isSearchable={false}
                    />
                  </div>
                  {values.type?.label === 'Private'?<div className="col-sm-4">
                    <InputField
                      label="Cost"
                      name="cost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>:<>
                  <div className="col-sm-4">
                  <InputField
                      label="Adult Cost"
                      name="adultCost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                    </div>
                  <div className="col-sm-4">
                  <InputField
                      label="Child Cost"
                      name="childCost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                    </div>
                  </>}
                  <FormSection>
                  <div className="col-sm-5">
                    <label>Start Date</label>
                    <DatePicker
                      className="form-control"
                      selected={values.startDate}
                      onChange={(date) => setFieldValue("startDate", date)}
                    />
                  </div>

                  <div className="col-sm-5">
                    <InputField
                      label="Start Time"
                      name="startTime"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-5">
                    <label>End Date</label>
                    <DatePicker
                      className="form-control"
                      selected={values.endDate}
                      onChange={(date) => setFieldValue("endDate", date)}
                    />
                  </div>
                  <div className="col-sm-5">
                    <InputField
                      label="End Time"
                      name="endTime"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  </FormSection>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSetup}
              >
                Setup Transfer
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default InsertTransfer;
