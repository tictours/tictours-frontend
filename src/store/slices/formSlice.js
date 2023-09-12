import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editId: "",
  refresh: false,
};

const Form = createSlice({
  name: "form",
  initialState,
  reducers: {
    setEditId(state, action) {
      state.editId = action.payload;
    },
    setRefresh(state, action) {
      state.refresh = !state.refresh;
    },
  },
});

export const FormAction = Form.actions;
export default Form.reducer;
