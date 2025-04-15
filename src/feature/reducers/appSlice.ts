import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppstate {
    isPanelOpen: boolean;
    isMenuOpen: boolean;
}

const initialState: IAppstate={
    isPanelOpen: false,
    isMenuOpen: false,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setPanelOpen: (state, action: PayloadAction<boolean>) => {
            state.isPanelOpen = action.payload;
        },
        setMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload;
        },
    },
})

export const {setPanelOpen,setMenuOpen} = appSlice.actions;
export default appSlice.reducer;