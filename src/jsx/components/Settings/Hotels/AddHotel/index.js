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
import { axiosPost, axiosPut } from "../../../../../services/AxiosInstance";
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
        let response;
        if (isEdit) {
          response = await axiosPut(editUrl, values);
        } else {
          response = await axiosPost(url, values);
        }
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
                        onClick={() => handleSubmit()}
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
