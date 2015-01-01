import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";
import ReactSelect from "../../../common/ReactSelect";

const StepTwo = () => {
   const [roomStartDate, setRoomStartDate] = useState(new Date())
   const [roomEndDate, setRoomEndDate] = useState(new Date())
   const showPassword = true
   const initialValues = {
      marketType: "",
      roomType: "",
   }
   const marketTypeOptions = ['Type 1', 'Type 2', 'Type 3']
   const mealOptions = [
      { label: 'Break fast', value: 'breakfast' },
      { label: 'Lunch', value: 'lunch' },
      { label: 'Dinner', value: 'dinner' },
   ]
   return (
      <section>
         <Formik
            initialValues={initialValues}
            // validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
               setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
               }, 400);
            }}
         >
            {({
               values,
               errors,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
            }) => (
               <form onSubmit={handleSubmit}>
                  {console.log('values', values)}
                  <div className="row">
                     <div className="col-12">
                        <h4>Room Details</h4>
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                        <SelectField label='Market Type' name='marketType'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           values={values}
                           options={marketTypeOptions} />
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2 m-b30">
                        <label>From Date</label>
                        <DatePicker className="form-control"
                           selected={roomStartDate}
                           onChange={(date) => setRoomStartDate(date)} />
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2 m-b30">
                        <label>To Date</label>
                        <DatePicker className="form-control"
                           selected={roomEndDate}
                           onChange={(date) => setRoomEndDate(date)} />
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                        <div className="form-group mb-3">
                           <SelectField label='Room Type' name='roomType'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              values={values}
                              options={marketTypeOptions} />
                        </div>
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                        <div className="form-group mb-3">
                           <InputField label='Single Bed'
                              name='singleBed'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              values={values} />
                        </div>
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                        <div className="form-group mb-3">
                           <InputField label='Double Bed'
                              name='doubleBed'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              values={values} />
                        </div>
                     </div>
                     <div className="col-6 col-sm-4 col-md-3 col-lg-2  mb-2">
                        <InputField label='Occupancy'
                           name='occupancy'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           values={values} />
                     </div>
                     <div className="col-12">
                        <h4>Meals Plan</h4>
                     </div>
                     <div>
                        <div className="col-4">
                           <ReactSelect options={mealOptions} isMulti />
                        </div>
                        <div>

                        </div>
                     </div>
                     <div className="col-6">

                     </div>

                  </div>
               </form>
            )}
         </Formik>
      </section>
   );
};

export default StepTwo;
