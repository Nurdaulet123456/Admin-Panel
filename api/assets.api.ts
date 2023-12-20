import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { instance } from "./axios.instance";
import { IKruzhok, IMenu, IClassRoom, ISchoolInfo, IUsers, ISchoolAdmin, ISchoolPassport, ISchoolPhotos, ISchoolSocialMedia, ISchoolSport, ISchoolAltyn, ISchoolAtest, ISchoolOlimp, ISchoolOner, ILessons } from "@/types/assets.type";

export const assetsApi = {
    async getKruzhok(): Promise<IKruzhok[]> {
        return await instance.get('/api/kruzhok/', {
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

    async getClassRoom(): Promise<IClassRoom[]> {
        return await instance.get('/api/classroom/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },

    async getSchool(): Promise<ISchoolInfo[]> {
        return await instance.get('/api/school/', {
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

    async getSchoolSocialMedia(): Promise<ISchoolSocialMedia[]> {
        return await instance.get('/api/School_SocialMediaApi/', {
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

    async getSchoolOner(): Promise<ISchoolOner[]> {
        return await instance.get('/api/Oner_SuccessApi/', {
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

    async getSchoolAltyn(): Promise<ISchoolAltyn[]> {
        return await instance.get('/api/School_AltynBelgiApi/', {
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

    // Lessons

    async getLessons(): Promise<any> {
        return await instance.get('/api/subject/', {
            headers: {
                'Authorization': `Token ${getTokenInLocalStorage()}`
            }
        })
    },
}