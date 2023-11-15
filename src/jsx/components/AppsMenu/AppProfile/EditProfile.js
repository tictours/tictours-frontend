import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

import user from "./../../../../images/user.jpg";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import SelectField from "../../common/SelectField";
import ReactSelect from "../../common/ReactSelect";
import InputField from "../../common/InputField";
import { SETUP, URLS } from "../../../../constants";
import { notifyCreate } from "../../../utilis/notifyMessage";
import { useAsync } from "../../../utilis/useAsync";


const initialValues = {
  type:'b2b',
  requirement:[],
  startDate:SETUP.TODAY_DATE,
  endDate:SETUP.TODAY_DATE,
}
const TypeOptions = [{label:'B2B',value:'b2b'},{label:'B2C',value:'b2c'}]
const SaluteOptions = [{label:'Mr',value:'mr'},{label:'Ms',value:'ms'}]
const AgentOptions = [
  {label:'Agent 1',value:'agent1'},
  {label:'Agent 2',value:'agent2'},
  {label:'Agent 3',value:'agent3'},
  {label:'Agent 4',value:'agent4'},
                    ]
const CustomerOptions = [
  {name:'Customer 1',id:'customer1'},
  {name:'Customer 2',id:'customer2'},
  {name:'Customer 3',id:'customer3'},
  {name:'Customer 4',id:'customer4'},
                    ]
const LeadOptions = [
  {label:'Agent',value:'1'},
  {label:'Ads',value:'2'},
  {label:'Social Media',value:'3'},
  {label:'Friend Refferal',value:'4'},
                    ]
const StaffOptions = [
  {label:'Staff 1',value:'staff1'},
  {label:'Staff 2',value:'staff2'},
  {label:'Staff 3',value:'staff3'},
  {label:'Staff 4',value:'staff4'},
                    ]

const inputOptions = [
  { label: "Name", name: "name" },
  { label: "Email", name: "email" },
  { label: "Mobile", name: "mobile" },
  // { label:'Skills', value:'HTML,  JavaScript,  PHP' },
];

const destinationOptions = [
  { value: "Dubai", label: "Dubai" },
  { value: "Qatar", label: "Qatar" },
  { value: "Europe", label: "Europe" },
  { value: "India", label: "India" },
  { value: "America", label: "America" },
];
const priorityOptions = [
  { value: "Hot", label: "Hot" },
  { value: "Medium", label: "Medium" },
  { value: "Cold", label: "Cold" },
];
const requirementOptions = [
  { value: "Full Package", label: "Full Package" },
  { value: "Activaties", label: "Activaties" },
  { value: "Flight", label: "Flight" },
  { value: "Hotel", label: "Hotel" },
  { value: "Transport", label: "Transport" },
];

