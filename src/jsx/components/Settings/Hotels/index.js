import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Dropdown } from "react-bootstrap";

import InvoiceSlider from "../../Dashboard/InvoiceSlider";
import QuestionIcon from "../../Dashboard/Ticketing/QuestionIcon";
import course1 from "../../../../images/course/hotel-1.jpg";
import CourseSlider from "../../Dashboard/CourseSlider";
import { useDispatch } from "react-redux";
import { FormAction } from "../../../../store/slices/formSlice";
import { useAsync } from "../../../utilis/useAsync";
import { URLS } from "../../../../constants";
import { axiosDelete } from "../../../../services/AxiosInstance";
import { notifyDelete, notifyError } from "../../../utilis/notifyMessage";
import NoData from '../../common/NoData'

const RightIcon = () => {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.50912 14.5C5.25012 14.5 4.99413 14.4005 4.80013 14.2065L1.79362 11.2C1.40213 10.809 1.40213 10.174 1.79362 9.78302C2.18512 9.39152 2.81913 9.39152 3.21063 9.78302L5.62812 12.2005L12.9306 7.18802C13.3866 6.87502 14.0106 6.99102 14.3236 7.44702C14.6371 7.90352 14.5211 8.52702 14.0646 8.84052L6.07613 14.324C5.90363 14.442 5.70612 14.5 5.50912 14.5Z"
          fill="#1EBA62"
        />
        <path
          d="M5.50912 8.98807C5.25012 8.98807 4.99413 8.88857 4.80013 8.69457L1.79362 5.68807C1.40213 5.29657 1.40213 4.66207 1.79362 4.27107C2.18512 3.87957 2.81913 3.87957 3.21063 4.27107L5.62812 6.68857L12.9306 1.67607C13.3866 1.36307 14.0106 1.47907 14.3236 1.93507C14.6371 2.39157 14.5211 3.01507 14.0646 3.32857L6.07613 8.81257C5.90363 8.93057 5.70612 8.98807 5.50912 8.98807Z"
          fill="#1EBA62"
        />
      </svg>
    </>
  );
};

const tableBlog = [
  {
    title: "Talan Siphron",
    mail: "ahmad@mail.com",
    icon: "#1EBA62",
    iconClass: "btn-success",
    icon2: <RightIcon />,
    icontext: "Confirmed",
  },
  {
    title: "Thomas Khun",
    mail: "soap@mail.com",
    icon: "#FF4646",
    iconClass: "btn-primary",
    icon2: <QuestionIcon colorchange="#01A3FF" />,
    icontext: "Pending",
  },
  {
    title: "Marilyn Workman",
    mail: "mantha@mail.com",
    icon: "#FF4646",
    iconClass: "btn-pink",
    icon2: <QuestionIcon colorchange="#EB62D0" />,
    icontext: "W. Approval",
  },
  {
    title: "Thomas Khun",
    mail: "hope@mail.com",
    icon: "#FF4646",
    iconClass: "btn-primary",
    icon2: <QuestionIcon colorchange="#01A3FF" />,
    icontext: "Pending",
  },
  {
    title: "Talan Siphron",
    mail: "jordan@mail.com",
    icon: "#1EBA62",
    iconClass: "btn-success",
    icon2: <RightIcon />,
    icontext: "Complete",
  },
  {
    title: "Marilyn Workman",
    mail: "adja@mail.com",
    icon: "#FF4646",
    iconClass: "btn-pink",
    icon2: <QuestionIcon colorchange="#EB62D0" />,
    icontext: "W. Approval",
  },
  {
    title: "Thomas Khun",
    mail: "soap@mail.com",
    icon: "#FF4646",
    iconClass: "btn-primary",
    icon2: <QuestionIcon colorchange="#01A3FF" />,
    icontext: "Pending",
  },
  {
    title: "Talan Siphron",
    mail: "kevin@mail.com",
    icon: "#FF4646",
    iconClass: "btn-pink",
    icon2: <QuestionIcon colorchange="#EB62D0" />,
    icontext: "W. Approval",
  },
  {
    title: "Marilyn Workman",
    mail: "vita@mail.com",
    icon: "#1EBA62",
    iconClass: "btn-success",
    icon2: <RightIcon />,
    icontext: "Complete",
  },
];
const bigCardData = [
  {
    id: "1",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 1",
  },
  {
    id: "2",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 2",
  },
  {
    id: "3",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 3",
  },
  {
    id: "4",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 4",
  },
  {
    id: "5",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 5",
  },
  {
    id: "6",
    image: course1,
    title: "India, Edappally ,Kochi Kerala",
    name: "Hotel 6",
  },
];

