import React, { useEffect, useState } from "react";
import CustomModal from "../../../layouts/CustomModal";
import notify from "../../common/Notify";
import SetupForm from "./SetupForm";
import { Formik } from "formik";
import PackageForm from "./PackageForm";
import PaymentForm from "./PaymentForm";
import { checkFormValue } from "../../../utilis/check";
import { axiosPut, filePost } from "../../../../services/AxiosInstance";
import { URLS } from "../../../../constants";
import { notifyCreate, notifyError } from "../../../utilis/notifyMessage";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatTimeToHis, parseDate } from "../../../utilis/date";
import { useAsync } from "../../../utilis/useAsync";

function SetupModal() {
  const [showModal, setShowModal] = useState(true);
  const [formStartDate, setFormStartDate] = useState(new Date());
  const [formComponent, setFormComponent] = useState("setupForm");
  const date = new Date();
  const navigate = useNavigate()
  const {id} = useParams()

  const formSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    notify({ message: "Added Successfully" });
  };
  const initialValues = {
    categoryOptions: "Hotel",
    formStartDate: date,
    formEndDate: date,
    formValidityDate: date,
    planArr:[],
    planIndex:0,
    priceOption:{value:1,label:'price per traveller'},
    gstOption:{value:1,label:'GST on Total'},
    priceIn:{value:1,label:'INR'},
  };

  const handleFormClick = async(values) => {
    try {
      const formData = new FormData()
      formData.append('currency','inr')
      formData.append('package_name',values.packageName)
      formData.append('enquiry_id',id)
      formData.append('start_date',checkFormValue(formatDate(values.formStartDate)))
      formData.append('end_date',checkFormValue(formatDate(values.formEndDate)))
      formData.append('adult_count',checkFormValue(values.adult))
      formData.append('child_count',checkFormValue(values.child))
      formData.append('destination_id',checkFormValue(values.destination?.value))
      formData.append('valid_until',checkFormValue(formatDate(values.formValidityDate)))
      values.planArr?.flatMap(({ date, schedule }) =>
        schedule.map((data,ind) => {
        // if(data.isExist){
        //   formData.append(`requirements[id]`,data?.value)
        // }
        formData.append(`entries[${ind}][subject_id]`,checkFormValue(data.id))
        formData.append(`entries[${ind}][entry_type]`,checkFormValue(data.insertType.toUpperCase()))
        if(data.insertType === 'hotel'){
          formData.append(`entries[${ind}][option]`,checkFormValue(data.option?.value))
          formData.append(`entries[${ind}][room_id]`,checkFormValue(data.roomType?.value))
          formData.append(`entries[${ind}][single_count]`,checkFormValue(data.single,'number'))
          formData.append(`entries[${ind}][double_count]`,checkFormValue(data.double,'number'))
          formData.append(`entries[${ind}][triple_count]`,checkFormValue(data.triple,'number'))
          formData.append(`entries[${ind}][extra_count]`,checkFormValue(data.extra,'number'))
          formData.append(`entries[${ind}][child_w_count]`,checkFormValue(data.childW,'number'))
          formData.append(`entries[${ind}][child_n_count]`,checkFormValue(data.childN,'number'))
        }
        formData.append(`entries[${ind}][date]`,checkFormValue(formatDate(date)))
        formData.append(`entries[${ind}][no_of_person]`,checkFormValue(data.person,'number'))
        if(data.insertType === 'activity'){
          formData.append(`entries[${ind}][description]`,checkFormValue(data.description))
        }
        if(data.insertType === 'transfer'){
          formData.append(`entries[${ind}][transfer_type]`,checkFormValue(data.type?.label?.toUpperCase()))
          formData.append(`entries[${ind}][cost]`,checkFormValue(data.cost,'number'))
          formData.append(`entries[${ind}][adult_cost]`,checkFormValue(data.adultCost,'number'))
          formData.append(`entries[${ind}][child_cost]`,checkFormValue(data.childCost,'number'))
        }

        formData.append(`entries[${ind}][start_date]`,checkFormValue(formatDate(data.startDate)))
        formData.append(`entries[${ind}][start_time]`,checkFormValue(formatTimeToHis(data.startTime)))
        formData.append(`entries[${ind}][end_date]`,checkFormValue(formatDate(data.endDate)))
        formData.append(`entries[${ind}][end_time]`,checkFormValue(formatTimeToHis(data.endTime)))
      }))
      // formData.append('assigned_to',checkFormValue(values.assigned?.value))
      let response
      const url = URLS.ITINERARY_URL
      const editUrl = URLS.ITINERARY_URL
      if( false){
        response = await axiosPut(editUrl,formData)
      }else{
        console.log('url',url,formData)
        response = await filePost(url,formData)
      }

      if(setShowModal){
      setShowModal(false)
      navigate('add/profile')
    }
    console.log('res',response)
    if(response?.success){
      notifyCreate('Profile',false)
    }
    } catch (error) {
      console.log('er',error)
      notifyError(error)
    }
   
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submit',values)
          handleFormClick(values)
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 400);
        }}
      >
        {(formik) => (
          <>
            {formComponent === "setupForm" ? (
              <SetupForm
                formik={formik}
                setFormComponent={setFormComponent}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            ) : (
              <div className="bg-white mt-4 p-4 rounded">
                {formComponent === "packageForm" ? (
                  <PackageForm
                    formik={formik}
                    setFormComponent={setFormComponent}
                    setShowModal={setShowModal}
                  />
                ) : (
                  <PaymentForm
                    formik={formik}
                    setFormComponent={setFormComponent}
                    setShowModal={setShowModal}
                  />
                )}
              </div>
            )}
          </>
        )}
      </Formik>
    </>
  );
}

export default SetupModal;
