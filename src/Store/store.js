import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

export const store = configureStore({
    reducer : {
        home: homeSlice,  // just like this home slice there are different slices for different pages
    }
});