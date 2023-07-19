import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import ModalVideo from 'react-modal-video'

import bitcoin from './../../../images/svg/bitcoin.svg';
import school from './../../../images/svg/school.svg';
import wallet from './../../../images/svg/cryptowallet.svg';
import crypto from './../../../images/svg/cryptocurrency.svg';
import transfer from './../../../images/svg/wire-transfer.svg';
const smallCard = [
    { image: school, title:'Destinations' },
    { image: wallet, title:'Suppliers' },
    { image: crypto, title:'Hotels' },
    { image: transfer, title:'Room Type' },
    { image: school, title:'Meal Plan' },
    { image: wallet, title:'Activity' },
    { image: transfer, title:'Transfer' },
    { image: crypto, title:'Day Itinarary' },
    { image: school, title:'Lead Source' },
    { image: wallet, title:'Mail Settings' },
    { image: crypto, title:'Currency' },
    { image: transfer, title:'Other' },
];


function Settings() {
    const [isOpen, setOpen] = useState();  
    const navigate = useNavigate() 
    
    const onClick = (item) => {
        console.log('item',item)
        if(item == 'Hotels'){
            navigate('/hotels')
        }
    }
  return (
    <>
        {/* <div className="widget-heading d-flex justify-content-between align-items-center">
            <h3 className="m-0 heading">Popular This Week</h3>
            <Link to={"#"} className="btn btn-primary btn-sm">View all</Link>
        </div>
        <div className="row">            
           <CourseSlider />
        </div>	 */}
        <div className="widget-heading d-flex justify-content-between align-items-center">
            <h3 className="heading mb-4">Admin Settings</h3>
            <Link to={"#"} className="btn btn-primary btn-sm">View all</Link>
        </div>
        <div className="row">
            {smallCard.map((item, index)=>(
                <div className="col-xl-3 col-xxl-3 col-md-4 col-sm-6  mb-4" key={index}>
                    <div class="card h-100  cursor-pointer" onClick={()=>onClick(item.title)}>
                        <div class="card-body">
                            <div class="widget-courses align-items-center d-flex justify-content-between flex-wrap">
                                <div class="d-flex align-items-center flex-wrap">
                                    {/* <img src={item.image} alt="" /> */}
                                    <div class="flex-1 ms-3">
                                        <h4>{item.title}</h4>
                                        {/* <span>Lorem ipsum dolor</span> */}
                                    </div>	
                                </div>	
                                <Link to={"#"}><i class="las la-angle-right text-primary"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>	
            ))}
        </div>	
        {/* <div className="table-pagenation mb-3">
            <p className="ms-0">Showing <span>1-8</span>from <span>20</span>data</p>
            <nav>
                <ul className="pagination pagination-gutter pagination-primary no-bg">
                    <li className="page-item page-indicator">
                        <Link to={"#"} className="page-link">
                            <i className="fa-solid fa-angle-left"></i>
                        </Link>
                    </li>
                    <li className="page-item active"><Link to={"#"} className="page-link">1</Link>
                    </li>
                    <li className="page-item "><Link className="page-link" >2</Link></li>
                    <li className="page-item"><Link className="page-link" >3</Link></li>
                    <li className="page-item page-indicator me-0">
                        <Link to={"#"} className="page-link">
                            <i className="fa-solid fa-angle-right"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div> */}
        <ModalVideo channel='youtube' autoplay 
            isOpen={isOpen} videoId="e6MhFghdQps"
            onClose={() => setOpen(false)} 
        />
    </>
  )
}

export default Settings