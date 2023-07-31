import React from 'react'
import DatePicker from "react-datepicker";
import SelectField from '../../common/SelectField';
import Img1 from '../../../../images/course/hotel-1.jpg'
import DropDownBlog from '../../Dashboard/DropDownBlog';
import { useNavigate } from 'react-router-dom';
import notify from '../../common/Notify';


const PaymentForm = ({formik,setFormComponent,setShowModal}) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = formik
  const navigation = useNavigate()
  const dayList = [1,2,3,4]
  const scheduleData = [1,2]
  const destinationOptions = ["Destination 1", "Destination 2"];
  const categoryOptions = ['Hotel','Activity','Transfer']
  const dataList = [1,2,3,4]

   // Step 1: Parse the date strings into Date objects
   const startDate = new Date(values.formStartDate);
   const endDate = new Date(values.formEndDate);
 
   // Step 2 and Step 3: Generate all dates between the two dates and store in an array
   const datesArray = [];
   let currentDate = startDate;
   while (currentDate <= endDate) {
     datesArray.push(new Date(currentDate));
     currentDate.setDate(currentDate.getDate() + 1);
   }

  const handleAddCategory = ()=>{
    if(values.categoryOptions === 'Hotel'){
        navigation('/add-hotel')
    }
  }
  const formSubmit = () => {
    setShowModal(false)
    setFormComponent('setupForm')
    notify({message:'Itinary Created Successfully'})
  }
  return (
    <>
    <form 
    // onSubmit={formSubmit}
    >
            
                 
                  <button type="button" className="btn btn-primary mt-4" onClick={formSubmit}>
                    Create itinerary
                  </button>
                </form>
    </>
  )
}

export default PaymentForm