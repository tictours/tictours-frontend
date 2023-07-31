import React from 'react'
import DatePicker from "react-datepicker";
import SelectField from '../../common/SelectField';
import Img1 from '../../../../images/course/hotel-1.jpg'
import DropDownBlog from '../../Dashboard/DropDownBlog';
import { useNavigate } from 'react-router-dom';
import notify from '../../common/Notify';
import InputField from '../../common/InputField';


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
  const tableBlog = [1,2]
  return (
    <>
    <form 
    // onSubmit={formSubmit}
    >
      <div className="table-responsive  full-data dataTables_wrapper" id="example2_wrapper">
                                <table className="table-responsive-lg table display mb-4 dataTablesCard  text-black dataTable no-footer package-table" id="example2">
                                    <thead className='bg-white'>
                                        <tr className=''>
                                            {/* <th className="sorting_asc ">
                                                <input type="checkbox" onClick={() => chackboxFun("all")} className="form-check-input" id="checkAll" required="" />
                                            </th> */}
                                            <th>ID</th>
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
                                        {tableBlog.map((item, ind)=>(
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
                                                <td>{"#J01" + ind}</td>
                                                <td className="whitesp-no p-0">
                                                    <div className="py-sm-3 py-1 ps-3">
                                                        <div >
                                                            <h6 className="font-w500 fs-15 mb-0">Burj khalifa</h6>
                                                            <span className="fs-14 font-w400">Delux - 24/6/23 to 28/6/23</span> 
                                                        </div>												
                                                    </div>
                                                </td>
                                                <td>Hotel</td>
                                                <td className='package-td'>
                                                <input className="form-control" defaultValue={0} />
                                                </td>
                                                <td className='package-td'>
                                                <input className="form-control" defaultValue={0} />
                                                </td>
                                                <td className='package-td'>
                                                <input className="form-control" defaultValue={0} />
                                                </td> 
                                            </tr>
                                        ))}
                                        <tr className='custom-tr'>
                                            <td>Total</td>
                                            <td></td>
                                            <td></td>
                                            <td>9000</td>
                                            <td>0 %</td>
                                            <td>9000</td>
                                        </tr>
                                        <tr className=''>
                                            <td>Discount</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className='text-primary'>2000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>   
            
                 
                  <button type="button" className="btn btn-primary mt-4" onClick={formSubmit}>
                    Create itinerary
                  </button>
                </form>
    </>
  )
}

export default PaymentForm