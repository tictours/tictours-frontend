import React, { useState } from 'react'
import CustomModal from '../../../layouts/CustomModal'
import DatePicker from "react-datepicker";
import  notify  from '../../common/Notify';
import SetupForm from './SetupForm';
import { Formik } from 'formik';
import PackageForm from './PackageForm';



function SetupModal({showModal,setShowModal}) {
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formValidityDate, setFormValidityDate] = useState(new Date());
    const [formComponent, setFormComponent] = useState('setupForm');


    const formSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        notify({message:'Added Successfully'})
      }
      const initialValues = {categoryOptions:'Hotel'}
  return (
    <>
    <CustomModal
            showModal={showModal}
            title={"Create itinerary"}
            handleModalClose={() => {
              setShowModal(false)
              setFormComponent('setupForm')
            }
            }
            modalClass={`${formComponent ?'setup-modal':''}`}
          >
            <div className="card-body">
              <div className="basic-form">
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
            <SetupForm formik={formik} setFormComponent={setFormComponent} setShowModal={setShowModal} /> :
            <PackageForm formik={formik} setFormComponent={setFormComponent} setShowModal={setShowModal} />         
          }
          </>
          )}
          </Formik>
              </div>
            </div>
          </CustomModal>
    </>
  )
}

export default SetupModal