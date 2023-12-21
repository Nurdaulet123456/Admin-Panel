import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initaialStateSchoolInfo } from "../types/schoolInfo.system";
import { getClassRoomThunk, getKruzhokInfoThunk, getKruzhokTeachersInfoThunk, getMenuThunk, getSchoolAdminThunk, getSchoolPassportThunk, getSchoolPhotosThunk, getSchoolSocialThunk, getSchoolThunk, getUsersThunk } from "../thunks/schoolnfo.thunk";
import { IClassRoom, IKruzhok, IMenu, ISchoolAdmin, ISchoolInfo, ISchoolPassport, ISchoolPhotos, ISchoolSocialMedia, IUsers } from "@/types/assets.type";

export const schoolInfoSlice = createSlice({
    name: "schoolInfo",
    initialState: initaialStateSchoolInfo,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(
            getKruzhokInfoThunk.fulfilled,
            (state, action: PayloadAction<IKruzhok[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        kruzhok: action.payload
                    }
                }
            }
        ).addCase(
            getMenuThunk.fulfilled,
            (state, action: PayloadAction<IMenu[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        menu: action.payload
                    }
                }
            }
        ).addCase(
            getClassRoomThunk.fulfilled,
            (state, action: PayloadAction<IClassRoom[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        classroom: action.payload
                    }
                }
            }
        ).addCase(
            getSchoolThunk.fulfilled,
            (state, action: PayloadAction<ISchoolInfo[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        school: action.payload
                    }
                }
            }
        ).addCase(
            getUsersThunk.fulfilled,
            (state, action: PayloadAction<IUsers[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        users: action.payload
                    }
                }
            }
        ).addCase(
            getSchoolAdminThunk.fulfilled,
            (state, action: PayloadAction<ISchoolAdmin[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        schooladmin: action.payload
                    }
                }
            }
        ).addCase(
            getSchoolPassportThunk.fulfilled,
            (state, action: PayloadAction<ISchoolPassport[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        schoolpassport: action.payload
                    }
                }
            }
        ).addCase(
            getSchoolPhotosThunk.fulfilled,
            (state, action: PayloadAction<ISchoolPhotos[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        schoolphotos: action.payload
                    }
                }
            }
        ).addCase(
            getSchoolSocialThunk.fulfilled,
            (state, action: PayloadAction<ISchoolSocialMedia[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        schoolsocial: action.payload
                    }
                }
            }
        ).addCase(
            getKruzhokTeachersInfoThunk.fulfilled,
            (state, action: PayloadAction<any[]>) => {
                if (action.payload) {
                    return {
                        ...state,
                        teachers: action.payload
                    }
                }
            }
        )
    }
})


export const { actions } = schoolInfoSlice

export default schoolInfoSlice.reducer