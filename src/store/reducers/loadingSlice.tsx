import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface InitialState {
    loading: boolean;
    fetching: boolean;
    error: string;
    success: string;
    user: {
        name: string;
        email: string;
        displayName: string;
    }
}

const initialState: InitialState = {
    loading: false,
    fetching: false,
    error: "",
    success: " ",
    user: {
        name: "",
        email: "",
        displayName: ""
    }
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        isLoading: (state) => {
            state.loading = true;
            toast.info("Loading...", {
                position: "bottom-left",
              });
        },

        isSuccess: (state, { payload} ) => {
            state.loading = false;
            state.success=payload
            toast.success(`${state.success}`, {
                position: "bottom-left",
              });
        },

        isFetching: (state, { payload } ) => {
            state.loading = false;
            state.error = payload
        },
        isError: (state, { payload }) => {
            state.loading = true;
            state.error = payload
            toast.error(`${state.error}`, {
                position: "bottom-left",
              });
        },
        isUser: (state, { payload }) => {
            state.user = payload;
        },
    },
});

export const { isLoading, isSuccess, isFetching, isError, isUser } = loadingSlice.actions;
export default loadingSlice.reducer