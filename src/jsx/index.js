import React, { useContext, useState, useEffect } from "react";

/// React router dom
import {  Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Nav2 from "./layouts/nav/index2";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import Main from './layouts/Main';
import WalletBar from './layouts/WalletBar';
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";
import Banking from "./components/Dashboard/Banking";
import Ticketing from "./components/Dashboard/Ticketing";
import Crypto from "./components/Dashboard/Crypto";
import Contact from "./components/Dashboard/Contact";
import DashInvoice from "./components/Dashboard/DashInvoice";
import Kanban from "./components/Dashboard/Kanban";

/////Demo
import Theme1 from "./components/Dashboard/Demo/Theme1";
import Theme2 from "./components/Dashboard/Demo/Theme2";
import Theme3 from "./components/Dashboard/Demo/Theme3";
import Theme4 from "./components/Dashboard/Demo/Theme4";
import Theme5 from "./components/Dashboard/Demo/Theme5";
import Theme6 from "./components/Dashboard/Demo/Theme6";

//Course
import CourseList from './components/Dashboard/CourseList'
import CourseDetails from './components/Dashboard/CourseDetails'

/// File Manager
import FileManager from './components/FileManager/FileManager';
import FUser from './components/FileManager/User';
import HomeCalendar from './components/FileManager/HomeCalendar';
import Activity from './components/FileManager/Activity';
import ToDoList from './components/FileManager/ToDoList';
import FileChat from './components/FileManager/FileChat';

//CMS
import Content from './components/Cms/Content';
import Menu from './components/Cms/Menu';
import EmailTemplate from './components/Cms/EmailTemplate';
import Blog from './components/Cms/Blog';
//CMS Linking Pages
import ContentAdd from './components/Cms/ContentAdd';
import AddMail from './components/Cms/AddMail';
import AddBlog from './components/Cms/AddBlog';
import BlogCategory from './components/Cms/BlogCategory';

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import EditProfile from "./components/AppsMenu/AppProfile/EditProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";


/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import CkEditor from "./components/Forms/CkEditor/CkEditor";
import Pickers from "./components/Forms/Pickers/Pickers";
import FormValidation from "./components/Forms/FormValidation/FormValidation";

/// Pages

import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

// Enquiry
import Enquiry from "./components/Enquiry";
import EnquiryDetails from "./components/Enquiry/EnquiryDetails";
import Quotation from "./components/Enquiry/Quotation";

// Leads
import Leads from "./components/Leads";

// Settings
import Settings from "./components/Settings";
import Hotels from "./components/Settings/Hotels/index";
import AddHotel from "./components/Settings/Hotels/AddHotel";
import User from "./components/Settings/UserManagement/User";
import UserRole from "./components/Settings/UserManagement/Role";
import { ToastContainer } from "react-toastify";
import SetupModal from "./components/Enquiry/Quotation/SetupModal";
import Payment from "./components/Enquiry/Payment";
import MailToSupplier from "./components/Enquiry/Mail";
import Agent from "./components/Settings/Agent";
import SupplierPayment from "./components/Enquiry/SupplierPayment";
import CompanySettings from "./components/Settings/CompanyManagement/CompanySettings";
import CurrencySettings from "./components/Settings/CompanyManagement/CurrencySettings";
import Fields from "./components/Settings/CompanyManagement/Fields";
const Markup = () => {

  const allRoutes = [
    { url: "banking", component: <Banking/> },
    { url: "ticketing", component: <Ticketing/> },
    { url: "crypto", component: <Crypto/> },
    { url: "contact", component: <Contact/> },
    { url: "invoice", component: <DashInvoice/> },
    { url: "kanban", component: <Kanban/>},
   
    //File Manager
    {url:'users', component: <FUser/> },
    {url:'calendar', component: <HomeCalendar/> }, 
     //Cms
	  { url: 'content', component: <Content/> },
	  { url: 'menu', component: <Menu/> },
	  { url: 'email-template', component: <EmailTemplate/> },
	  { url: 'blog', component: <Blog/> },
	  { url: 'add-content', component: <ContentAdd/> },
	  { url: 'add-email', component: <AddMail/> },
	  { url: 'add-blog', component: <AddBlog/> },
	  { url: 'blog-category', component: <BlogCategory/> },
	
	/// Apps
    { url: "app-profile", component: <AppProfile/> },    
    { url: "app-calender", component: <Calendar/> },
    { url: "post-details", component: <PostDetails/> },

     /// Shop
     { url: "ecom-product-grid", component: <ProductGrid/> },
     { url: "ecom-product-list", component: <ProductList /> },
    
     { url: "ecom-product-order", component: <ProductOrder/> },
     { url: "ecom-checkout", component: <Checkout/> },
     { url: "ecom-product-detail", component: <ProductDetail/> },
     { url: "ecom-customers", component: <Customers/> },

    /// Chart
    { url: "chart-sparkline", component: <SparklineChart/> },
    { url: "chart-chartjs", component: <ChartJs/> },
    { url: "chart-apexchart", component: <ApexChart/> },
    { url: "chart-rechart", component: <RechartJs/> },
   
    { url: "ui-typography", component: <UiTypography/> },
    { url: "ui-grid", component: <UiGrid/> },
	
    /// Plugin
    { url: "uc-select2", component: <Select2/> },
   
    { url: "uc-noui-slider", component: <MainNouiSlider/> },
    { url: "map-jqvmap", component: <JqvMap/> },	
    /// Widget
    { url: "widget", component: <Widget/> },  

    /// Form
    { url: "form-element", component: <Element/> },
    { url: "form-validation", component: <FormValidation/> },

    /// table
	  { url: 'table-filtering', component: <FilteringTable/> },
    { url: 'table-sorting', component: <SortingTable/> },
    { url: "table-bootstrap-basic", component: <BootstrapTable/> },  

    // Leads
    {url:'leads', component: <Leads/>},
    // Settings
    {url:'settings', component: <Settings/>},
    {url:'hotels', component: <Hotels/>},
    {url:'add-hotel',component: <AddHotel/>},
    {url:'user',component: <User/>},
    {url:'user-role',component: <UserRole/>},
    {url:'agent',component: <Agent/>},
    {url:'company-settings',component: <CompanySettings/>},
    {url:'currency-settings',component: <CurrencySettings/>},
    {url:'fields',component: <Fields/>},
  ];
  
 
  
  return (
    <>
      <Routes>                    
          <Route path='*' element={<Layout7 />} />
          <Route path='/page-error-400' element={<Error400 />} />
          <Route path='/page-error-403' element={<Error403 />} />
          <Route path='/page-error-404' element={<Error404 />} />
          <Route path='/page-error-500' element={<Error500 />} />
          <Route path='/page-error-503' element={<Error503 />} />     
          <Route path='/page-lock-screen' element={<LockScreen />} />     
            <Route element={<Layout7 />}>
              <Route path='/' exact element={<Home/>} />
              <Route path='/dashboard' exact element={<Home/>} />
              <Route path='/dashboard-dark' exact element={<DashboardDark/>} />
              <Route path='/header-theme' exact element={<Theme1/>} />
              <Route path='/sidebar-compact' exact element={<Theme3/>} /> 
              <Route path='/horizontal-sidebar' exact element={<Theme4/>} /> 
              <Route path='/horizontal-theme' exact element={<Theme5/>} /> 
              <Route path='/sidebar-mini' exact element={<Theme6/>} />
            </Route>           
              <Route element={<Layout2 />}>							        
                <Route path='/container-boxed' exact element={<Theme2 />} />			
                <Route path='/course-details' exact element={<CourseDetails />} />			                
                <Route path='/course-listing' exact element={<CourseList />} />
              </Route>  
            <Route element={<Layout3 />}>	
                <Route path='/form-ckeditor' exact element={<CkEditor/>} />     
                <Route path='/form-pickers' exact element={<Pickers/>} /> 
                <Route path='/form-wizard' exact element={<Wizard/>} /> 
                <Route path='/map-jqvmap' exact element={<JqvMap/>} />
                <Route path='/uc-lightgallery' exact element={<Lightgallery/>} />
                <Route path='/edit-profile' exact element={<EditProfile/>} />
                <Route path='/ecom-invoice' exact element={<Invoice/>} />
                <Route path='/ecom-product-detail' exact element={<ProductDetail/>} />
                <Route path='/uc-sweetalert' exact element={<MainSweetAlert/>} />
                <Route path='/uc-toastr' exact element={<Toastr/>} /> 
            </Route>                  
              <Route element={<Layout4 />}>	                 
                <Route path='/activity' exact element={<Activity/>} />
                <Route path='/to-do-list' exact element={<ToDoList/>} />                         
                <Route path='/ui-modal' exact element={<UiModal/>} />
                <Route path='/ui-popover' exact element={<UiPopOver/>} />                                           
              </Route>                  
            <Route element={<Layout5 />}>	                       
                <Route path='/file-manager' exact element={<FileManager/>} />
                <Route path='/chat' exact element={<FileChat/>} />
                <Route path='/email-compose' exact element={<Compose/>} />
                <Route path='/email-inbox' exact element={<Inbox/>} />
                <Route path='/email-read' exact element={<Read/>} />  
            </Route> 
              <Route element={<Layout6 />}>	                      
                <Route path='/ui-accordion' exact element={<UiAccordion/>} />                           
                <Route path='/ui-alert' exact element={<UiAlert/>} />                           
                <Route path='/ui-badge' exact element={<UiBadge/>} />                           
                <Route path='/ui-button' exact element={<UiButton/>} />                           
                <Route path='/ui-button-group' exact element={<UiButtonGroup/>} />                           
                <Route path='/ui-list-group' exact element={<UiListGroup/>} />                           
                <Route path='/ui-card' exact element={<UiCards/>} />                           
                <Route path='/ui-carousel' exact element={<UiCarousel/>} />                           
                <Route path='/ui-dropdown' exact element={<UiDropDown/>} />                           
                <Route path='/ui-progressbar' exact element={<UiProgressBar/>} />   
                <Route path='/ui-tab' exact element={<UiTab/>} />   
                <Route path='/ui-pagination' exact element={<UiPagination/>} />                       
              </Route>
              <Route  element={<Layout7 />}>
                <Route exact path="/enquiry"  element={<Enquiry/>} />
                <Route path="/enquiry" element={<EnquiryDetails/>}>
                <Route path='*' element={null} />
                <Route path='profile' element={<EditProfile/>} />                                          
                <Route path='quotation' element={<Quotation/>} />                                          
                <Route path='itinerary' element={<SetupModal/>} />                                          
                <Route path='payments' element={<Payment/>} />                                          
                <Route path='mail-to-supplier' element={<MailToSupplier/>} />                                          
                <Route path='supplier-payments' element={<SupplierPayment/>} />                                          
                </Route>	                 
              </Route>                     
              <Route element={<Layout7 />}>	                
                { allRoutes.map((data, i) => (
                  <Route key={i} exact path={`/${data.url}`} element={data.component} />
                ))}     
              </Route>   
				</Routes>
        <Setting/>
	    <ScrollToTop />
    </>
  );
};

function Layout1(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(
    
      <div id="main-wrapper" className={`wallet-open active show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>                
          <Nav2 />
            <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
              <div className="container-fluid"> 
                <Outlet />
                <Footer /> 
              </div>  
            </div> 
            <WalletBar /> 
          <div className="wallet-bar-close"></div>
      </div>            
    
  )
}

function Layout2(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(    
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>           
        <Nav />
        <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
          <div className="container-fluid">							        
            <Outlet />							        
          </div>                        
        </div>  
        <Footer  changeFooter="out-footer"/>           
    </div>  
    
  )
}

function Layout3(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(    
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>       
        <Nav />
        <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
          <div className="container-fluid">    
            <Outlet />
          </div> 
        </div>
      </div>     
  )
}

function Layout4(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>  	
        <Nav />
        <div className="content-body">
          <div className="container-fluid">                    
            <Outlet />                     
          </div>
        </div> 	  	
      </div> 
  )
}

function Layout5(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>  	      
          <Nav />
          <div className="content-body message-body mh-auto">
            <div className="container-fluid mh-auto p-0">   
              <Outlet />
            </div>
          </div>
    </div>
  )
}
function Layout6(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>  
        <Nav />
        <div className="content-body">
          <div className="container-fluid">       
            <Outlet />
          </div>
        </div>
      </div>
  )
}

function Layout7(){
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return(
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle": ""} ${ menuToggle ? "menu-toggle" : ""}`}>   
        <Nav />
        <ToastContainer/>
        <div className="content-body" style={{ minHeight: '100vh' }}>
          <div className="container-fluid">     
              <Outlet />
          </div>
        </div>
      </div>
  )
}

export default Markup;