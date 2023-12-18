import React, { useEffect, useState } from "react";
import CustomModal from "../../../layouts/CustomModal";
import notify from "../../common/Notify";
import SetupForm from "./SetupForm";
import { Formik, useFormik } from "formik";
import PackageForm from "./PackageForm";
import PaymentForm from "./PaymentForm";
import { checkFormValue } from "../../../utilis/check";
import { axiosPut, filePost } from "../../../../services/AxiosInstance";
import { URLS } from "../../../../constants";
import { notifyCreate, notifyError } from "../../../utilis/notifyMessage";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, formatTimeToHis, parseDate, parseTime } from "../../../utilis/date";
import { useAsync } from "../../../utilis/useAsync";

function SetupModal() {
  const navigate = useNavigate()
  const {id,itineraryId} = useParams()
  const itineraryByIdUrl = `${URLS.ITINERARY_URL}/${itineraryId}`
  const isEdit = !!itineraryId
  const fetchItinerary= useAsync(itineraryByIdUrl,isEdit)
  const editItineraryData = fetchItinerary?.data?.data

  const isEquiryId = id && id !== 'add'
  const url = URLS.ENQUIRY_URL
  const equiryIdUrl = `${url}/${id}`
  const fetchEnquiry = useAsync(equiryIdUrl,!!isEquiryId)
  const equiryIdData = fetchEnquiry?.data?.data

  const [showModal, setShowModal] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [formStartDate, setFormStartDate] = useState(new Date());
  const [formComponent, setFormComponent] = useState("setupForm");

  const date = new Date();
  const initialValues = {
    categoryOptions: "Hotel",
    formStartDate: date,
    formEndDate: date,
    formValidityDate: date,
    planArr:[],
    planIndex:0,
    priceOption:{value:2,label:'total price'},
    gstOption:{value:1,label:'GST on Total'},
    priceIn:{id:'INR',name:'INR'},
  };

  const handleFormValue = (data) => {
    if(data && data?.id){
      setFieldValue('packageName',checkFormValue(data.package_name))
      setFieldValue('formStartDate',parseDate(data.start_date))
      setFieldValue('formEndDate',parseDate(data.end_date))
      setFieldValue('adult',checkFormValue(data.adult_count))
      setFieldValue('child',checkFormValue(data.child_count))
      setFieldValue('baseMarkup',checkFormValue(data.extra_markup_percentage))
      setFieldValue('extraMarkup',checkFormValue(data.extra_markup_amount))
      setFieldValue('cgst',checkFormValue(data.cgst_percentage))
      setFieldValue('sgst',checkFormValue(data.sgst_percentage))
      setFieldValue('igst',checkFormValue(data.igst_percentage))
      setFieldValue('tcs',checkFormValue(data.tcs_percentage))
      setFieldValue('discount',checkFormValue(data.discount_amount))
      setFieldValue('paymentDescription',checkFormValue(data.description))
      const priceInObj = {label:data.currency,value:data.currency}
      setFieldValue('priceIn',priceInObj)
      const destinationObj = {label:data.destination.name,value:data.destination.id}
      setFieldValue('destination',checkFormValue(destinationObj))
      const sortedArray = data.entries?.reduce((acc, entry) => {
        const existingEntry = acc.find((item) => item.date === entry.date);
        const insertType = entry.entry_type.toLowerCase()
        const transferType = {label:entry.transfer_type,value:entry.transfer_type}
        const hotelOption = {label:entry.option,value:entry.option}
        const image = insertType === 'hotel' ? entry.subject?.document_2[0]?.file_url : entry.subject.image
        const obj = {
          insertType:insertType,
          entryId:entry.id,
          id:entry.subject_id,
          name:entry.subject.name || entry.subject.activity_name || entry.subject.vehicle_name,
          image:image,
          option:hotelOption,
          roomType:{value:entry.room?.id,label:entry.room?.room_type_name},
          destination:{value:entry.subject?.destination?.id || entry.subject?.destination_id,label:entry.subject?.destination?.name || entry.subject?.destination_name},
          roomOption:entry.subject.rooms,
          single:entry.single_count,
          double:entry.double_count,
          triple:entry.triple_count,
          extra:entry.extra_count,
          childW:entry.child_w_count,
          childN:entry.child_n_count,
          date:entry.date,
          person:entry.no_of_person,
          description:entry.description,
          type:transferType,
          cost:entry.cost,
          amount:entry.amount,
          markup:entry.markup,
          adultCost:entry.adult_cost,
          childCost:entry.child_cost,
          startDate:parseDate(entry.start_date),
          startTime:parseTime(entry.start_time),
          endDate:parseDate(entry.end_date),
          endTime:parseTime(entry.end_time),
        }
        if (existingEntry) {
          existingEntry.schedule.push(obj);
        } else {
          acc.push({ date: entry.date, schedule: [obj] });
        }
    
        return acc;
      }, []);
      setFieldValue('planArr',checkFormValue(sortedArray))
    }
  }

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
        if(data.entryId){
          formData.append(`entries[${ind}][id]`,checkFormValue(data.entryId))
        }
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
          formData.append(`entries[${ind}][transfer_type]`,checkFormValue(data.type?.value))
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
      const editUrl = URLS.ITINERARY_UPDATE_URL+'/'+itineraryId
      if(isEdit){
        response = await filePost(editUrl,formData)
      }else{
        response = await filePost(url,formData)
      }

      if(setShowModal){
      setShowModal(false)
      // navigate('add/profile')
    }
    if(response?.success){
      if(!isEdit){
        formik.setFieldValue('itineraryId',response?.data?.id)
        navigate(response?.data?.id)
      }
      handleFormValue(response?.data)
      notifyCreate('Quotation',isEdit)
    }
    } catch (error) {
      console.log('er',error)
      notifyError(error)
    }
   
  }
  const formik = useFormik({
    initialValues,
        // validationSchema={loginSchema}
        onSubmit:(values, { setSubmitting }) => {
          console.log('submit',values)
          handleFormClick(values)
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 400);
        }
  })
  const {setFieldValue} = formik
  

  useEffect(()=>{
    if(equiryIdData && !isEdit){
      setFieldValue('formStartDate',parseDate(equiryIdData.start_date))
      setFieldValue('formEndDate',parseDate(equiryIdData.end_date))
      setFieldValue('adult',checkFormValue(equiryIdData.adult_count))
      setFieldValue('child',checkFormValue(equiryIdData.child_count))
      const destinationObj = {label:equiryIdData.destination.name,value:equiryIdData.destination.id}
      setFieldValue('destination',checkFormValue(destinationObj))
    }
  },[equiryIdData?.id,isEdit])
  

  const formSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    notify({ message: "Added Successfully" });
  };

  useEffect(()=>{
    formik.setFieldValue('itineraryId',itineraryId)
  },[itineraryId])
  useEffect(()=>{
    // console.log('test',data)
    handleFormValue(editItineraryData)

  },[itineraryId,editItineraryData?.id])
  
  return (
    <>
      {/* <Formik
        
      >
        {(formik) => ( */}
          {/* <> */}
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
       {/* </>   
         )}
       </Formik> */}
    </>
  );
}

export default SetupModal;
