import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import user from "./../../../../images/user.jpg";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import SelectField from "../../common/SelectField";
import ReactSelect from "../../common/ReactSelect";
import InputField from "../../common/InputField";
import { SETUP, URLS } from "../../../../constants";
import { notifyCreate, notifyError } from "../../../utilis/notifyMessage";
import { useAsync } from "../../../utilis/useAsync";
import { axiosPut, filePost } from "../../../../services/AxiosInstance";
import CustomDatePicker from "../../common/CustomDatePicker";
import { formatDate, parseDate } from "../../../utilis/date";
import { checkFormValue } from "../../../utilis/check";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchAction } from "../../../../store/slices/fetchSlice";

const initialValues = {
  type: "B2B",
  requirement: [],
  startDate: SETUP.TODAY_DATE,
  endDate: SETUP.TODAY_DATE,
  adult: 0,
  child: 0,
  infant: 0,
};
const TypeOptions = [
  { label: "B2B", value: "B2B" },
  { label: "B2C", value: "B2C" },
];
const SaluteOptions = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
];
const AgentOptions = [
  { label: "Agent 1", value: "agent1" },
  { label: "Agent 2", value: "agent2" },
  { label: "Agent 3", value: "agent3" },
  { label: "Agent 4", value: "agent4" },
];
const CustomerOptions = [
  { name: "Customer 1", id: "customer1" },
  { name: "Customer 2", id: "customer2" },
  { name: "Customer 3", id: "customer3" },
  { name: "Customer 4", id: "customer4" },
];
const LeadOptions = [
  { label: "Agent", value: "1" },
  { label: "Ads", value: "2" },
  { label: "Social Media", value: "3" },
  { label: "Friend Refferal", value: "4" },
];
const StaffOptions = [
  { label: "Staff 1", value: "staff1" },
  { label: "Staff 2", value: "staff2" },
  { label: "Staff 3", value: "staff3" },
  { label: "Staff 4", value: "staff4" },
];

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

