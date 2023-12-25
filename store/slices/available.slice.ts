import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAClass, IAClassRooms, IARing, IASchool, IASubjet, IATypeZ } from "@/types/assets.type";
import { getIAClassRoomThunk, getIAClassThunk, getIARingThunk, getIASchoolThunk, getIASubjectThunk, getIATypeZThunk } from "../thunks/available.thunk";
import { initaialStateIA } from "../types/available.system";

export const availabelInfoSlice = createSlice({
    name: "availabelInfoSlice",
    initialState: initaialStateIA,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                getIASchoolThunk.fulfilled,
                (state, action: PayloadAction<IASchool[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iaschool: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getIAClassThunk.fulfilled,
                (state, action: PayloadAction<IAClass[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iaclass: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getIAClassRoomThunk.fulfilled,
                (state, action: PayloadAction<IAClassRooms[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iaclassrooms: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getIARingThunk.fulfilled,
                (state, action: PayloadAction<IARing[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iaring: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getIASubjectThunk.fulfilled,
                (state, action: PayloadAction<IASubjet[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iasubject: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getIATypeZThunk.fulfilled,
                (state, action: PayloadAction<IATypeZ[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            iatypez: action.payload,
                        };
                    }
                    return state;
                }
            )
    },
});

export const { actions } = availabelInfoSlice;

export default availabelInfoSlice.reducer;
