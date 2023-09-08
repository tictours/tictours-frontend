import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editId : ''
}

const Form = createSlice({
    name:'form',
    initialState,
    reducers:{
        setEditId(state,action){state.editId = action.payload}
    }
})

export const FormAction = Form.actions;
export default Form.reducer;