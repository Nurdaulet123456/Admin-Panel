import { assetsApi } from "@/api/assets.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKruzhokInfoThunk = createAsyncThunk(
  "getKruzhokInfoThunk",
  async () => await assetsApi.getKruzhok(),
);

export const getKruzhokInfoIdThunk = createAsyncThunk(
  "getKruzhokInfoIdThunk",
  async (id?: number) => await assetsApi.getKruzhokId(id),
);

export const getKruzhokTeachersInfoThunk = createAsyncThunk(
  "getKruzhokTeachersInfoThunk",
  async () => await assetsApi.getKruzhokTeacher(),
);

export const getMenuThunk = createAsyncThunk(
  "getMenuThunk",
  async () => await assetsApi.getMenu(),
);

export const getMenuIdThunk = createAsyncThunk(
  "getMenuIdThunk",
  async (id?: number) => await assetsApi.getMenuId(id),
);

export const getClassRoomThunk = createAsyncThunk(
  "getClassRoomThunk",
  async () => await assetsApi.getClassRoom(),
);

export const getClassRoomIdThunk = createAsyncThunk(
  "getClassRoomIdThunk",
  async (id?: number) => await assetsApi.getClassRoomId(id),
);

export const getSchoolThunk = createAsyncThunk(
  "getSchoolThunk",
  async (id?: number) => await assetsApi.getSchool(id),
);

export const getSchoolIdThunk = createAsyncThunk(
  "getSchoolIdThunk",
  async (id?: number) => await assetsApi.getSchoolById(id),
);

export const getUsersThunk = createAsyncThunk(
  "getUsersThunk",
  async () => await assetsApi.getUsers(),
);

export const getSchoolAdminThunk = createAsyncThunk(
  "getSchoolAdminThunk",
  async () => await assetsApi.getSchoolAdministration(),
);

export const getSchoolAdminIdThunk = createAsyncThunk(
  "getSchoolAdminIdThunk",
  async (id?: number) => await assetsApi.getSchoolAdministrationId(id),
);

export const getSchoolPassportThunk = createAsyncThunk(
  "getSchoolPassportThunk",
  async () => await assetsApi.getSchoolPassport(),
);

export const getSchoolPhotosThunk = createAsyncThunk(
  "getSchoolPhotosThunk",
  async () => await assetsApi.getSchoolPhotos(),
);

export const getSchoolPhotosIdThunk = createAsyncThunk(
  "getSchoolPhotosIdThunk",
  async (id?: number) => await assetsApi.getSchoolPhotosId(id),
);

export const getSchoolSocialThunk = createAsyncThunk(
  "getSchoolSocialThunk",
  async () => await assetsApi.getSchoolSocialMedia(),
);

export const getSchoolSocialIdThunk = createAsyncThunk(
  "getSchoolSocialIdThunk",
  async (id?: number) => await assetsApi.getSchoolSocialMediaId(id),
);

export const getClassThunk = createAsyncThunk(
  "getClassThunk",
  async () => await assetsApi.getSlassInfo(),
);

export const getClassIdThunk = createAsyncThunk(
  "getClassIdThunk",
  async (id?: number) => await assetsApi.getSlassInfoId(id),
);
