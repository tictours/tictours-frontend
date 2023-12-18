import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SelectField from "../../common/SelectField";
import Img1 from "../../../../images/course/hotel-1.jpg";
import DropDownBlog from "../../Dashboard/DropDownBlog";
import { useNavigate } from "react-router-dom";
import notify from "../../common/Notify";
import InputField from "../../common/InputField";
import { formatDate } from "../../../utilis/date";
import ReactSelect from "../../common/ReactSelect";
import CustomModal from "../../../layouts/CustomModal";
import { URLS } from "../../../../constants";
import { useAsync } from "../../../utilis/useAsync";
import { checkFormValue } from "../../../utilis/check";
import { filePost } from "../../../../services/AxiosInstance";
import { notifyCreate, notifyError } from "../../../utilis/notifyMessage";

const PaymentForm = ({ formik, setFormComponent, setShowModal }) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = formik;
  const navigate = useNavigate();
  const [showMarkup,setShowMarkup] = useState(false)
  const itineraryId = values.itineraryId
  const isEdit = !!itineraryId

  const dayList = [1, 2, 3, 4];
  const scheduleData = [1, 2];
  const destinationOptions = ["Destination 1", "Destination 2"];
  const categoryOptions = ["Hotel", "Activity", "Transfer"];
  const dataList = [1, 2, 3, 4];

  // // Step 1: Parse the date strings into Date objects
  // const startDate = new Date(values.formStartDate);
  // const endDate = new Date(values.formEndDate);

  // // Step 2 and Step 3: Generate all dates between the two dates and store in an array
  // const datesArray = [];
  // let currentDate = startDate;
  // while (currentDate <= endDate) {
  //   datesArray.push(new Date(currentDate));
  //   currentDate.setDate(currentDate.getDate() + 1);
  // }

  const handleAddCategory = () => {
    if (values.categoryOptions === "Hotel") {
      navigate("/add-hotel");
    }
  };
  const formSubmit = () => {
    // setShowModal(false)
    // setFormComponent('setupForm')
    notify({ message: "Itinary Created Successfully" });
    navigate("/enquiry/quotation");
  };
  const tableBlog = [1, 2];
  const handleBack = () => {
    setFormComponent("packageForm")
  }
  // console.log('payment',values)
  const priceOption = [
    {id:1,name:'price per traveller'},
    {id:2,name:'total price'},
]
  const gstOption = [
    {id:1,name:'GST on Total'},
    // {id:2,name:'GST on Per'},
]
  const currencyOption = [
    {id:'INR',name:'INR'},
    {id:'USD',name:'USD'},
]
const addOnField = [
  {label:'CGST',name:'cgst',field:'cgst_percentage'},
  {label:'SGST',name:'sgst',field:'sgst_percentage'},
  {label:'IGST',name:'igst',field:'igst_percentage'},
  {label:'TCS',name:'tcs',field:'tcs_percentage'},
  {label:'Discount',name:'discount',field:'discount_amount'},
]
const handleMarkup = ()=>{
  setFieldValue('baseMarkup',checkFormValue(values.baseMarkupInput,'number'))
  setFieldValue('extraMarkup',checkFormValue(values.extraMarkupInput,'number'))
  setShowMarkup(false)
}
const handleInputChange = (planIndex,index, newValue,type='amount') => {
    const newData = values.planArr?.map((item,planArrInd) => (
     planArrInd === planIndex ? {
        ...item,
        schedule: item.schedule.map((scheduleItem,ind) =>
        ind === index ? { ...scheduleItem, [type]: Number(newValue) } : scheduleItem
        )
      } : item
      
    ));
  setFieldValue('planArr',newData);
};
const handleBilling = async() =>{
  try {
    const formData = new FormData()
    formData.append('extra_markup_percentage',checkFormValue(values.baseMarkup,'number'))   
    formData.append('extra_markup_amount',checkFormValue(values.extraMarkup,'number'))  
    formData.append('description',values.paymentDescription || '.')  
    formData.append('currency',checkFormValue(values.priceIn.value))  
    addOnField.forEach((item)=>{
      formData.append(item.field,checkFormValue(values[item.name],'number'))  
    }) 
    values.planArr?.flatMap(({ date, schedule }) =>
      schedule.map((data,ind) => {
      // if(data.isExist){
      //   formData.append(`requirements[id]`,data?.value)
      // }
      formData.append(`entries[${ind}][id]`,checkFormValue(data.entryId))
      formData.append(`entries[${ind}][amount]`,checkFormValue(data.amount))
      formData.append(`entries[${ind}][markup]`,checkFormValue(data.markup))
    }))
    // formData.append('assigned_to',checkFormValue(values.assigned?.value))
    let response
    const url = `${URLS.ITINERARY_URL}/${itineraryId}/set-pricing`
    // if(isEdit){
    //   response = await axiosPut(editUrl,formData)
    // }else{
    //   console.log('url',url,formData)
      response = await filePost(url,formData)
    // }

    if(setShowModal){
    setShowModal(false)
    // navigate('add/profile')
  }
  if(response?.success){
    // formik.setFieldValue('itineraryId',response?.data?.id)
    // navigate(response?.data?.id)
    notifyCreate('Payment',isEdit)
  }
  } catch (error) {
    console.log('er',error)
    notifyError(error)
  }
}

