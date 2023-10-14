import React from "react";
import FieldComponent from "../../common/FieldComponent";
import { useAsync } from "../../../utilis/useAsync";
import { URLS } from "../../../../constants";

const Requirement = () => {
  const url = URLS.DESTINATION_URL;
  return (
    <>
      <FieldComponent title="Requirement" addTitle="Requirement" url={''} />
    </>
  );
};

export default Requirement;
