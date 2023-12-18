import React, { Component } from "react";

import PageTitle from "../../../layouts/PageTitle";
import CkEditorBlog from "./CkEditorBlog";

const PackageTerms = () => {
    return (
      <>
        <PageTitle
          activeMenu="CkEditor"
          motherMenu="Form"
          pageContent="CkEditor"
        />
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Invoice Terms & Condition</h4>
              </div>
              <div className="card-body custom-ekeditor">
                {/* <h2>Using CKEditor 5 build in React</h2> */}
                <CkEditorBlog />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Package Terms & Condition</h4>
              </div>
              <div className="card-body custom-ekeditor">
                {/* <h2>Using CKEditor 5 build in React</h2> */}
                <CkEditorBlog />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Bank Information</h4>
              </div>
              <div className="card-body custom-ekeditor">
                {/* <h2>Using CKEditor 5 build in React</h2> */}
                <CkEditorBlog />
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default PackageTerms;
