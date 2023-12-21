import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKruzhokInfoThunk = createAsyncThunk(
    'getKruzhokInfoThunk',
    async () => (await assetsApi.getKruzhok())
)

export const getKruzhokTeachersInfoThunk = createAsyncThunk(
    'getKruzhokTeachersInfoThunk',
    async () => (await assetsApi.getKruzhokTeacher())
)

export const getMenuThunk = createAsyncThunk(
    'getMenuThunk',
    async () => (await assetsApi.getMenu())
)

export const getClassRoomThunk = createAsyncThunk(
    'getClassRoomThunk',
    async () => (await assetsApi.getClassRoom())
)

export const getSchoolThunk = createAsyncThunk(
    'getSchoolThunk',
    async () => (await assetsApi.getSchool())
)

export const getUsersThunk = createAsyncThunk(
    'getUsersThunk',
    async () => (await assetsApi.getUsers())
)

export const getSchoolAdminThunk = createAsyncThunk(
    'getSchoolAdminThunk',
    async () => (await assetsApi.getSchoolAdministration())
)

export const getSchoolPassportThunk = createAsyncThunk(
    'getSchoolPassportThunk',
    async () => (await assetsApi.getSchoolPassport())
)

export const getSchoolPhotosThunk = createAsyncThunk(
    'getSchoolPhotosThunk',
    async () => (await assetsApi.getSchoolPhotos())
)

export const getSchoolSocialThunk = createAsyncThunk(
    'getSchoolSocialThunk',
    async () => (await assetsApi.getSchoolSocialMedia())
)