import React, { useState } from "react";
import { checkIsFile } from "../../utilis/check";

export function FileUploader(props) {
  const {
    key = "",
    type = "file",
    label,
    name,
    values,
    setFieldValue,
    inputValue = "",
    className = "",
    labelClassName = "",
    inputClassName = "",
    onChange,
    ...restProps
  } = props;

  const fileData = values[name];
  const isMulti = !!restProps.isMulti;

  // This function will be triggered when the file field change
  const onFileChange = (e) => {
    console.log("set", e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      if (isMulti) {
        setFieldValue(name, [e.target.files[0], ...fileData]);
      } else {
        setFieldValue(name, e.target.files[0]);
      }
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const handleRemove = (id) => {
    if (isMulti) {
      const filterData = fileData.filter((data) => data.name !== id);
      setFieldValue(name, filterData);
    } else {
      setFieldValue(name, "");
    }
  };
  const isPreview = !!fileData || !!fileData?.length

  return (
    <div className="form-group" key={key}>
      <div className="my-3">
        {label && (
          <label htmlFor="formFileMultiple" className="form-label">
            {label}
          </label>
        )}
        <input
          {...restProps}
          className="form-control"
          type={type}
          // id="formFileMultiple"
          name={name}
          onChange={onFileChange}
        />
      </div>
      {isPreview && (
          <div className="row" style={styles.container}>
            {console.log("render", fileData)}
            <div className="mb-2">
              <h3>Preview</h3>
            </div>
            <>
              {isMulti ? (
                fileData?.map((img, key) => (
                  <div className="col-md-6 col-lg-4" key={key}>
                    <div style={styles.preview}>
                      <img
                        src={
                          img?.file_url
                            ? img.file_url
                            : URL.createObjectURL(img)
                        }
                        style={styles.image}
                        alt="Thumb"
                      />
                      <button
                        className="bg-danger"
                        onClick={() => handleRemove(img.name)}
                        style={styles.delete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-6 col-lg-4" key={key}>
                  <div style={styles.preview}>
                    <img
                      src={
                        checkIsFile(fileData)
                          ? URL.createObjectURL(fileData)
                          : fileData
                      }
                      style={styles.image}
                      alt="Thumb"
                    />
                    <button
                      className="bg-danger"
                      onClick={() => handleRemove()}
                      style={styles.delete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        )}
    </div>
  );
}

// Just some styles
const styles = {
  container: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 50,
  },
  preview: {
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 100 },
  delete: {
    cursor: "pointer",
    padding: 10,
    // background: "red",
    color: "white",
    border: "none",
    maxWidth: "100%",
  },
};
