import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import SanatyModalModal from "../modals/SanatyModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";
import { ITeachers } from "@/types/assets.type";
import { AddIcons } from "../atoms/Icons";
import styled from "@emotion/styled";

interface UpdateInputProps {
  name?: string;
  pan?: string;
  lau?: string;

  jobhistory?: IHistoryProps[];

  specification?: ISpecificationProps[];
}

interface IHistoryProps {
  start_date?: string;
  end_date?: string;
  job_characteristic?: string;
}

interface ISpecificationProps {
  end_date?: string;
  speciality_university?: string;
  mamandygy?: string;
  degree?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  getId?: number;
  teachersid?: ITeachers;
}

const TeachersTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  getId,
  teachersid,
}) => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});
  const dispatch = useAppDispatch();

  const [workExperience, setWorkExperience] = useState<IHistoryProps[]>([
    {
      start_date: "",
      end_date: "",
      job_characteristic: "",
    },
  ]);

  const [mamandygyList, setMamandygyList] = useState<ISpecificationProps[]>([
    {
      end_date: "",
      speciality_university: "",
      mamandygy: "",
      degree: "",
    },
  ]);

  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    if (teachersid) {
      setUpdateInput({
        name: teachersid.full_name || "",
        pan: teachersid.subject || "",
      });

      if (teachersid.job_history && teachersid.job_history.length > 0) {
        setWorkExperience(teachersid.job_history as IHistoryProps[]);
      }

      if (
        teachersid.speciality_history &&
        teachersid.speciality_history.length > 0
      ) {
        setMamandygyList(
          teachersid.speciality_history as ISpecificationProps[],
        );
      }

      setText(teachersid.pedagog as string);
    }
  }, [teachersid]);

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const handleAddWorkExperience = () => {
    setWorkExperience((prevExperience) => [
      ...prevExperience,
      {
        start_date: "",
        end_date: "",
        job_characteristic: "",
      },
    ]);
  };

  const handleWorkExperienceChange = (
    index: number,
    fieldName: string,
    value: any,
  ) => {
    setWorkExperience((prevExperience) =>
      prevExperience.map((experience, i) =>
        i === index ? { ...experience, [fieldName]: value } : experience,
      ),
    );
  };

  const handleAddMamandygy = () => {
    setMamandygyList((prevList) => [
      ...prevList,
      {
        end_date: "",
        speciality_university: "",
        mamandygy: "",
        degree: "",
      },
    ]);
  };

  const handleMamandygyChange = (
    index: number,
    fieldName: string,
    value: any,
  ) => {
    setMamandygyList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item,
      ),
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected File:", selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSave = async () => {
    if (!updateInput.name || !updateInput.pan || !text) {
      return;
    }

    if (updateInput.name && updateInput.pan && text) {
      if (!getId) {
        await instance
          .post(
            "/api/teacher/",
            {
              full_name: updateInput.name,
              subject: updateInput.pan,
              pedagog: text,
              job_history: workExperience,
              speciality_history: mamandygyList,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then(async (res) => {
            if (res) {
              const formData = new FormData();

              formData.append("photo3x4", file);
              formData.append("id", String((res as any).id));

              console.log("adasdasd");
              try {
                const uploadPhotoResponse = await instance.post(
                  "/api/teacher/upload_photo/",
                  formData,
                  {
                    headers: {
                      Authorization: `Token ${getTokenInLocalStorage()}`,
                    },
                  },
                );

                if (uploadPhotoResponse) {
                  dispatch(getTeachersThunk());
                }
              } catch (err) {
                console.log(err);
              }
            }
          })
          .catch((err) => console.log(err));
      } else {
        await instance
          .put(
            `/api/teacher/${getId}/`,
            {
              full_name: updateInput.name,
              subject: updateInput.pan,
              pedagog: text,
              job_history: workExperience,
              speciality_history: mamandygyList,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res) {
              dispatch(getTeachersThunk());
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div>
            <div className="login_forms-label_pink">Фото *</div>

            <Input type="file" name="file" onChange={handleFileChange} />
          </div>

          <div style={{ marginTop: "2.4rem" }} className="sanaty">
            <div className="login_forms-label_pink">Біліктілік санаты</div>
            <Input
              type="text"
              name="eat"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            <div className="sanaty_dropdown" style={{ width: "100%" }}>
              {showActive && (
                <SanatyModalModal
                  setText={setText}
                  setShowActive={setShowActive}
                  timeArr={sanatyArr}
                  setId={setId}
                />
              )}
            </div>
          </div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО</div>

            <Input
              type="text"
              placeholder="фио"
              name="name"
              value={updateInput.name}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Пән атауы</div>

            <Input
              type="text"
              placeholder="пән атауы"
              name="pan"
              value={updateInput.pan}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Лауазымы</div>

            <Input
              type="text"
              placeholder="лауазымы"
              name="lau"
              value={updateInput.lau}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>
        </div>
      </div>

      <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
        Жұмыс тәжірбиесі
      </div>

      <div style={{ position: "relative" }}>
        {workExperience.map((experience, index) => (
          <div key={index}>
            <div className="forms flex">
              <div className="forms flex">
                <div
                  className="login_forms-label_pink mb-0"
                  style={{ width: "100%" }}
                >
                  Бастаған жылы *
                </div>
                <Input
                  type="text"
                  placeholder="лауазымы"
                  name="start_date"
                  value={experience.start_date}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "start_date",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="forms flex">
                <div
                  className="login_forms-label_pink mb-0"
                  style={{ width: "100%" }}
                >
                  Аяқтаған жылы *
                </div>
                <Input
                  type="text"
                  placeholder="лауазымы"
                  name="end_date"
                  value={experience.end_date}
                  onChange={(e) =>
                    handleWorkExperienceChange(
                      index,
                      "end_date",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            <div className="forms" style={{ marginBlock: "3.2rem" }}>
              <div className="login_forms-label_pink">
                Жұмыс жасаған аймақ *
              </div>
              <TextArea
                rows={10}
                name="job_characteristic"
                value={experience.job_characteristic}
                onChange={(e) =>
                  handleWorkExperienceChange(
                    index,
                    "job_characteristic",
                    e.target.value,
                  )
                }
              />
            </div>
          </div>
        ))}

        <AddButtton
          onClick={handleAddWorkExperience}
          style={{ position: "absolute", bottom: "0", right: "-42px" }}
        >
          <AddIcons />
        </AddButtton>
      </div>

      <div className="forms" style={{ position: "relative" }}>
        <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
          Мамандығы
        </div>
        {mamandygyList.map((item, index) => (
          <div key={index}>
            <div className="forms flex-grid-20">
              <div className="login_forms-label_pink mb-0">Бітірген жылы *</div>
              <Input
                type="text"
                placeholder="Бітірген жылы"
                name={`end_date_${index}`}
                style={{ width: "40%" }}
                value={item.end_date}
                onChange={(e) =>
                  handleMamandygyChange(index, "end_date", e.target.value)
                }
              />
            </div>

            <div className="forms flex-grid-20">
              <div className="login_forms-label_pink mb-0">Университет *</div>
              <Input
                type="text"
                placeholder="Университет"
                name={`speciality_university_${index}`}
                style={{ width: "40%" }}
                value={item.speciality_university}
                onChange={(e) =>
                  handleMamandygyChange(
                    index,
                    "speciality_university",
                    e.target.value,
                  )
                }
              />
            </div>

            <div className="forms flex-grid-20">
              <div
                className="login_forms-label_pink mb-0"
                style={{ width: "100%" }}
              >
                Деңгей *
              </div>
              <Input
                type="text"
                placeholder="Деңгей"
                name={`degree_${index}`}
                style={{ width: "40%" }}
                value={item.degree}
                onChange={(e) =>
                  handleMamandygyChange(index, "degree", e.target.value)
                }
              />
            </div>

            <div className="forms flex-grid-20">
              <div
                className="login_forms-label_pink mb-0"
                style={{ width: "100%" }}
              >
                Мамандығы *
              </div>
              <Input
                type="text"
                placeholder="Мамандығы"
                name={`mamandygy_${index}`}
                style={{ width: "40%" }}
                value={item.mamandygy}
                onChange={(e) =>
                  handleMamandygyChange(index, "mamandygy", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <AddButtton
          onClick={handleAddMamandygy}
          style={{ position: "absolute", bottom: "0", right: "45%" }}
        >
          <AddIcons />
        </AddButtton>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button
          background="#CACACA"
          color="#645C5C"
          style={{ width: "auto" }}
          onClick={() =>
            getId ? onEdit && onEdit(false) : onReject && onReject(false)
          }
        >
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

const sanatyArr = [
  {
    id: 1,
    type: "Pedagog Sheber",
  },

  {
    id: 2,
    type: "Pedagog Zertteushy",
  },

  {
    id: 3,
    type: "Pedagog Sarapshy",
  },

  {
    id: 4,
    type: "Pedagog Moderator",
  },

  {
    id: 5,
    type: "Pedagog Zhogary",
  },

  {
    id: 6,
    type: "Pedagog Stazher",
  },

  {
    id: 7,
    type: "Pedagog 1 sanat",
  },

  {
    id: 8,
    type: "Pedagog 2 sanat",
  },
];

const AddButtton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
`;

export default TeachersTableBlock;
