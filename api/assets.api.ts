import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { instance } from "./axios.instance";
import { IKruzhok, IMenu, ICalls, IAClass, IAClassRooms, IARing, IASchool, IASubjet, IATypeZ, IClassRoom, IClass, INews, ITeachers, ISchoolInfo, IClassName, IUsers, ISchoolAdmin, ISchoolPassport, ISchoolPhotos, ISchoolSocialMedia, ISchoolSport, ISchoolAltyn, ISchoolAtest, ISchoolOlimp, ISchoolOner, ILessons, IExtraLessons } from "@/types/assets.type";

export const assetsApi = {
    async getKruzhok(): Promise<IKruzhok[]> {
        return await instance.get('/api/kruzhok/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSlassInfoId(id?: number): Promise<IClass> {
        return await instance.get(`/api/class/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSlassInfo(): Promise<IClass[]> {
        return await instance.get(`/api/class/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getKruzhokId(id?: number): Promise<IKruzhok> {
        return await instance.get(`/api/kruzhok/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getKruzhokTeacher(): Promise<any[]> {
        return await instance.get('/api/kruzhok/available_teachers/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getMenu(): Promise<IMenu[]> {
        return await instance.get('/api/menu/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getMenuId(id?: number): Promise<IMenu> {
        return await instance.get(`/api/menu/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getClassRoom(): Promise<IClassRoom[]> {
        return await instance.get('/api/classroom/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getClassRoomId(id?: number): Promise<IClassRoom> {
        return await instance.get(`/api/classroom/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchool(id?: number): Promise<ISchoolInfo[]> {
        return await instance.get(`/api/school/${id ? id : ''}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolById(id?: number): Promise<ISchoolInfo> {
        return await instance.get(`/api/school/${id ? id : ''}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },


    async getUsers(): Promise<IUsers[]> {
        return await instance.get('/auth/users/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAdministration(): Promise<ISchoolAdmin[]> {
        return await instance.get('/api/school_administration/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAdministrationId(id?: number): Promise<ISchoolAdmin> {
        return await instance.get(`/api/school_administration/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolPassport(): Promise<ISchoolPassport[]> {
        return await instance.get('/api/schoolpasport/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolPhotos(): Promise<ISchoolPhotos[]> {
        return await instance.get('/api/slider/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolPhotosId(id?: number): Promise<ISchoolPhotos> {
        return await instance.get(`/api/slider/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolSocialMedia(): Promise<ISchoolSocialMedia[]> {
        return await instance.get('/api/School_SocialMediaApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolSocialMediaId(id?: number): Promise<ISchoolSocialMedia> {
        return await instance.get(`/api/School_SocialMediaApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    // pride school

    async getSchoolSport(): Promise<ISchoolSport[]> {
        return await instance.get('/api/Sport_SuccessApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolSportId(id?: number): Promise<ISchoolSport> {
        return await instance.get(`/api/Sport_SuccessApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolOner(): Promise<ISchoolOner[]> {
        return await instance.get('/api/Oner_SuccessApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolOnerId(id?: number): Promise<ISchoolOner> {
        return await instance.get(`/api/Oner_SuccessApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolOlimp(): Promise<ISchoolOlimp[]> {
        return await instance.get('/api/PandikOlimpiadaApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolOlimpId(id?: number): Promise<ISchoolOlimp> {
        return await instance.get(`/api/PandikOlimpiadaApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAltyn(): Promise<ISchoolAltyn[]> {
        return await instance.get('/api/School_AltynBelgiApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAltynId(id?: number): Promise<ISchoolAltyn> {
        return await instance.get(`/api/School_AltynBelgiApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAtestat(): Promise<ISchoolAtest[]> {
        return await instance.get('/api/School_RedCertificateApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchoolAtestatId(id?: number): Promise<ISchoolAtest> {
        return await instance.get(`/api/School_RedCertificateApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    // Lessons

    async getLessons(): Promise<any> {
        return await instance.get('/api/subject/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getLessonsId(id?: number): Promise<any> {
        return await instance.get(`/api/subject/${id}/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    // Extra Lessons

    async getExtraLessons(): Promise<IExtraLessons[]> {
        return await instance.get('/api/extra_lesson/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getExtraLessonsById(id?: number): Promise<IExtraLessons> {
        return await instance.get(`/api/extra_lesson/${id ? id : ''}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    // Calls

    async getCallsDop(): Promise<ICalls[]> {
        return await instance.get('/api/DopUrokRingApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getCallsDopId(id?: number): Promise<ICalls> {
        return await instance.get(`/api/DopUrokRingApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getCallsOS(): Promise<ICalls[]> {
        return await instance.get('/api/ringApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getCallsOSId(id?: number): Promise<ICalls> {
        return await instance.get(`/api/ringApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getPrideClasses(): Promise<IClassName[]> {
        return await instance.get('/api/prideofschool/available_classes/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getTeachers(): Promise<ITeachers[]> {
        return await instance.get('/api/teacher/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getNews(): Promise<INews[]> {
        return await instance.get('/api/newsApi/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getNewsId(id?: number): Promise<INews> {
        return await instance.get(`/api/newsApi/${id}`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    // Avalibale

    async getAvalibaleSchool(): Promise<IASchool[]> {
        return await instance.get(`/api/available_school/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getAvalibaleClasses(): Promise<IAClass[]> {
        return await instance.get(`/api/available_classes/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getAvalibaleClassRooms(): Promise<IAClassRooms[]> {
        return await instance.get(`/api/available_classrooms/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getAvalibaleRing(): Promise<IARing[]> {
        return await instance.get(`/api/available_ring/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getAvalibaleSubject(): Promise<IASubjet[]> {
        return await instance.get(`/api/available_subject/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getAvalibaleTypez(): Promise<IATypeZ[]> {
        return await instance.get(`/api/available_typez/`, {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },
}