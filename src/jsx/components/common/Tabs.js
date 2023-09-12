import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function TabComponent({ menu, mainPath = "/enquiry/" }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activePath = pathname.replace(mainPath, "");
  console.log("act", activePath);
  const handleClick = (path) => {
    // console.log("clicked", path);
    navigate(path);
  };
  console.log("menu", menu);
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
            {menu.map((menu) => (
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

export default TabComponent;
