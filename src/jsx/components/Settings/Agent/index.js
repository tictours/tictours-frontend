import React, { useState } from "react";
import { Link } from "react-router-dom";

//component
// import DropDownBlog from '../../DropDownBlog';

//images
import pic1 from "../../../../images/contacts/1.jpg";

import DropDownBlog from "../../Dashboard/DropDownBlog";
import AddAgent from "./addAgent";
import { useAsync } from "../../../utilis/useAsync";
import { URLS } from "../../../../constants";
import NoData from "../../common/NoData";
import Avatar from "../../common/Avatar";
import DeleteModal from "../../common/DeleteModal";

const contactData = [
  { image: pic1, title: "Jordana" },
  { image: pic1, title: "Jacob Jack" },
  { image: pic1, title: "Gibs Gibsy" },
  { image: pic1, title: "Sammy" },
  { image: pic1, title: "Core" },
  { image: pic1, title: "Jordan Nico" },
  { image: pic1, title: "Sodara" },
  { image: pic1, title: "Smith" },
  { image: pic1, title: "Nico" },
  { image: pic1, title: "Samantha" },
  { image: pic1, title: "Adja" },
  { image: pic1, title: "Johnny" },
];

const Agent = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUrl, setDeleteUrl] = useState('');
  const [deleteName, setDeleteName] = useState('');
  const url = URLS.AGENT_URL
  const agentData  = useAsync(url)
  const tableData = agentData?.data?.data

  const onEdit = (id) => {
    setEditId(id)
    setShowAddModal(true)
  }
  const onDelete = (id,name) => {
    setDeleteUrl(`${url}/${id}`)
    setDeleteName(name)
    setShowDeleteModal(true)
  }
  const onStatus = (id,name) => {
    console.log('onStatus',name)
  }
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-titles">
                <div className="d-flex align-items-center">
                  <h2 className="heading">Agent</h2>
                </div>
                <div className="right-area folder-layout-tab">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn-primary"
                  >
                    New Agent{" "}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.05 3 3 7.05 3 12C3 16.95 7.05 21 12 21C16.95 21 21 16.95 21 12C21 7.05 16.95 3 12 3ZM12 19.125C8.1 19.125 4.875 15.9 4.875 12C4.875 8.1 8.1 4.875 12 4.875C15.9 4.875 19.125 8.1 19.125 12C19.125 15.9 15.9 19.125 12 19.125Z"
                        fill="#FCFCFC"
                      />
                      <path
                        d="M16.3498 11.0251H12.9748V7.65009C12.9748 7.12509 12.5248 6.67509 11.9998 6.67509C11.4748 6.67509 11.0248 7.12509 11.0248 7.65009V11.0251H7.6498C7.1248 11.0251 6.6748 11.4751 6.6748 12.0001C6.6748 12.5251 7.1248 12.9751 7.6498 12.9751H11.0248V16.3501C11.0248 16.8751 11.4748 17.3251 11.9998 17.3251C12.5248 17.3251 12.9748 16.8751 12.9748 16.3501V12.9751H16.3498C16.8748 12.9751 17.3248 12.5251 17.3248 12.0001C17.3248 11.4751 16.8748 11.0251 16.3498 11.0251Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              {agentData?.loading ? 
              <NoData isCard={true} isLoading={agentData.loading}/> :
              <div className="row">
                {tableData?.map((item, ind) => (
                  <div className="col-xl-4 col-md-6" key={ind}>
                    <div className="card contact_list ">
                      <div className="card-body">
                        <div className="user-content">
                          <div className="user-info">
                            <div className="user-img">
                              {/* <img src={item.image} alt="" /> */}
                              <Avatar name={item.name} index={ind}/>
                            </div>
                            <div className="user-details">
                              <h4 className="user-name">{item.name}</h4>
                              <span className="number">{item.phone}</span>
                              <span className="mail">{item.email}</span>
                              <span className="mail">Location : {item.country_name}</span>
                              <span className="mail">Address : {item.address}</span>
                            </div>
                          </div>
                          <DropDownBlog onEdit={()=>onEdit(item.id)} onDelete={()=>onDelete(item.id,item.name)}
                          isActive={true} onStatus={()=>onStatus(item.id,item.name)}/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              }
            </div>
          </div>
         {!!tableData?.length && <div className="table-pagenation mb-3">
            <p className="ms-0">
              Showing <span>12-24</span>from <span>100</span>data
            </p>
            <nav>
              <ul className="pagination pagination-gutter pagination-primary no-bg">
                <li className="page-item page-indicator">
                  <Link to={"#"} className="page-link">
                    <i className="fa-solid fa-angle-left"></i>
                  </Link>
                </li>
                <li className="page-item ">
                  <Link to={"#"} className="page-link">
                    1
                  </Link>
                </li>
                <li className="page-item active">
                  <Link to={"#"} className="page-link">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link to={"#"} className="page-link">
                    3
                  </Link>
                </li>
                <li className="page-item page-indicator me-0">
                  <Link to={"#"} className="page-link">
                    <i className="fa-solid fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </nav>
            </div>}
        </div>
      </div>
      <AddAgent showModal={showAddModal} setShowModal={setShowAddModal} editId={editId} setEditId={setEditId} />
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} name={deleteName} url={deleteUrl} />
    </>
  );
};
export default Agent;
