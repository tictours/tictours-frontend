import React, { useState } from 'react'
import CustomModal from '../../../layouts/CustomModal'
import  notify  from '../../common/Notify';
import Img1 from '../../../../images/course/hotel-1.jpg'




function InsertModal({showModal,setShowModal}) {


    const formSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
        notify({message:'Added Successfully'})
      }
    const itineryData = [1,2,3,4,5,6]
  return (
    <>
    <CustomModal
            showModal={showModal}
            title={"Insert itinerary"}
            handleModalClose={() => {
              setShowModal(false)
            }
            }
            modalClass='insert-modal'
          >
            <div className='d-flex flex-column'>
                <div>
                <div className="input-group search-area flex-1">
					<input type="text" 
						className={`form-control ${false ? "active" : ""} border-0`}
						placeholder="Search name or itinerary id ..." 
					/>
					<span className="input-group-text">
						{/* <Link to={"#"}> */}
							<svg width="15" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.5605 15.4395L13.7527 11.6317C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6317 13.7527L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9747 18.1462 16.0252 17.5605 15.4395V15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5V7.5Z" fill="#01A3FF"/>
							</svg>
						{/* </Link> */}
					</span>
				</div>
                </div>
                <div className='d-flex justify-content-center'>
                <div className='mt-5 d-flex flex-wrap'>
                    {itineryData?.map((data,key)=>(
                      <div className='itinery-card me-2 mb-2'>
                        <div>
                        <img src={Img1} className='itinery-img'></img>
                        </div>
                        <div className='d-flex justify-content-between p-3 pt-3 details'>
                            <div>
                                <h6 className='mb-0'>{`Itinery ${key+1}`}</h6>
                                <p className='mb-0'>4 days</p>
                                <p>Price : 20000 rs</p>
                            </div>
                            <div>
                                <button className='btn btn-primary'>
                                <i className="fa-solid fa-plus text-white"></i>
                                </button>
                            </div>
                        </div>
                      </div>  
                    ))}
                </div>
                </div>
            </div>
         </CustomModal>
    </>
  )
}

export default InsertModal