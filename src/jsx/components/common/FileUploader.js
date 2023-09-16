import React, { useState } from "react";

export function FileUploader(props) {
    const {
        key = '',
        type = 'file',
        label,
        name,
        values,
        setFieldValue,
        inputValue = '',
        className = '',
        labelClassName = '',
        inputClassName = '',
        onChange,
        ...restProps
    } = props;

    const fileData = values[name]

    // This function will be triggered when the file field change
    const onFileChange = (e) => {
        console.log('set', setFieldValue)
        if (e.target.files && e.target.files.length > 0) {
            setFieldValue(name, [e.target.files[0], ...fileData,]);
        }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const handleRemove = (id) => {
        const filterData = fileData.filter((data) => data.name !== id)
        setFieldValue(name, filterData);
    };

    return (
        <div className="form-group" key={key}>
            <div className="my-3">
                {label && <label htmlFor="formFileMultiple" className="form-label">
                    {label}
                </label>}
                <input
                    {...restProps}
                    className="form-control"
                    type={type}
                    // id="formFileMultiple"
                    name={name}
                    onChange={onFileChange}
                />
            </div>
            {!!fileData?.length && <div className="row" style={styles.container}>
                <div className="mb-2">
                    <h3>Preview</h3>
                </div>
                {fileData?.map((img) => (
                    <div className="col-md-6 col-lg-4">
                        <div style={styles.preview}>
                            <img
                                src={URL.createObjectURL(img)}
                                style={styles.image}
                                alt="Thumb"
                            />
                            <button className="bg-danger" onClick={() => handleRemove(img.name)} style={styles.delete}>
                                Delete
                            </button>
                        </div>
                    </div>
                )
                )}
            </div>
            }
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
        margin: '10px 0',
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
