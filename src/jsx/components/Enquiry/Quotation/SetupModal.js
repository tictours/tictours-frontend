import React, { useState } from 'react'
import CustomModal from '../../../layouts/CustomModal'
import  notify  from '../../common/Notify';
import SetupForm from './SetupForm';
import { Formik } from 'formik';
import PackageForm from './PackageForm';
import PaymentForm from './PaymentForm';



function SetupModal() {
    const [showModal, setShowModal] = useState(true);
    const [formStartDate, setFormStartDate] = useState(new Date())
    const [formComponent, setFormComponent] = useState('setupForm');
    const date = new Date()


    const formSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        notify({message:'Added Successfully'})
      }
      const initialValues = {categoryOptions:'Hotel',formStartDate:date,formEndDate:date,formValidityDate:date,}
  return (
    <>
    
              <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     setSubmitting(false);
            //   }, 400);
          }}
        >
          {(formik) => (
            <>
            {formComponent === 'setupForm' ?
            <SetupForm formik={formik} setFormComponent={setFormComponent} showModal={showModal} setShowModal={setShowModal} /> :
            <div className='bg-white mt-4 p-4 rounded'>
            {formComponent === 'packageForm' ?
            <PackageForm formik={formik} setFormComponent={setFormComponent} setShowModal={setShowModal} />:
            <PaymentForm formik={formik} setFormComponent={setFormComponent} setShowModal={setShowModal} />  }
            </div>      
          }
          </>
          )}
          </Formik>
    </>
  )
}

export default SetupModal