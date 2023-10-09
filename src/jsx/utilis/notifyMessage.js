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
    const responseError = error.response?.data?.data?.errors
    const firstError = Object.values(responseError)[0][0]
    if (showStatus) {
        Errormsg = `Oops! ${error} Error`
    } 
    if (firstError) {
        Errormsg = firstError
    } 
    else {
        Errormsg = "Oops, Something went wrong !"
    }
    notify({
        // if(status){
        type: 'error',
        message: Errormsg,
        // }
    });
}

export { notifyCreate, notifyDelete, notifyError }