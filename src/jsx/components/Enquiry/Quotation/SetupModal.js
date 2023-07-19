import React, { useState } from 'react'
import CustomModal from '../../../layouts/CustomModal'
import DatePicker from "react-datepicker";
import { notify } from '../../common/Notify';



function SetupModal({showModal,setShowModal}) {
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formValidityDate, setFormValidityDate] = useState(new Date());


    const formSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        notify('Completed notify')
      }
  return (
    <>
    <CustomModal
            showModal={showModal}
            title={"Create itinerary"}
            handleModalClose={() => setShowModal(false)}
          >
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={formSubmit}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <label>Package Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Start Date</label>
                      <DatePicker  className="form-control custom-input"
                        selected={formStartDate}
                        onChange={(date) => setFormStartDate(date)}/>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>End Date</label>
                      <DatePicker  className="form-control custom-input"
                        selected={formEndDate}
                        onChange={(date) => setFormEndDate(date)}/>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Adult</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        // placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Child</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        // placeholder="Package 1"
                      />
                    </div>
                    <div className="form-group mb-3 col-md-3">
                      <label>Destination</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control custom-input"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Dubai</option>
                        <option>Sharjah</option>
                        <option>Qatar</option>
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <label>Validity</label>
                      <DatePicker  className="form-control custom-input"
                        selected={formValidityDate}
                        onChange={(date) => setFormValidityDate(date)}/>
                    </div>
                    </div>
                  {/* <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <label>State</label>
                      <select
                        defaultValue={"option"}
                        id="inputState"
                        className="form-control"
                      >
                        <option value="option" disabled>
                          Choose...
                        </option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label>Zip</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Check me out</label>
                    </div>
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Create itinerary
                  </button>
                </form>
              </div>
            </div>
          </CustomModal>
    </>
  )
}

export default SetupModal