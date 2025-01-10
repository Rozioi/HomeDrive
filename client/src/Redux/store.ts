import {configureStore} from "@reduxjs/toolkit";
import counter from './slices/counterSlices';

const store = configureStore({
    reducer: {
        counter
    }
});

export default store