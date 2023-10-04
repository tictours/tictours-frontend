import React from "react";
import CustomModal from "../../layouts/CustomModal";
import { axiosDelete } from "../../../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { FormAction } from "../../../store/slices/formSlice";
import { notifyDelete, notifyError } from "../../utilis/notifyMessage";

const DeleteModal = (props) => {
  const { showModal, setShowModal, name = "", url = "" } = props;
  const dispatch = useDispatch();

  const onClose = () => {
    setShowModal(false);
  };
  const onDelete = async () => {
    try {
      const response = await axiosDelete(url);
      if (response.success) {
        dispatch(FormAction.setRefresh());
        setShowModal(false);
        notifyDelete(name);
      }
    } catch (error) {
      notifyError("Something went wrong !");
    }
  };
  return (
    <CustomModal showModal={showModal} title={""} handleModalClose={onClose}>
      <div className="row">
        <div className="col-12">
          <h5 className="mb-4">
            Are you sure you want to delete{" "}
            <span className="fw-bold text-danger">{name}</span> ?
          </h5>
          <button className="btn btn-primary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger ms-3" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
