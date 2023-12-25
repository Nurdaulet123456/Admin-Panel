import { IAClass, IAClassRooms, IARing, IASchool, IASubjet, IATypeZ } from "@/types/assets.type";

export interface ISchoolInfo {
    iaclass?: IAClass[]
    iaclassrooms?: IAClassRooms[]
    iaring?: IARing[]
    iaschool?: IASchool[]
    iasubject?: IASubjet[]
    iatypez?: IATypeZ[]
}

export const initaialStateIA: ISchoolInfo = {
    iaclass: [],
    iaclassrooms: [],
    iaring: [],
    iaschool: [],
    iasubject: [],
    iatypez: []
}