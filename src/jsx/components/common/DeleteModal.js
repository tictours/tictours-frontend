import React from "react";
import CustomModal from "../../layouts/CustomModal";
import { axiosDelete, axiosPatch } from "../../../services/AxiosInstance";
import { useDispatch } from "react-redux";
import { FormAction } from "../../../store/slices/formSlice";
import {  notifyDelete, notifyError, notifySuccess } from "../../utilis/notifyMessage";

const ConfirmationModal = (props) => {
  const { showModal, setShowModal, name = "", url = "",type='delete' } = props;
  const dispatch = useDispatch();
  const typeValue = type === 'status' ?'':'Delete'
  const isDelete = type === 'delete'

  const onClose = () => {
    setShowModal(false);
  };
  const onPress = async () => {
    try {
      let response
      if(type === 'status'){
        response = await axiosPatch(url);
      }else{
         response = await axiosDelete(url);
      }
      if (response.success) {
        dispatch(FormAction.setRefresh());
        setShowModal(false);
        if(isDelete){
          notifyDelete(name);
        }else{
          notifySuccess(`${name} Updated Successfully`)
        }
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
            Are you sure you want to {typeValue}
            <span className={`fw-bold ${isDelete ? 'text-danger':'text-primary'} mx-1`}>{name}</span> ?
          </h5>
          <button className="btn btn-primary" onClick={onClose}>
            Cancel
          </button>
          <button className={`btn ${isDelete ? 'btn-danger':'btn-success'} ms-3`} onClick={onPress}>
            {type === 'status'?'Update':typeValue}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
