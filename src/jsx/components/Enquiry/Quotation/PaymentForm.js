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
    {id:1,name:'INR'},
    {id:2,name:'USD'},
]
const addOnField = ['CGST','SGST','IGST','TCS','Discount']
const handleMarkup = ()=>{
  setShowMarkup(false)
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
              {values.planArr?.flatMap(({ date, schedule }) =>
        schedule.map((item,ind) => (
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
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    200
                  </td>
                </tr>
              )))
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
            <h6 className="">Extra Markup - 500 rs</h6>
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
              {values.planArr?.flatMap(({ date, schedule }) =>
        schedule.map((item,ind) => (
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
                  <td>1000</td>
                  <td>200</td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    <input className="form-control" defaultValue={0} />
                  </td>
                  <td className="package-td">
                    2000
                  </td>
                </tr>
              )))
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
    <h6 >{item} %</h6>
    <input className="form-control ms-3"  defaultValue={0} style={{width:'25%'}}/>
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
  <input className="form-control ms-3" placeholder="Early Bird Offer" style={{width:'50%'}}/>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
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
                  name="baseMarkup"
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
                  name="extraMarkup"
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
