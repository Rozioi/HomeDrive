import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: 5
}
const counterSlices = createSlice({
    name: "counter",
    initialState, // начальное значение (initial value)
    reducers: { // actions on the initial value
        changeValue: (state) => {
            console.log(state.value);
            state.value = state.value + 1;
            console.log(state.value);
        }
    }
})

export default counterSlices.reducer;
export const { changeValue } = counterSlices.actions;