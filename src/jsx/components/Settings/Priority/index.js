import React from "react";
import FieldComponent from "../../common/FieldComponent";
import { useAsync } from "../../../utilis/useAsync";
import { URLS } from "../../../../constants";

const Priority = () => {
  const url = URLS.DESTINATION_URL;
  return (
    <>
      <FieldComponent title="Priority" addTitle="Priority" url={''} />
    </>
  );
};

export default Priority;
