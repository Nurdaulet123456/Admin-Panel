import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initaialStatePrideInfo } from "../types/pride.system";
import {
    getLessonsThunk,
    getSchoolAltynThunk,
    getSchoolAtestThunk,
    getSchoolOlimpThunk,
    getSchoolOnerThunk,
    getSchoolSportThunk,
} from "../thunks/pride.thunk";
import {
    ILessons,
    ISchoolAltyn,
    ISchoolAtest,
    ISchoolOlimp,
    ISchoolOner,
    ISchoolSport,
} from "@/types/assets.type";

export const pridelInfoSlice = createSlice({
    name: "pridelInfoSlice",
    initialState: initaialStatePrideInfo,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                getSchoolSportThunk.fulfilled,
                (state, action: PayloadAction<ISchoolSport[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            sport: action.payload,
                        };
                    }
                    return state;
                }
            )
            .addCase(
                getSchoolAltynThunk.fulfilled,
                (state, action: PayloadAction<ISchoolAltyn[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            altyn: action.payload,
                        };
                    }
                    return state;
                }
            )
            .addCase(
                getSchoolOnerThunk.fulfilled,
                (state, action: PayloadAction<ISchoolOner[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            oner: action.payload,
                        };
                    }
                    return state;
                }
            )

            .addCase(
                getSchoolOlimpThunk.fulfilled,
                (state, action: PayloadAction<ISchoolOlimp[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            olimp: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getSchoolAtestThunk.fulfilled,
                (state, action: PayloadAction<ISchoolAtest[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            atest: action.payload,
                        };
                    }
                    return state;
                }
            ).addCase(
                getLessonsThunk.fulfilled,
                (state, action: PayloadAction<any[]>) => {
                    if (action.payload) {
                        return {
                            ...state,
                            lessons: action.payload,
                        };
                    }
                    return state;
                }
            );
    },
});

export const { actions } = pridelInfoSlice;

export default pridelInfoSlice.reducer;
