import React, { useState } from 'react'
import CustomModal from '../../../../layouts/CustomModal';
import { notify } from '../../../common/Notify';
import { Formik } from 'formik';
import InputField from '../../../common/InputField';
import ReactSelect from '../../../common/ReactSelect';



function AddRole({ showModal, setShowModal }) {
  const [formStartDate, setFormStartDate] = useState(new Date());



  const formSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)
    notify('Completed notify')
  }
  const initialValues = {}
  const permissionOptions = [
    { label: 'Read', value: 'read' },
    { label: 'Write', value: 'write' },
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
  ]
  const menuList = ['Dashboard','Enquiry','Leads','Admin setting','User','User Role']
  return (
    <>
      <CustomModal
        showModal={showModal}
        title={"Add Role"}
        handleModalClose={() => setShowModal(false)}
      >
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
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-2">
                  <InputField
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                  />
                </div>
              {menuList.map((menu,key)=>(
                <div className="col-md-6 mb-2" key={key}>
                  <ReactSelect
                    label={menu}
                    options={permissionOptions}
                    onChange={(selected) =>
                      setFieldValue(menu, selected)
                    }
                    isMulti
                  />
                </div>))}
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Add Role
              </button>
            </form>
          )}
        </Formik>
      </CustomModal>
    </>
  )
}

export default AddRole;