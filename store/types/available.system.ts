import {
  IAClass,
  IAClassRooms,
  IARing,
  IASchool,
  IASubjet,
  IATypeZ,
  ISchedule,
  ITeachers,
  IUsers,
} from "@/types/assets.type";

export interface ISchoolInfo {
  iaclass?: IAClass[];
  iaclassrooms?: IAClassRooms[];
  iaring?: IARing[];
  iaschool?: IASchool[];
  iasubject?: IASubjet[];
  iatypez?: IATypeZ[];
  userid?: IUsers;
  teachersid?: ITeachers;
  sch?: ISchedule[];
}

export const initaialStateIA: ISchoolInfo = {
  iaclass: [],
  iaclassrooms: [],
  iaring: [],
  iaschool: [],
  iasubject: [],
  iatypez: [],
  userid: {},
  teachersid: {},
  sch: [],
};