const Hotels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hotelData = useAsync(URLS.HOTEL_URL)
  console.log('hotel',hotelData)
  const [data, setData] = useState(
    document.querySelectorAll("#example2_wrapper tbody tr"),
  );
  const sort = 8;
  const activePag = useRef(0);
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
    setData(document.querySelectorAll("#example2_wrapper tbody tr"));
    //chackboxFun();
  }, []);

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
    //settest(i);
  };

  const chackbox = document.querySelectorAll(".sorting_1 input");
  const motherChackBox = document.querySelector(".sorting_asc input");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  const handleEdit = (id) => {
    // dispatch(FormAction.setEditId(id));
    navigate(`add/${id}`);
  };
  const handleDelete = async (id, name) => {
    const deleteUrl = `${URLS.HOTEL_URL}/${id}`;
    try {
      const response = await axiosDelete(deleteUrl);
      if (response.success) {
        dispatch(FormAction.setRefresh());
        notifyDelete(name);
      }
    } catch (error) {
      notifyError("Something went wrong !");
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="page-titles">
                <div className="d-flex align-items-center">
                  <h2 className="heading">Hotels</h2>
                </div>
                <div className="d-flex flex-wrap my-2 my-sm-0">
                  <div className="input-group search-area">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here..."
                    />
                    <span className="input-group-text">
                      <Link to={"#"}>
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M16.6751 19.4916C16.2194 19.036 16.2194 18.2973 16.6751 17.8417C17.1307 17.3861 17.8694 17.3861 18.325 17.8417L22.9916 22.5084C23.4473 22.964 23.4473 23.7027 22.9916 24.1583C22.536 24.6139 21.7973 24.6139 21.3417 24.1583L16.6751 19.4916Z"
                            fill="white"
                          />
                          <path
                            d="M12.8333 18.6667C16.055 18.6667 18.6667 16.055 18.6667 12.8334C18.6667 9.61169 16.055 7.00002 12.8333 7.00002C9.61166 7.00002 6.99999 9.61169 6.99999 12.8334C6.99999 16.055 9.61166 18.6667 12.8333 18.6667ZM12.8333 21C8.323 21 4.66666 17.3437 4.66666 12.8334C4.66666 8.32303 8.323 4.66669 12.8333 4.66669C17.3436 4.66669 21 8.32303 21 12.8334C21 17.3437 17.3436 21 12.8333 21Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </span>
                  </div>
                  <div className="invoice-btn">
                    <button
                      onClick={() => navigate(`add`)}
                      className="btn btn-primary"
                    >
                      New Hotels{" "}
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
            </div>
          </div>
          {/* swiper */}
          <div className="row">
            <CourseSlider />
          </div>
          {/* swiper end */}

          <div className="row">
            {hotelData?.data?.data?.length > 0 ?
            hotelData?.data?.data?.map((item, index) => (
              <div className="col-xl-3 col-xxl-4 col-sm-6" key={index}>
                <div className="card all-crs-wid">
                  <div className="card-body">
                    <div className="courses-bx">
                      <div className="dlab-media overlay-main position-relative">
                        <img src={item?.document_2[0]?.file_url} alt="" />
                        <div className="overlay-bx">
                          <div className="overlay-icon">
                            <Link
                              to={"#"}
                              className="popup-youtube"
                              // onClick={()=>setOpen(true)}
                            >
                              <i className="fa-solid fa-video"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="h-100">
                        <div className="dlab-info">
                          <div className="dlab-title d-flex justify-content-between">
                            <div>
                              <h4>
                                <Link to={""}>{item.name}</Link>
                              </h4>
                              <div className="">
                                <p className="m-0">
                                  {item.title}
                                  <svg
                                    className="ms-1"
                                    width="4"
                                    height="5"
                                    viewBox="0 0 4 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="2"
                                      cy="2.5"
                                      r="2"
                                      fill="#DBDBDB"
                                    />
                                  </svg>
                                  <span>
                                    5.0
                                    <svg
                                      width="16"
                                      height="15"
                                      viewBox="0 0 16 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 0.5L9.79611 6.02786H15.6085L10.9062 9.44427L12.7023 14.9721L8 11.5557L3.29772 14.9721L5.09383 9.44427L0.391548 6.02786H6.20389L8 0.5Z"
                                        fill="#FEC64F"
                                      />
                                    </svg>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between content align-items-center">
                            <div>
                            <span>
                              {/* <img src={bitcoin} alt="" />{" "} */}
                              110+ Booking
                            </span>
                            </div>
                            <button
                                className="btn btn-primary btn-sm ms-2"
                                onClick={() => navigate(item.id)}
                              >
                                View All
                              </button>
                          </div>
                            <div className="mt-2">
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => handleDelete(item.id,item.name)}
                              >
                                Delete
                              </button>
                             
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            
            :<NoData isLoading={hotelData?.loading} isCard/>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Hotels;
