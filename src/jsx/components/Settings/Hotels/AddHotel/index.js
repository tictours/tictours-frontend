import React, { Fragment, useEffect, useState } from "react";
//import Multistep from "react-multistep";
import { Stepper, Step } from "react-form-stepper";

import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import PageTitle from "../../../../layouts/PageTitle";
import { useNavigate } from "react-router-dom";
import notify from "../../../common/Notify";
import { useDispatch, useSelector } from "react-redux";
import { FormAction } from "../../../../../store/slices/formSlice";
import { useFormik } from "formik";
import { URLS } from "../../../../../constants";
import { axiosPost, axiosPut, filePost } from "../../../../../services/AxiosInstance";
import { notifyCreate, notifyError } from "../../../../utilis/notifyMessage";

const AddHotel = () => {
  const [goSteps, setGoSteps] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formId = useSelector((data) => data.form);
  const isEdit = !!formId.editId;
  const initialValues = {
    addRoom: [],
    hotelAmentity: [],
    hotelImg: [],
  }
  const url = URLS.HOTEL_URL
  const editUrl = `${URLS.HOTEL_URL}/${formId.editId}`
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // Handle form submission here
      try {
       // console.log('onpress',values)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('destination_id', values.destination);
        formData.append('sub_destination_id', values.subDestination);
        formData.append('place', values.place);
        formData.append('category_id', values.category);
        formData.append('property_type_id', values.propertyType);
        formData.append('sales_email', values.salesEmail);
        formData.append('sales_no', values.salesNumber);
        formData.append('reservation_email', values.reservationEmail);
        formData.append('reservation_no', values.reservationNumber);
        formData.append('phone_number', values.phoneNumber);
        formData.append('address', values.address);
        values.addRoom.forEach((item,ind)=>{
          formData.append(`rooms[${ind}][market_type_id]`, item.marketType);
          formData.append(`rooms[${ind}][from_date]`, item.roomStartDate.toLocaleDateString('en-CA'));
          formData.append(`rooms[${ind}][to_date]`, item.roomEndDate.toLocaleDateString('en-CA'));
          formData.append(`rooms[${ind}][room_type_id]`, item.roomType);
          formData.append(`rooms[${ind}][single_bed_amount]`, item.singleBed);
          formData.append(`rooms[${ind}][double_bed_amount]`, item.doubleBed);
          formData.append(`rooms[${ind}][triple_bed_amount]`, item.tripleBed);
          formData.append(`rooms[${ind}][is_triple_bed_available]`, item.tripleBedSelect ? 1 : 0);
          formData.append(`rooms[${ind}][extra_bed_amount]`, item.extraBed);
          formData.append(`rooms[${ind}][is_extra_bed_available]`, item.extraBedSelect ? 1 : 0);
          formData.append(`rooms[${ind}][child_w_bed_amount]`, item.childWBed);
          formData.append(`rooms[${ind}][is_child_w_bed_available]`, item.childWBedSelect ? 1 : 0);
          formData.append(`rooms[${ind}][child_n_bed_amount]`, item.childNBed);
          formData.append(`rooms[${ind}][is_child_n_bed_available]`, item.childNBedSelect ? 1 : 0);
          formData.append(`rooms[${ind}][occupancy]`, item.occupancy);
          item.roomAmentity.forEach((item,i)=>{
            formData.append(`rooms[${ind}][amenities][${i}]`, item);
          })
          item.roomImg.forEach((item,i)=>{
            formData.append(`rooms[${ind}][images][${i}]`, item);
          })
          item.mealPlan.forEach((item,i)=>{
            formData.append(`rooms[${ind}][meal_plans][${i}][id]`, item.type.value);
            formData.append(`rooms[${ind}][meal_plans][${i}][amount]`, item.amount);
          })
          formData.append(`rooms[${ind}][is_allotted]`, item.alloment ? 1 : 0);
          // formData.append(`rooms[${ind}][]`, item.availableFrom);
          // formData.append(`rooms[${ind}][]`, item.availableTo);
          formData.append(`rooms[${ind}][allotted_cut_off_days]`, item.cutOff);
        })
        values.hotelAmentity.forEach((item,ind)=>{
          formData.append(`amenities[${ind}]`, item);
        })
        values.hotelImg.forEach((item,ind)=>{
          formData.append(`document_2[${ind}]`, item);
        })
        let response;
        if (isEdit) {
          response = await axiosPut(editUrl, formData);
        } else {
          response = await filePost(url, formData);
        }
        // console.log('response',response)
        if (response.success) {
          dispatch(FormAction.setRefresh());
          // formik.setFieldValue("name", "");
          // setShowModal(false);
          if (isEdit) {
            dispatch(FormAction.setEditId())
          }
          notifyCreate('Hotel', isEdit)
        }
      } catch (error) {
        console.log(error);
        notifyError('Something went wrong')
      }
    },
  })
  console.log('hotel formik', formik.values)

  const handleSubmit = () => {

    // notify({ message: "Hotel Added Successfully" });
    // navigate("/hotels");
    // dispatch(FormAction.setEditId(""));
  };
  useEffect(() => {
    return () => {
      dispatch(FormAction.setEditId(""));
    };
  }, []);

  return (
    <Fragment>
      <PageTitle activeMenu="Components" motherMenu="Home" />

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{`${isEdit ? "Edit" : "Add"
                } Hotel`}</h4>
            </div>
            <div className="card-body">
              <div className="form-wizard ">
                <Stepper
                  className="nav-wizard"
                  activeStep={goSteps}
                  label={false}
                >
                  <Step className="nav-link" onClick={() => setGoSteps(0)} />
                  <Step className="nav-link" onClick={() => setGoSteps(1)} />
                  <Step className="nav-link" onClick={() => setGoSteps(2)} />
                  <Step className="nav-link" onClick={() => setGoSteps(3)} />
                </Stepper>
                {goSteps === 0 && (
                  <>
                    <StepOne formik={formik} />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-primary sw-btn-next"
                        onClick={() => setGoSteps(1)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {goSteps === 1 && (
                  <>
                    <StepTwo formik={formik} />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-secondary sw-btn-prev me-1"
                        onClick={() => setGoSteps(0)}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-primary sw-btn-next ms-1"
                        onClick={() => setGoSteps(2)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {goSteps === 2 && (
                  <>
                    <StepThree formik={formik} />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-secondary sw-btn-prev me-1"
                        onClick={() => setGoSteps(1)}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-primary sw-btn-next ms-1"
                        onClick={() => setGoSteps(3)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {goSteps === 3 && (
                  <>
                    <StepFour formik={formik} />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-secondary sw-btn-prev me-1"
                        onClick={() => setGoSteps(2)}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-primary sw-btn-next ms-1"
                        type="submit"
                        onClick={() => formik.handleSubmit()}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddHotel;
