import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIASchoolThunk = createAsyncThunk(
    'getIASchoolThunk',
    async () => (await assetsApi.getAvalibaleSchool())
)

export const getIAClassThunk = createAsyncThunk(
    'getIAClassThunk',
    async () => (await assetsApi.getAvalibaleClasses())
)

export const getIAClassRoomThunk = createAsyncThunk(
    'getIAClassRoomThunk',
    async () => (await assetsApi.getAvalibaleClassRooms())
)

export const getIARingThunk = createAsyncThunk(
    'getIARingThunk',
    async () => (await assetsApi.getAvalibaleRing())
)

export const getIASubjectThunk = createAsyncThunk(
    'getIASubjectThunk',
    async () => (await assetsApi.getAvalibaleSubject())
)

export const getIATypeZThunk = createAsyncThunk(
    'getIATypeZThunk',
    async () => (await assetsApi.getAvalibaleTypez())
)