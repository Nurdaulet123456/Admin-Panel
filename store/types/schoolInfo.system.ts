import {
  IClass,
  IClassRoom,
  IKruzhok,
  IMenu,
  ISchoolInfo as ISchool,
  ISchoolAdmin,
  ISchoolPassport,
  ISchoolPhotos,
  ISchoolSocialMedia,
  IUsers,
} from "@/types/assets.type";

export interface ISchoolInfo {
  kruzhok?: IKruzhok[];
  kruzhokid?: IKruzhok;
  teachers?: any[];
  menu?: IMenu[];
  menuid?: IMenu;
  classroom?: IClassRoom[];
  classroomid?: IClassRoom;
  school?: ISchool[];
  schoolid?: ISchool;
  users?: IUsers[];
  schooladmin?: ISchoolAdmin[];
  schooladminid?: ISchoolAdmin;
  schoolphotos?: ISchoolPhotos[];
  schoolphotosid?: ISchoolPhotos;
  schoolpassport?: ISchoolPassport[];
  schoolsocial?: ISchoolSocialMedia[];
  schoolsocialid?: ISchoolSocialMedia;
  class?: IClass[];
  classid?: IClass;
}

export const initaialStateSchoolInfo: ISchoolInfo = {
  kruzhok: [],
  menu: [],
  classroom: [],
  school: [],
  users: [],
  schooladmin: [],
  schoolpassport: [],
  schoolphotos: [],
  schoolsocial: [],
  teachers: [],
  schoolid: {},
  classroomid: {},
  menuid: {},
  schoolsocialid: {},
  kruzhokid: {},
  schooladminid: {},
  class: [],
  classid: {},
};
