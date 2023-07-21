import React from "react";

const StepThree = () => {
   const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (
    <section>
      <div className="row">
        <div className="col-12">
          <h4>Room Details</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            {data.map((data,key) => (
              <div key={key} className="form-check form-check-inline  fw-normal">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value=""
                  //   defaultChecked
                  />
                  {`Amenity ${key+1}`}
                </label>
                <span className="ms-2 amenity-count">{`12${key}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