const EditProfile = ({setShowModal}) => {
  // const [selectOption , setSelectOption] = useState('Gender');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues
  })
  const {handleBlur,handleChange,setFieldValue,values} = formik
  const agentData = useAsync(URLS.AGENT_URL)
  const agentDataOptions = agentData?.data?.data
  const destinationId = values.destination?.value
  const subDestinationUrl = `${URLS.SUB_DESTINATION_URL}?destination_id=${destinationId}`

  const destinationData = useAsync(URLS.DESTINATION_URL)
  const subDestinationData = useAsync(subDestinationUrl, destinationId)
  const leadData = useAsync(URLS.LEAD_SOURCE_URL)
  const leadDataOptions = leadData?.data?.data
  const priorityData = useAsync(URLS.PRIORITY_URL)
  const priorityDataOptions = priorityData?.data?.data
  const requirementData = useAsync(URLS.REQUIREMENT_URL)
  const requirementDataOptions = requirementData?.data?.data
  const staffData = useAsync(URLS.USER_GET_URL)
  const staffDataOptions = staffData?.data?.data?.data
  // console.log('val',values)

  const handleClick = () => {
    if(setShowModal){
    setShowModal(false)
    navigate('profile')
  }
    notifyCreate('Profile')
  }
  return (
    <>
      <div className="row">
        {/* <div className="col-xl-3 col-lg-4">
                    <div className="clearfix">
                        <div className="card card-bx profile-card author-profile m-b30">
                            <div className="card-body">
                                <div className="p-5">
                                    <div className="author-profile">
                                        <div className="author-media">
                                            <img src={user} alt="" />
                                            <div className="upload-link" title="" data-toggle="tooltip" data-placement="right" data-original-title="update">
                                                <input type="file" className="update-flie" />
                                                <i className="fa fa-camera"></i>
                                            </div>
                                        </div>
                                        <div className="author-info">
                                            <h6 className="title">Nella Vita</h6>
                                            <span>Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-list">
                                    <ul>
                                        <li><a href="app-profile.html">Models</a><span>36</span></li>
                                        <li><a href="uc-lightgallery.html">Gallery</a><span>3</span></li>
                                        <li><a href="app-profile.html">Lessons</a><span>1</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="input-group mb-3">
                                    <div className="form-control rounded text-center bg-white">Portfolio</div>
                                </div>
                                <div className="input-group">
                                    <a href="https://www.dexignlab.com/" className="form-control text-primary rounded text-start bg-white">https://www.dexignlab.com/</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card profile-card card-bx m-b30 border-0">
            {/* <div className="card-header">
              <h6 className="title">Customer Info</h6>
            </div> */}
            <form className="profile-form">
              <div className="card-body">
                <div className="row">
                  {" "}
                  <div className="col-sm-6">
                  <SelectField
                        label="Type"
                        name={"type"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={TypeOptions}
                        optionValue='value'
                        optionLabel='label'
                      />
                  </div>
                  <div className="col-sm-6">
                  <ReactSelect
                        label={values.type === 'b2b' ? 'Agent' : 'Customer'}
                        onChange={(selected) =>
                          setFieldValue("typeValue", selected.value)
                        }
                        onBlur={handleBlur}
                        values={values}
                        options={values.type === 'b2b' ? agentDataOptions : CustomerOptions}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  {inputOptions.map((item, ind) => (
                    <div className="col-sm-6" key={ind}>
                      {/* <label className="form-label">{item.label}</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={item.value}
                      /> */}
                       <InputField
                        label={item.label}
                        name={item.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                    </div>
                  ))}
                  <div className="col-sm-6">
                  <SelectField
                        label="Salute"
                        name={"salute"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={SaluteOptions}
                        optionValue='value'
                        optionLabel='label'
                      />
                    {/* <Dropdown className="profile-btn">
                                            <Dropdown.Toggle as="div" className="i-false profile-btn-toggle">{selectOption} <i className="fa-solid fa-angle-down"></i></Dropdown.Toggle>
                                            <Dropdown.Menu> 
                                                <Dropdown.Item onClick={()=>setSelectOption("Male")}>Male</Dropdown.Item>
                                                <Dropdown.Item onClick={()=>setSelectOption("Female")}>Female</Dropdown.Item>
                                                <Dropdown.Item onClick={()=>setSelectOption("Other")}>Other</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                  </div>
                  {/* <div className="col-sm-6 m-b30">
                                        <label className="form-label">Birth</label>
                                        <input type="text" className="form-control" placeholder="dd. mm .yyyy" />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" defaultValue="+123456789" />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Email address</label>
                                        <input type="text" className="form-control" defaultValue="demo@gmail.com" />
                                    </div> */}
                  <div className="col-sm-6">
                    {/* <label className="form-label">Destination</label>
                    <Select
                      // closeMenuOnSelect={false}
                      // components={{ ClearIndicator }}
                      // styles={{ clearIndicator: ClearIndicatorStyles }}
                      // defaultValue={[colourOptions[4], colourOptions[5]]}
                      isMulti
                      options={destinationOptions}
                    /> */}
                     {/* <SelectField
                        label="Destination"
                        name={"destination"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={destinationOptions}
                        optionValue='value'
                        optionLabel='label'
                      /> */}
                       <ReactSelect
                        label="Destination"
                        onChange={(selected) =>
                          setFieldValue("destination", selected)
                        }
                        onBlur={handleBlur}
                        // values={values}
                        options={destinationData?.data?.data}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  <div className="col-sm-6">
                    {/* <label className="form-label">Sub Destination</label>
                    <Select
                      // closeMenuOnSelect={false}
                      // components={{ ClearIndicator }}
                      // styles={{ clearIndicator: ClearIndicatorStyles }}
                      // defaultValue={[colourOptions[4], colourOptions[5]]}
                      isMulti
                      options={destinationOptions}
                    /> */}
                    <ReactSelect
                        label="Sub Destination"
                        onChange={(selected) =>
                          setFieldValue("subDestination", selected)
                        }
                        onBlur={handleBlur}
                        // values={values}
                        options={subDestinationData?.data?.data}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label>Start Date</label>
                    <DatePicker
                      className="form-control"
                      selected={values.startDate}
                      onChange={(date) => setFieldValue('startDate',date)}
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <label>End Date</label>
                    <DatePicker
                      className="form-control"
                      selected={values.endDate}
                      onChange={(date) => setFieldValue('endDate',date)}
                    />
                  </div>
                  <div className="col-sm-6">
                     <InputField
                        label="Adult"
                        name="adult"
                        type='number'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                  </div>
                  <div className="col-sm-6">
                     <InputField
                        label="Child"
                        name="child"
                        type='number'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                  </div>
                  <div className="col-sm-6">
                     <InputField
                        label="Infant"
                        name="infant"
                        type='number'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                      />
                  </div>
                  <div className="col-sm-6">
                     <SelectField
                        label="Lead"
                        name={"lead"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={leadDataOptions}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  <div className="col-sm-6">
                     <SelectField
                        label="Priority"
                        name={"priority"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={priorityDataOptions}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  <div className="col-sm-6">
                     <ReactSelect
                        isMulti
                        label='Requirement'
                        onChange={(selected) =>{
                          setFieldValue("requirement", selected)
                        }}
                        onBlur={handleBlur}
                        values={values}
                        options={requirementDataOptions}
                        optionValue='id'
                        optionLabel='name'
                      />
                  </div>
                  <div className="col-sm-6">
                  <ReactSelect             
                        label='Assigned To'
                        onChange={(selected) =>
                          setFieldValue("assigned", selected.value)
                        }
                        onBlur={handleBlur}
                        values={values}
                        options={staffDataOptions}
                        optionValue='id'
                        optionLabel='first_name'
                      />
                  </div>
                  {/* <div className="col-sm-6 m-b30">
                                        <label className="form-label">City</label>
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Krasnodar</option>
                                            <option>Tyumen</option>
                                            <option>Chelyabinsk</option>
                                            <option>Moscow</option>
                                        </select>
                                       
                                    </div> */}
                </div>
              </div>
              <div className="card-footer border-0 pt-0 pb-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleClick}
                >
                  UPDATE
                </button>
                {/* <Link to={"#"} className="btn-link">Forgot your password?</Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
