import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function EnquiryDetails() {
  const MENU = [
    { name: "profile", path: "", component: "" },
    { name: "quotation", path: "/quotation", component: "" },
    { name: "follow ps", path: "", component: "" },
    { name: "mail to supplier", path: "", component: "" },
    { name: "supplier payments", path: "", component: "" },
    { name: "tickets", path: "", component: "" },
    { name: "payments", path: "", component: "" },
    { name: "documents", path: "", component: "" },
  ];
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const activePath = pathname.replace('/enquiry/','')
  const handleClick = (path) => {
    // console.log("clicked", path);
    navigate(path);
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
            onSelect={handleClick}
            activeKey={activePath}
          >
            {MENU.map((menu) => (
              <Tab
                key={menu.name}
                eventKey={menu.name.split(/[\s]+/).join("-")}
                title={menu.name.toUpperCase()}
              />
            ))}
          </Tabs>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default EnquiryDetails;
