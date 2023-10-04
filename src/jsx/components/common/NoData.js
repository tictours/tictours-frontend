import React from "react";

const NoData = ({ colSpan = 8, isCard, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <>
          <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {isCard ? (
            <h3 className="text-center">No Data Found !</h3>
          ) : (
            <tr id="empty-table-data">
              <td colSpan={colSpan} style={{ textAlign: "center" }}>
                No Data Found !
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default NoData;
