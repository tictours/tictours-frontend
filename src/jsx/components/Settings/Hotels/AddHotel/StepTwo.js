import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";
import ReactSelect from "../../../common/ReactSelect";
import { Button, Dropdown, Table } from "react-bootstrap";

const SelectInputComponent = ({
  label,
  name,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  const booleanOptions = [
    { label: "No", value: false },
    { label: "Yes", value: true },
  ];
  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
      <SelectField
        label={label}
        name={`${name}Select`}
        onChange={(e) =>
          setFieldValue(
            `${name}Select`,
            e.target.value == "true" ? true : false
          )
        }
        onBlur={handleBlur}
        values={values}
        options={booleanOptions}
        optionValue="value"
        optionLabel="label"
      />
      {values[`${name}Select`] && (
        <>
          {/* <div className="form-group mb-3"> */}
          <InputField
            name={name}
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
            values={values}
          />
          {/* </div> */}
        </>
      )}
    </div>
  );
};
const StepTwo = () => {
  const [roomStartDate, setRoomStartDate] = useState(new Date());
  const [roomEndDate, setRoomEndDate] = useState(new Date());
  const showPassword = true;
  const TodayDate = new Date();
  const initialValues = {
    marketType: "",
    roomType: "",
    mealPlan: [],
    alloment: false,
    cutOff: 0,
    roomStartDate: TodayDate,
    roomEndDate: TodayDate,
    singleBed: 0,
    doubleBed: 0,
    tripleBedSelect: false,
    tripleBed: 0,
    extraBedSelect: false,
    extraBed: 0,
    childWBedSelect: false,
    childWBed: 0,
    childNBedSelect: false,
    childNBed: 0,
    occupancy: "0",
    mealType: [],
    mealAmount: 0,
    availableFrom: TodayDate,
    availableTo: TodayDate,
    addRoom: [],
  };
  const marketTypeOptions = ["Type 1", "Type 2", "Type 3"];
  const mealOptions = [
    { label: "Break fast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
  ];
  const amenityData = [1,2,3,4,5]
  const formatDate = (date) => {
    const localDate = new Date(date).toLocaleDateString();
    return localDate;
  };
  const handleEdit = (id,value,setValue) => {
    console.log('edit',id)
  }
  const handleDelete = (id,value,setValue) => {
    const filteredVal = value.filter((val,i)=>i !== id)
    setValue("addRoom", filteredVal)
  }
  return (
    <section>
      <Formik
        initialValues={initialValues}
        // validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
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
              <div className="col-12">
                <h4>Room Details</h4>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                <SelectField
                  label="Market Type"
                  name="marketType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values}
                  options={marketTypeOptions}
                />
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 m-b30">
                <label>From Date</label>
                <DatePicker
                  className="form-control"
                  selected={values.roomStartDate}
                  onChange={(date) => setFieldValue("roomStartDate", date)}
                />
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 m-b30">
                <label>To Date</label>
                <DatePicker
                  className="form-control"
                  selected={values.roomEndDate}
                  onChange={(date) => setFieldValue("roomEndDate", date)}
                />
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                <div className="form-group mb-3">
                  <SelectField
                    label="Room Type"
                    name="roomType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                    options={marketTypeOptions}
                  />
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                <div className="form-group mb-3">
                  <InputField
                    label="Single Bed"
                    name="singleBed"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                <div className="form-group mb-3">
                  <InputField
                    label="Double Bed"
                    name="doubleBed"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              </div>
              <SelectInputComponent
                label={"Triple Bed"}
                name="tripleBed"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <SelectInputComponent
                label={"Extra Bed"}
                name="extraBed"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <SelectInputComponent
                label={"Child W Bed"}
                name="childWBed"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <SelectInputComponent
                label={"Child N Bed"}
                name="childNBed"
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
              <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                <InputField
                  label="Occupancy"
                  name="occupancy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values}
                />
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <h4>Amentities</h4>
                </div>
                <div className="col-12">
          <div className="form-group">
            {amenityData.map((data,key) => (
              <div key={key} className="form-check form-check-inline  fw-normal">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value=""
                  //   defaultChecked
                  />
                  {`Amenity ${key+1}`}
                </label>
                {/* <span className="ms-2 amenity-count">{`12${key}`}</span> */}
              </div>
            ))}
          </div>
        </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4>Meals Plan</h4>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-6">
                      <ReactSelect
                        options={mealOptions}
                        isMulti
                        onChange={(selected) =>
                          setFieldValue("mealType", selected)
                        }
                      />
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-3">
                        <InputField
                          name="mealAmount"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          values={values}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <Button
                        className="me-2"
                        variant="primary"
                        onClick={() =>
                          setFieldValue("mealPlan", [
                            ...values.mealPlan,
                            {
                              type: values.mealType,
                              amount: values.mealAmount,
                            },
                          ])
                        }
                      >
                        <i className="fa-brands fa-plus fa-lg me-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                  {values.mealPlan.length !== 0 && (
                    <div className="mt-3">
                      <Table responsive className="custom-table-bordered">
                        <thead className="thead-table">
                          <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.mealPlan.map((plan, key) => (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <td>
                                {plan.type
                                  ?.map((type) => type.label)
                                  .join(" - ")}
                              </td>
                              <td>{plan.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="col-form-label col-sm-3 pt-0">
                          Alloment
                        </label>
                        <div className="form-group mb-0">
                          <label className="radio-inline me-3">
                            <input
                              type="radio"
                              name="optradio"
                              onClick={() => setFieldValue("alloment", true)}
                            />{" "}
                            Yes
                          </label>
                          <label className="radio-inline me-3">
                            <input
                              type="radio"
                              name="optradio"
                              defaultChecked
                              onClick={() => setFieldValue("alloment", false)}
                            />{" "}
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-lg-4">
                      <label>From Date</label>
                      <DatePicker
                        className="form-control"
                        selected={values.availableFrom}
                        onChange={(date) =>
                          setFieldValue("availableFrom", date)
                        }
                      />
                    </div>
                    <div className="col-6 col-lg-4">
                      <label>To Date</label>
                      <DatePicker
                        className="form-control"
                        selected={values.availableTo}
                        onChange={(date) => setFieldValue("availableTo", date)}
                      />
                    </div>
                    <div className="col-6 col-lg-4">
                      <InputField
                        label="Cut Off"
                        name="cutOff"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                    </div>
                    <div className="col-6">
                      <Button
                        className="me-0"
                        variant="primary"
                        onClick={() =>
                          setFieldValue("addRoom", [
                            ...values.addRoom,
                            { ...values },
                          ])
                        }
                      >
                        Add Room Details
                      </Button>
                    </div>
                  </div>
                </div>
                {values.addRoom.length !== 0 && (
                  <div className="col-12 mt-4">
                    <Table responsive className="custom-table-bordered">
                      <thead className="thead-table">
                        <tr>
                          <th>#</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Market Type</th>
                          <th>Room Type</th>
                          {/* <th>Meal Plan</th> */}
                          <th>Single Bed</th>
                          <th>Double Bed</th>
                          <th>Triple Bed</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.addRoom.map((data, key) => {
                          return (
                            <tr key={key}>
                              <th>{key + 1}</th>
                              <td>{formatDate(data.roomStartDate)}</td>
                              <td>{formatDate(data.roomEndDate)}</td>
                              <td>{data.marketType}</td>
                              <td>{data.roomType}</td>
                              {/* <td>{data.type?.map((type)=>type.label).join(' - ')}</td> */}
                              <td>{data.singleBed}</td>
                              <td>{data.doubleBed}</td>
                              <td>{data.tripleBed}</td>
                              <td>
                      <div className="d-flex">
                        <button
                          className="btn bg-main btn-xs sharp me-1"
                          onClick={()=>handleEdit(key,values,setFieldValue)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn bg-main btn-xs sharp"
                          onClick={()=>handleDelete(key,values.addRoom,setFieldValue)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default StepTwo;
