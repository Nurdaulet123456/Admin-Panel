import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSchoolSportThunk = createAsyncThunk(
    'getSchoolSportThunk',
    async () => (await assetsApi.getSchoolSport())
)

export const getSchoolAltynThunk = createAsyncThunk(
    'getSchoolAltynThunk',
    async () => (await assetsApi.getSchoolAltyn())
)

export const getSchoolOlimpThunk = createAsyncThunk(
    'getSchoolOlimpThunk',
    async () => (await assetsApi.getSchoolOlimp())
)

export const getSchoolAtestThunk = createAsyncThunk(
    'getSchoolAtestThunk',
    async () => (await assetsApi.getSchoolAtestat())
)

export const getSchoolOnerThunk = createAsyncThunk(
    'getSchoolOnerThunk',
    async () => (await assetsApi.getSchoolOner())
)

export const getLessonsThunk = createAsyncThunk(
    'getLessonsThunk',
    async () => (await assetsApi.getLessons())
)

export const getExtraThunk = createAsyncThunk(
    'getExtraThunk',
    async () => (await assetsApi.getExtraLessons())
)

export const getDopThunk = createAsyncThunk(
    'getDopThunk',
    async () => (await assetsApi.getCallsDop())
)

export const getOSThunk = createAsyncThunk(
    'getOSThunk',
    async () => (await assetsApi.getCallsOS())
)