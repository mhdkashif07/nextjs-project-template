import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Images {
    url: string
}
interface InitialState {
    images: Images[]

}

const initialState: InitialState = {
    images: []
};

const productData = createSlice({
    name: "productData",
    initialState,
    reducers: {
        isGalleryImages: (state, { payload }) => {
            state.images = payload
        },
    },
});

export const { isGalleryImages } = productData.actions;
export default productData.reducer