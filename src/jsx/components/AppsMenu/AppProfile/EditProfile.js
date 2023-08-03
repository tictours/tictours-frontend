import React,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Select from "react-select";

import user from './../../../../images/user.jpg';
import DatePicker from 'react-datepicker';

const inputBlog = [
    { label:'Name', value:'' },
    { label:'Email', value:'' },
    { label:'Mobile', value:'' },
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

const EditProfile = () => {
   // const [selectOption , setSelectOption] = useState('Gender');
   const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return(
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
                    <div className="card profile-card card-bx m-b30">
                        <div className="card-header">
                            <h6 className="title">Customer Info</h6>
                        </div>
                        <form className="profile-form">
                            <div className="card-body">
                                <div className="row"> <div className="col-sm-6 m-b30">                                        
                                        <label className="form-label">Agent</label>
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Agent1</option>
                                            <option>Agent2</option>
                                            <option>Agent3</option>
                                        </select>
                                        </div>
                                    { inputBlog.map((item, ind)=>(
                                        <div className="col-sm-6 m-b30" key={ind}>
                                            <label className="form-label">{item.label}</label>
                                            <input type="text" className="form-control" defaultValue={item.value}  />
                                        </div>
                                    ))}
                                   
                                    <div className="col-sm-6 m-b30">                                        
                                        <label className="form-label">Gender</label>
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
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
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Destination</label>                                       
                                        <Select
                                            // closeMenuOnSelect={false}
                                            // components={{ ClearIndicator }}
                                            // styles={{ clearIndicator: ClearIndicatorStyles }}
                                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                                            isMulti
                                            options={destinationOptions}
                                        />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Lead Source</label>
                                        
                                        <select defaultValue={"option"} className="form-control">
                                            <option>Agent</option>
                                            <option>Ads</option>
                                            <option>Social Media</option>
                                            <option>Friend Refer</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label>Start Date</label>
                                        <DatePicker  className="form-control"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}/>
                                        </div>
                                        <div className="col-sm-6 m-b30">
                                        <label>End Date</label>
                                        <DatePicker  className="form-control"
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}/>
                                        </div>
                                        <div className="col-sm-6 m-b30">
                                        <label>Adult</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Package 1"
                                        />
                                        </div>
                                        <div className="col-sm-6 m-b30">
                                        <label>Child</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Package 1"
                                        />
                                         </div>
                                        <div className="col-sm-6 m-b30">
                                        <label>Infant</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Package 1"
                                        />
                                         </div>
                                         <div className="col-sm-6 m-b30">
                                        <label className="form-label">Priority</label>                                       
                                        <Select
                                            // closeMenuOnSelect={false}
                                            // components={{ ClearIndicator }}
                                            // styles={{ clearIndicator: ClearIndicatorStyles }}
                                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                                            // isMulti
                                            options={priorityOptions}
                                        />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label className="form-label">Requirement</label>                                       
                                        <Select
                                            // closeMenuOnSelect={false}
                                            // components={{ ClearIndicator }}
                                            // styles={{ clearIndicator: ClearIndicatorStyles }}
                                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                                            isMulti
                                            options={requirementOptions}
                                        />
                                    </div>
                                    <div className="col-sm-6 m-b30">
                                        <label>Assigned To</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Package 1"
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
                            <div className="card-footer">
                                <button className="btn btn-primary">UPDATE</button>
                                {/* <Link to={"#"} className="btn-link">Forgot your password?</Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditProfile;
