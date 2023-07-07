import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import DatePicker from "react-datepicker";
import { Badge, Button, Form } from 'react-bootstrap';
import CustomModal from '../../layouts/CustomModal';
import { ToastContainer, toast } from 'react-toastify';

const options = [
    //{ value: '1', label: 'Select Status' },
    { value: '2', label: 'Published' },
    { value: '3', label: 'Draft' },
    { value: '4', label: 'Trash' },
    { value: '5', label: 'Private' },
    { value: '6', label: 'Pending' }
]


const tableData = [
    {number:"1", title:"Privacy Policy"},
    {number:"2", title:"Contact Us"},
    {number:"3", title:"Price"},
    {number:"4", title:"Blog"},
    {number:"5", title:"Faq"},
    {number:"6", title:"About us"},
    {number:"7", title:"Portfolio"},
    {number:"8", title:"Schedule"},
    {number:"9", title:"Under Maintenance"},
    {number:"10", title:"Comming Soon"},
    {number:"11", title:"Faq"},
    {number:"12", title:"About us"},
    {number:"13", title:"Portfolio"},
];

const Quotation = () =>{
    const [startDate, setStartDate] = useState(new Date());
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formValidityDate, setFormValidityDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const [data, setData] = useState(
		document.querySelectorAll("#content_wrapper tbody tr")
	);
	const sort = 8;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#content_wrapper tbody tr"));
      //chackboxFun();
	}, [test]);

  
   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};
   
	
    const [deleteItem, setDeleteItem] = useState(tableData);
    const handleDelete = ind => {
        setDeleteItem(oldValues => {
          return oldValues.filter((_, i) => i !== ind)
        })
    }
    const notifyTopCenter = () => {
      toast.success("Itinerary Created Successfuly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    const formSubmit = (e) => {
      e.preventDefault()
      setShowModal(false)
      notifyTopCenter()
    }
    return (
      <>
        <div className="row">
        <ToastContainer />
          <div className="col-xl-12">
            <div className="filter cm-content-box box-primary">
              <div className="content-title">
                <div className="cpa">
                  <i className="fas fa-filter me-2"></i>Filter
                </div>
                <div className="tools">
                  <Link
                    to={"#"}
                    className={`SlideToolHeader ${
                      open ? "collapse" : "expand"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    <i className="fas fa-angle-up"></i>
                  </Link>
                </div>
              </div>

              <Collapse in={open}>
                <div className="cm-content-body form excerpt">
                  <div className="card-body">
                    <div className="row filter-row">
                      <div className="col-xl-3 col-xxl-6">
                        <input
                          type="text"
                          className="form-control mb-xl-0 mb-3"
                          id="exampleFormControlInput1"
                          placeholder="Title"
                        />
                      </div>
                      <div className="col-xl-3 col-xxl-6">
                        <Select
                          options={options}
                          className="custom-react-select mb-3 mb-xxl-0"
                        />
                      </div>
                      <div className="col-xl-3 col-xxl-6">
                        <DatePicker
                          className="form-control mb-xxl-0 mb-3"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div className="col-xl-3 col-xxl-6">
                        <button
                          className="btn btn-primary me-2"
                          title="Click here to Search"
                          type="button"
                        >
                          <i className="fa fa-search me-1"></i>Filter
                        </button>
                        <button
                          className="btn btn-danger light"
                          title="Click here to remove filter"
                          type="button"
                        >
                          Remove Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div className="">
                <Link to={"/combine"} className="btn btn-primary">
                  Combine itinerary
                </Link>
              </div>
              <div className="d-flex">
                <div className="">
                  <Link to={"/combine"} className="btn btn-primary">
                    Insert itinerary
                  </Link>
                </div>
                <div className="ms-2">
                  <button className="btn btn-primary" onClick={()=>setShowModal(true)}>
                    Create itinerary
                  </button>
                </div>
              </div>
            </div>
            <div className="filter cm-content-box box-primary mt-5">
              <div className={`content-title`}>
                <div className="cpa">
                  <i className="fas fa-file-word me-2"></i>Contact List
                </div>
                <div className="tools">
                  <Link
                    to={"#"}
                    className={`SlideToolHeader ${
                      open2 ? "collapse" : "expand"
                    }`}
                    onClick={() => setOpen2(!open2)}
                  >
                    <i className="fas fa-angle-up"></i>
                  </Link>
                </div>
              </div>
              <Collapse in={open2}>
                <div className="cm-content-body form excerpt">
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        id="content_wrapper"
                        className="dataTables_wrapper no-footer"
                      >
                        <table className="table table-bordered table-responsive-lg table-striped table-condensed flip-content">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Package Name</th>
                              <th>Pax</th>
                              <th>From Date</th>
                              <th>To Date</th>
                              <th>Created By</th>
                              <th>Created Date</th>
                              <th>Title</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deleteItem.map((item, ind) => (
                              <tr key={ind}>
                                <td>{item.number}</td>
                                <td>{`Package ${item.number}`}</td>
                                <td>2 Adults</td>
                                <td>18 Feb, 2023</td>
                                <td>28 Feb, 2023</td>
                                <td>sahid</td>
                                <td>18 Feb, 2023</td>
                                <td>Option 1</td>
                                <td>25000</td>
                                <td>
                                  <Badge bg="" className="light badge-warning">
                                    Pending
                                  </Badge>
                                </td>
                                <td className="text-end">
                                  <Link
                                    to={"/add-content"}
                                    className="btn btn-warning btn-sm content-icon me-1"
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <Link
                                    to={"#"}
                                    className="btn btn-danger btn-sm content-icon ms-1"
                                    onClick={() => handleDelete(ind)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                          <div className="dataTables_info">
                            Showing {activePag.current * sort + 1} to{" "}
                            {data.length > (activePag.current + 1) * sort
                              ? (activePag.current + 1) * sort
                              : data.length}{" "}
                            of {data.length} entries
                          </div>
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="example2_paginate"
                          >
                            <Link
                              className="paginate_button previous disabled"
                              to="/content"
                              onClick={() =>
                                activePag.current > 0 &&
                                onClick(activePag.current - 1)
                              }
                            >
                              <i
                                className="fa fa-angle-double-left"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            <span>
                              {paggination.map((number, i) => (
                                <Link
                                  key={i}
                                  to="/content"
                                  className={`paginate_button  ${
                                    activePag.current === i ? "current" : ""
                                  } `}
                                  onClick={() => onClick(i)}
                                >
                                  {number}
                                </Link>
                              ))}
                            </span>
                            <Link
                              className="paginate_button next"
                              to="/content"
                              onClick={() =>
                                activePag.current + 1 < paggination.length &&
                                onClick(activePag.current + 1)
                              }
                            >
                              <i
                                className="fa fa-angle-double-right"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
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
        </div>
      </>
    );
}
export default Quotation;