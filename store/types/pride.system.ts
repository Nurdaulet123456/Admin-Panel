import { ILessons, ISchoolAltyn, ISchoolAtest, ISchoolOlimp, ISchoolOner, ISchoolSport } from "@/types/assets.type"

export interface IPrideInfo {
    sport?: ISchoolSport[]
    olimp?: ISchoolOlimp[]
    atest?: ISchoolAtest[]
    altyn?: ISchoolAltyn[]
    oner?: ISchoolOner[]
    lessons?: any[]
}

export const initaialStatePrideInfo: IPrideInfo = {
    olimp: [],
    sport: [],
    atest: [],
    altyn: [],
    oner: [],
    lessons: []
}