const EditProfile = ({ setShowModal }) => {
  // const [selectOption , setSelectOption] = useState('Gender');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = id && id !== "add";
  const formik = useFormik({
    initialValues,
  });
  const { handleBlur, handleChange, setFieldValue, values } = formik;
  const url = URLS.ENQUIRY_URL;
  const editUrl = `${url}/${id}`;
  const { data } = useAsync(editUrl, !!isEdit);
  const editData = data?.data;
  const selectedTypeValue = values.typeValue;
  const isB2b = values.type.value === "B2B";

  const agentData = useAsync(URLS.AGENT_URL);
  const agentDataOptions = agentData?.data?.data;
  const customerData = useAsync(URLS.CUSTOMER_URL);
  const customerDataOptions = customerData?.data?.data;
  const fetchSelectedAgent = useAsync(
    URLS.AGENT_URL + "/" + selectedTypeValue?.value,
    isB2b && selectedTypeValue?.value
  );
  const selectedAgentData = fetchSelectedAgent?.data?.data;
  const fetchCustomerData = useAsync(
    URLS.CUSTOMER_URL + "?mobile=" + selectedTypeValue?.label,
    !isB2b && selectedTypeValue?.label
  );
  const selectedCustomerData = fetchCustomerData?.data?.data;

  const destinationId = values.destination?.value;
  const subDestinationUrl = `${URLS.SUB_DESTINATION_URL}?destination_id=${destinationId}`;

  const destinationData = useAsync(URLS.DESTINATION_URL);
  const subDestinationData = useAsync(subDestinationUrl, destinationId);
  const leadData = useAsync(URLS.LEAD_SOURCE_URL);
  const leadDataOptions = leadData?.data?.data;
  const priorityData = useAsync(URLS.PRIORITY_URL);
  const priorityDataOptions = priorityData?.data?.data;
  const requirementData = useAsync(URLS.REQUIREMENT_URL);
  const requirementDataOptions = requirementData?.data?.data;
  const staffData = useAsync(URLS.USER_GET_URL);
  const staffDataOptions = staffData?.data?.data?.data;

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("type", values.type?.value);
      if (isB2b) {
        formData.append("agent_id", values.typeValue?.value);
      } else {
        formData.append("name", checkFormValue(values.name));
        formData.append("email", checkFormValue(values.email));
        formData.append("mobile", checkFormValue(values.mobile));
        formData.append("salute", checkFormValue(values.salute));
      }
      formData.append(
        "destination_id",
        checkFormValue(values.destination?.value)
      );
      formData.append(
        "sub_destination_id",
        checkFormValue(values.subDestination?.value)
      );
      formData.append("start_date", formatDate(values.startDate));
      formData.append("end_date", formatDate(values.endDate));
      formData.append("adult_count", checkFormValue(values.adult));
      formData.append("child_count", checkFormValue(values.child));
      formData.append("infant_count", checkFormValue(values.infant));
      formData.append("lead_source_id", checkFormValue(values.lead));
      formData.append("priority_id", checkFormValue(values.priority));
      values.requirement.forEach((data, ind) => {
        // if(data.isExist){
        //   formData.append(`requirements[id]`,data?.value)
        // }
        formData.append(`requirements[${ind}]`, data?.value);
      });
      formData.append("assigned_to", checkFormValue(values.assigned?.value));
      let response;
      if (isEdit) {
        response = await axiosPut(editUrl, formData);
      } else {
        response = await filePost(url, formData);
      }

      if (setShowModal) {
        setShowModal(false);
        navigate(`${response?.data?.id}/profile`);
      }
      if (response?.success) {
        notifyCreate("Profile", isEdit);
      }
    } catch (error) {
      console.log("er", error);
      notifyError(error);
    }
  };

  useEffect(() => {
    if (editData) {
      dispatch(FetchAction.setEnquiryById(editData));
      setDisabled(true);
      const isB2b = editData.type == "B2B";
      const typeData = isB2b ? editData.agent : editData.customer;
      const type = {
        label: checkFormValue(editData.type),
        value: checkFormValue(editData.type),
      };
      const typeObj = {
        label: checkFormValue(typeData?.name),
        value: checkFormValue(typeData?.id),
      };
      setFieldValue("type", checkFormValue(type));
      setFieldValue("typeValue", checkFormValue(typeObj));
      setFieldValue("name", checkFormValue(typeData?.name));
      setFieldValue("email", checkFormValue(typeData?.email));
      setFieldValue(
        "mobile",
        checkFormValue(typeData?.mobile || typeData?.phone)
      );
      setFieldValue("salute", checkFormValue(typeData?.salute));
      setFieldValue("destination", {
        value: editData.destination?.id,
        label: editData.destination?.name,
      });
      setFieldValue("subDestination", {
        value: editData.sub_destination?.id,
        label: editData.sub_destination?.name,
      });
      setFieldValue("startDate", parseDate(editData.start_date));
      setFieldValue("endDate", parseDate(editData.end_date));
      setFieldValue("adult", checkFormValue(editData.adult_count));
      setFieldValue("child", checkFormValue(editData.child_count));
      setFieldValue("infant", checkFormValue(editData.infant_count));
      setFieldValue("lead", checkFormValue(editData.lead_source_id));
      setFieldValue("priority", checkFormValue(editData.priority_id));
      setFieldValue("assigned", {
        value: editData.assigned_to_user?.id,
        label: editData.assigned_to_user?.first_name,
      });
      const requirementArr = editData.requirements.map((data) => {
        const val = { label: data.name, value: data.id, isExist: true };
        return val;
      });
      setFieldValue("requirement", requirementArr);
    }
  }, [editData, id]);

  let selectedTypeData;
  if (isB2b) {
    selectedTypeData = selectedAgentData;
  } else {
    if (selectedCustomerData) {
      selectedTypeData = selectedCustomerData[0];
    }
  }
  useEffect(() => {
    if (selectedTypeData) {
      setFieldValue("name", checkFormValue(selectedTypeData.name));
      setFieldValue("email", checkFormValue(selectedTypeData.email));
      if (!isB2b) {
        setFieldValue("salute", checkFormValue(selectedTypeData.salute));
        setFieldValue("mobile", checkFormValue(selectedTypeData.mobile));
      } else {
        setFieldValue("mobile", checkFormValue(selectedTypeData.phone));
      }
    }
  }, [selectedTypeValue?.id, selectedTypeData?.id]);

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
                    <ReactSelect
                      label="Type"
                      onChange={(selected) => {
                        setDisabled(true);
                        setFieldValue("type", selected);
                      }}
                      onBlur={handleBlur}
                      value={values.type}
                      options={TypeOptions}
                      optionValue="value"
                      optionLabel="label"
                    />
                  </div>
                  <div className="col-sm-6">
                    <ReactSelect
                      label={isB2b ? "Agent" : "Customer"}
                      onChange={(selected) => {
                        setDisabled(true);
                        setFieldValue("typeValue", selected);
                      }}
                      onBlur={handleBlur}
                      value={values.typeValue}
                      options={isB2b ? agentDataOptions : customerDataOptions}
                      optionValue="id"
                      optionLabel={isB2b ? "name" : "mobile"}
                    />
                  </div>
                  {!isB2b && (
                    <div className="col-sm-6">
                      <SelectField
                        label="Salute"
                        name={"salute"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        options={SaluteOptions}
                        optionValue="value"
                        optionLabel="label"
                        required
                        disabled={disabled}
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
                  )}
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
                        disabled={disabled}
                        required
                      />
                    </div>
                  ))}
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
                      value={values.destination}
                      options={destinationData?.data?.data}
                      optionValue="id"
                      optionLabel="name"
                      required
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
                      value={values.subDestination}
                      options={subDestinationData?.data?.data}
                      optionValue="id"
                      optionLabel="name"
                      required
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <CustomDatePicker
                      label="Start Date"
                      selected={formik.values?.startDate}
                      onChange={(date) =>
                        formik.setFieldValue("startDate", date)
                      }
                    />
                  </div>
                  <div className="col-sm-6 m-b30">
                    <CustomDatePicker
                      label="End Date"
                      selected={formik.values?.endDate}
                      onChange={(date) => formik.setFieldValue("endDate", date)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Adult"
                      name="adult"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Child"
                      name="child"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      label="Infant"
                      name="infant"
                      type="number"
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
                      optionValue="id"
                      optionLabel="name"
                      required
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
                      optionValue="id"
                      optionLabel="name"
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <ReactSelect
                      isMulti
                      label="Requirement"
                      onChange={(selected) => {
                        setFieldValue("requirement", selected);
                      }}
                      onBlur={handleBlur}
                      value={values.requirement}
                      options={requirementDataOptions}
                      optionValue="id"
                      optionLabel="name"
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <ReactSelect
                      label="Assigned To"
                      onChange={(selected) =>
                        setFieldValue("assigned", selected)
                      }
                      onBlur={handleBlur}
                      value={values.assigned}
                      options={staffDataOptions}
                      optionValue="id"
                      optionLabel="first_name"
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
