import { ICalls, IExtraLessons, ILessons, ISchoolAltyn, ISchoolAtest, ISchoolOlimp, ISchoolOner, ISchoolSport } from "@/types/assets.type"

export interface IPrideInfo {
    sport?: ISchoolSport[]
    olimp?: ISchoolOlimp[]
    atest?: ISchoolAtest[]
    altyn?: ISchoolAltyn[]
    oner?: ISchoolOner[]
    lessons?: any[]
    extra?: IExtraLessons[]
    dop?: ICalls[]
    os?: ICalls[]
}

export const initaialStatePrideInfo: IPrideInfo = {
    olimp: [],
    sport: [],
    atest: [],
    altyn: [],
    oner: [],
    lessons: [],
    extra: [],
    dop: [],
    os: [],
}