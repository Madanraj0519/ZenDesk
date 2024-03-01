import {createSlice} from "@reduxjs/toolkit"

const  initialState = {
    currentEmployee : null,
    loading : false,
    error : false
}

const employeeSlice = createSlice({
    name : 'employee',
    initialState,
    reducers : {
        signInEmployeeStart : (state) => {
            state.loading = true;
        },
        signInEmployeeSuccess : (state, action) => {
            state.currentEmployee = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInEmployeeFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateEmployeeStart : (state) => {
            state.loading = true;
        },
        updateEmployeeSuccess : (state, action) => {
            state.currentEmployee = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateEmployeeFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteEmployeeStart : (state) => {
            state.loading = true;
        },
        deleteEmployeeSuccess : (state) => {
            state.currentEmployee = null;
            state.loading = false;
            state.error = false;
        },
        deleteEmployeeFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        employeeSignOut : (state) => {
            state.currentEmployee = null;
            state.loading = false;
            state.error = false;
        }
    }
});


export const {
    signInEmployeeStart, signInEmployeeSuccess, signInEmployeeFailure,
    updateEmployeeStart, updateEmployeeSuccess, updateEmployeeFailure,
    deleteEmployeeStart, deleteEmployeeSuccess, deleteEmployeeFailure,
    employeeSignOut,
    } = employeeSlice.actions;

export default employeeSlice.reducer;