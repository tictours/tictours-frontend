import React from "react";
import InputField from "../../../common/InputField";
import { useAsync } from "../../../../utilis/useAsync";
import { URLS } from "../../../../../constants";
import SelectField from "../../../common/SelectField";

const StepOne = ({ formik }) => {

  const destinationId = formik.values.destination
  const subDestinationUrl = `${URLS.SUB_DESTINATION_URL}?destination_id=${destinationId}`

  const destinationData = useAsync(URLS.DESTINATION_URL)
  const subDestinationData = useAsync(subDestinationUrl, destinationId)
  const categoryData = useAsync(URLS.PROPERTY_CATEGORY_URL)
  const propertyTypeData = useAsync(URLS.PROPERTY_TYPE_URL)
  // console.log('formik child', formik.values)
  // console.log(subDestinationUrl, 'data', subDestinationData,)
  return (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Hotel Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <SelectField
            label={'Destination'}
            name={'destination'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values}
            options={destinationData?.data?.data}
            optionValue="id"
            optionLabel="name"
          />
        </div>
        <div className="col-lg-6 mb-2">
          <SelectField
            label={'Sub Destination'}
            name={'subDestination'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values}
            options={subDestinationData?.data?.data}
            optionValue="id"
            optionLabel="name"
          />
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Place"
              name="place"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <SelectField
            label={'Category'}
            name={'category'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values}
            options={categoryData?.data?.data}
            optionValue="id"
            optionLabel="name"
            required
          />
        </div>
        <div className="col-lg-6 mb-2">
          <SelectField
            label={'Property Type'}
            name={'propertyType'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values}
            options={propertyTypeData?.data?.data}
            optionValue="id"
            optionLabel="name"
          />
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Sales Email"
              name="salesEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Sales Number"
              name="salesNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Reservation Email"
              name="reservationEmail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Reservation Number"
              name="reservationNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <InputField
              label="Phone Number"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              values={formik.values}
              required
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <InputField
            isTextarea
            label="Address"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values}
            required
          />
        </div>
      </div>
    </section>
  );
};

export default StepOne;
