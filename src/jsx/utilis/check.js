export const checkIsFile = (value) => {
    const check =  value instanceof File
    return check
}
export const checkFormValue = (value) => {
// if(typeof value === 'string'){
    if(value){
        return value
        // formData.append(name,value)
    }else{

        return ''
    }
// }
}