const scheduleArr = values.planArr?.flatMap(({ date, schedule },planArrInd) => {
  return schedule.map((item,scheduleInd) => ({
    date,
    item,
    planArrInd,
    scheduleInd
  }));
});
// Calculate total using reduce
const totals = scheduleArr.reduce((accumulator, currentValue) => {
  const {item} = currentValue
  if(item.insertType !== 'hotel'){

      // Add amount to totalAmount
      accumulator.totalAmount += item.amount;
      
      // Add markup to totalMarkup
      accumulator.totalMarkup += item.markup;
    }
    return accumulator;
  
}, { totalAmount: 0, totalMarkup: 0 });
const getHotelOptionTotal = (amount,type='amount') => {
  const typeTotal = type === 'amount' ? totals.totalAmount : totals.totalMarkup
  const total = amount + typeTotal
  return total
}
const calculateTotal = (amount,markup) =>{
  const grandTotal = totals.totalAmount + totals.totalMarkup + amount + markup + checkFormValue(values.extraMarkup,'number') - checkFormValue(values.discount,'number')
  const getPercentValue = (val) => {
    let result 
    if(val){
      result  =  grandTotal * val * 0.01
    }else{
      result = 0
    }
    return result
  }
  const percentValue = grandTotal + getPercentValue(values.cgst) + getPercentValue(values.sgst) + getPercentValue(values.igst) + getPercentValue(values.tcs)
  return percentValue
}
  return (
    <>
      <form
      // onSubmit={formSubmit}
      >
        <div>
          <button className="btn btn-outline-light" type="button" onClick={handleBack}><i class="fa fa-arrow-left fa-xl" aria-hidden="true"></i></button>
        </div>
        <div
          className="table-responsive  full-data dataTables_wrapper"
          id="example2_wrapperr"
        >
          <table
            className="table-responsive-lg table display mb-4 dataTablesCard  text-black dataTable no-footer package-table"
            id="example2"
          >
            <thead className="bg-white">
              <tr className="">
                {/* <th className="sorting_asc ">
                                                <input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
                                            </th> */}
                {/* <th>#</th> */}
                <th>Item</th>
                <th>Type</th>
                <th>Net</th>
                <th>Mark up</th>
                <th>Gross</th>
                {/* <th className="text-center">Date</th>
                                            <th className="text-end">Status</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {scheduleArr.map(({item,planArrInd},ind) => (
                <tr key={ind}>
                  {/* <td className="sorting_1">
                                                    <div className="checkbox me-0 align-self-center">
                                                        <div className="custom-control custom-checkbox ">
                                                            <input type="checkbox" className="form-check-input" id={"customCheckBox2"+ ind} required="" 
                                                                onClick={() => chackboxFun()} 
                                                            />
                                                            <label className="custom-control-label" htmlFor={"customCheckBox2"+ ind} ></label>
                                                        </div>
                                                    </div>
                                                </td> */}
                  {/* <td>{ind+1}</td> */}
                  <td className="whitesp-no p-0">
                    <div className="py-sm-3 py-1 ps-3">
                      <div>
                       
                        <h6 className="font-w500 fs-15 mb-0">{item.name} {
                          item.insertType == 'hotel' && item.option?.label &&
                          // <div className="">
                        <span className="bg-success text-white p-1 rounded ms-2" style={{fontSize:'10px'}}>{item.option?.label}</span>
                        // </div>
                        }</h6>
                        <span className="fs-14 font-w400">
                          {/* Delux - 24/6/23 to 28/6/23 */}
                          {`${item.roomType?.label || item.type?.label || ''} ( ${formatDate(item.startDate)} to ${formatDate(item.endDate)} )`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{item.insertType}</td>
                  <td className="package-td">
                    <input className="form-control" type="number" value={item.amount} onChange={(e)=>handleInputChange(planArrInd,ind,e.target.value)}/>
                  </td>
                  <td className="package-td">
                    <input className="form-control" type="number" value={item.markup} onChange={(e)=>handleInputChange(planArrInd,ind,e.target.value,'markup')}/>
                  </td>
                  <td className="package-td">
                    {item.amount+item.markup} 
                  </td>
                </tr>
              ))
              }
              {/* <tr className="custom-tr">
                <td>Total</td>
                <td></td>
                <td></td>
                <td>9000</td>
                <td>0 %</td>
                <td>9000</td>
              </tr>
              <tr className="">
                <td>Discount</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-primary">2000</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3 p-2" style={{backgroundColor:'#eee'}}>
          <div className="d-flex align-items-center">
          <div className="me-2">
                <ReactSelect
                  // label="priceOption"
                  options={priceOption}
                  value={values.priceOption}
                  onChange={(selected) => setFieldValue("priceOption", selected)}
                  optionValue="id"
                  optionLabel="name"
                  inputId='destination'
                  formik={formik}
                  onBlur={handleBlur}
                  // className='custom-input'
                  required
                />
                </div>
          <div className="">
                <ReactSelect
                  // label="gstOption"
                  options={gstOption}
                  value={values.gstOption}
                  onChange={(selected) => setFieldValue("gstOption", selected)}
                  optionValue="id"
                  optionLabel="name"
                  formik={formik}
                  onBlur={handleBlur}
                  // className='custom-input'
                  required
                />
                </div>

                </div>
          <div className="">
            <h6 className="">{`Extra Markup - ${values.extraMarkup || 0} rs`}</h6>
            <button type="button" className="btn bg-white p-2 mx-auto" onClick={()=>setShowMarkup(true)}>Update</button>
          </div>
        </div>
        <div
          className="table-responsive  full-data dataTables_wrapper mt-5"
          id="example2_wrapperr"
        >
          <table
            className="table-responsive-lg table display mb-4 dataTablesCard  text-black dataTable no-footer package-table"
            id="example2"
          >
            <thead className="bg-primary">
              <tr className="">
                {/* <th className="sorting_asc ">
                                                <input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
                                            </th> */}
                {/* <th>#</th> */}
                <th>Service</th>
                <th>Price</th>
                <th>Markup</th>
                <th>CGST (0%)</th>
                <th>SGST (0%)</th>
                <th>IGST (0%)</th>
                <th>TCS (0%)</th>
                <th>Discount</th>
                <th>Total</th>
                {/* <th className="text-center">Date</th>
                                            <th className="text-end">Status</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {scheduleArr.map(({item,planArrInd},ind) => (
          item.insertType === 'hotel' &&
                <tr key={ind}>
                  {/* <td className="sorting_1">
                                                    <div className="checkbox me-0 align-self-center">
                                                        <div className="custom-control custom-checkbox ">
                                                            <input type="checkbox" className="form-check-input" id={"customCheckBox2"+ ind} required="" 
                                                                onClick={() => chackboxFun()} 
                                                            />
                                                            <label className="custom-control-label" htmlFor={"customCheckBox2"+ ind} ></label>
                                                        </div>
                                                    </div>
                                                </td> */}
                  {/* <td>{ind+1}</td> */}
                  <td className="whitesp-no p-0">
                    <div className="py-sm-3 py-1 ps-3">
                      <div>
                       
                        <h6 className="font-w500 fs-15 mb-0">{item.option?.label} 
                        {/* {
                          item.insertType == 'hotel' && 
                          // <div className="">
                        <span className="bg-success text-white p-1 rounded ms-2" style={{fontSize:'10px'}}>{item.option?.label}</span>
                        // </div>
                        } */}
                        </h6>
                       
                      </div>
                    </div>
                  </td>
                  <td>{getHotelOptionTotal(item.amount)}</td>
                  <td>{getHotelOptionTotal(item.markup,'markup')}</td>
                  {addOnField.map((field,key)=>(
                  <td className="package-td" key={key}>
                   
                    {/* <input className="form-control" type="number" value={item[field.name]} onChange={(e)=>handleInputChange(planArrInd,ind,e.target.value,field.name)}/> */}
                    <td>{values[field.name] || 0}</td>
                  </td>
                    
                  ))}
                  <td className="package-td">
                    {calculateTotal(item.amount,item.markup)}
                  </td>
                </tr>
              ))
              }
              {/* <tr className="custom-tr">
                <td>Total</td>
                <td></td>
                <td></td>
                <td>9000</td>
                <td>0 %</td>
                <td>9000</td>
              </tr>
              <tr className="">
                <td>Discount</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-primary">2000</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <div>
{addOnField.map((item)=>(
  <div className="d-flex justify-content-end align-items-center mb-2">
    <h6 >{item.label} %</h6>
    <input
        className="form-control ms-3"
        defaultValue={0}
        name={item.name}
        type="number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[item.name]}
        style={{ width: "25%" }}
      />
  </div>
))}
<div className="d-flex justify-content-end align-items-center mb-2">
    <h6 className="me-3">Price In:</h6>
    <ReactSelect
                  // label="priceOption"
                  options={currencyOption}
                  value={values.priceIn}
                  onChange={(selected) => setFieldValue("priceIn", selected)}
                  optionValue="id"
                  optionLabel="name"
                  formik={formik}
                  onBlur={handleBlur}
                  // className='custom-input'
                  // required
                />
  </div>
  <div className="d-flex flex-column justify-content-center align-items-end mb-2">
    {/* <div> */}
  <input className="form-control ms-3" placeholder="Early Bird Offer"
   name={'paymentDescription'}
   onChange={handleChange}
   onBlur={handleBlur}
   value={values.paymentDescription}
  style={{width:'50%'}}/>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={handleBilling}
        >
          Update Billing
        </button>
        {/* </div> */}
  </div>
        </div>
        </div>
      </form>
      <CustomModal
      showModal={showMarkup}
      title={`Add Extra Markup`}
      handleModalClose={() => {
        setShowMarkup(false);
      }}
    >
      <div className="card-body">
        <div className="basic-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="mb-3 col-md-12">
                <InputField
                  label="Base Markup %"
                  name="baseMarkupInput"
                  type='number'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  inputClassName='w-25'
                />
              </div>
              <div className="mb-3 col-md-12">
                <InputField
                  label="Extra Markup"
                  name="extraMarkupInput"
                  type='number'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  values={formik.values}
                  inputClassName='w-25'
                />
              </div>
             
            </div>
            <button type="button" className="btn btn-primary" onClick={handleMarkup}>
              {`Update`}
            </button>
          </form>
        </div>
      </div>
    </CustomModal>
    </>
  );
};

export default PaymentForm;
