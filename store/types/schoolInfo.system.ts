import { IClassRoom, IKruzhok, IMenu, ISchoolInfo as ISchool, ISchoolAdmin, ISchoolPassport, ISchoolPhotos, ISchoolSocialMedia, IUsers } from "@/types/assets.type";

export interface ISchoolInfo {
    kruzhok?: IKruzhok[],
    teachers?: any[],
    menu?: IMenu[],
    classroom?: IClassRoom[],
    school?: ISchool[],
    users?: IUsers[],
    schooladmin?: ISchoolAdmin[],
    schoolphotos?: ISchoolPhotos[],
    schoolpassport?: ISchoolPassport[],
    schoolsocial?: ISchoolSocialMedia[]
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
    teachers: []
}