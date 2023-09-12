import notify from "../components/common/Notify";

const notifyCreate = (title = '', isEdit = false) => {
    notify({
        message: `${title} ${isEdit ? "Edited" : "Added"} Successfully`,
    });
}
const notifyDelete = (title = '') => {
    notify({
        type: 'warning',
        message: `${title} Deleted Successfully`,
    });
}
const notifyError = (error = '', showStatus) => {
    let Errormsg
    if (showStatus) {
        Errormsg = `Oops! ${error} Error`
    } else {
        Errormsg = error
    }
    notify({
        // if(status){
        type: 'error',
        message: Errormsg,
        // }
    });
}

export { notifyCreate, notifyDelete, notifyError }