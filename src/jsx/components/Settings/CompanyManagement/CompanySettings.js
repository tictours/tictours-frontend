import React,{useState} from 'react';

const inputBlog = [
    { label:'Name', value:'' },
    { label:'Email', value:'' },
    { label:'Mobile', value:'' },
    { label:'Website', value:'' },
    // { label:'Skills', value:'HTML,  JavaScript,  PHP' },
];

const CompanySettings = () => {
   
    return(
        <>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card profile-card card-bx m-b30">
                        <div className="card-header">
                            <h6 className="title">Company Settings</h6>
                        </div>
                        <form className="profile-form">
                            <div className="card-body">
                                <div className="row"> 
                                    { inputBlog.map((item, ind)=>(
                                        <div className="col-sm-6 m-b30" key={ind}>
                                            <label className="form-label">
                                                {`Company ${item.label}`}
                                                <span className="text-danger ms-1">*</span>
                                                </label>
                                            <input type="text" className="form-control" defaultValue={item.value}  />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Save</button>
                                {/* <Link to={"#"} className="btn-link">Forgot your password?</Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CompanySettings;
