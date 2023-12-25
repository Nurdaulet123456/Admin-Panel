import { ChangeEvent, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import SanatyModalModal from "../modals/SanatyModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";

interface UpdateInputProps {
  name?: string;
  pan?: string;
  lau?: string;

  jobhistory?: IHistoryProps[];

  specification?: ISpecificationProps[];
}

interface IHistoryProps {
  start_date?: number;
  end_date?: number;
  job_characteristic?: string;
}

interface ISpecificationProps {
  end_date?: number;
  speciality_university?: string;
  mamandygy?: string;
  degree?: string;
}

const TeachersTableBlock = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});
  const dispatch = useAppDispatch();

  const [workExperience, setWorkExperience] = useState<IHistoryProps[]>([
    {
      start_date: 0,
      end_date: 0,
      job_characteristic: "",
    },
  ]);

  const [mamandygyList, setMamandygyList] = useState<ISpecificationProps[]>([
    {
      end_date: 0,
      speciality_university: "",
      mamandygy: "",
      degree: "",
    },
  ]);

  const [file, setFile] = useState<File | null>(null);

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        start_date: 0,
        end_date: 0,
        job_characteristic: "",
      },
    ]);
  };

  const handleWorkExperienceChange = (
    index: number,
    fieldName: string,
    value: any
  ) => {
    setWorkExperience((prevExperience) =>
      prevExperience.map((experience, i) =>
        i === index ? { ...experience, [fieldName]: value } : experience
      )
    );
  };

  const handleAddMamandygy = () => {
    setMamandygyList((prevList) => [
      ...prevList,
      {
        end_date: 0,
        speciality_university: "",
        mamandygy: "",
        degree: "",
      },
    ]);
  };

  const handleMamandygyChange = (
    index: number,
    fieldName: string,
    value: any
  ) => {
    setMamandygyList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item
      )
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSave = async () => {
    if (!updateInput.name || !updateInput.pan || !text || !file) {
      return;
    }

    const formData = new FormData();
    formData.append("photo3x4", file as Blob);
    formData.append("full_name", updateInput.name || "");
    formData.append("subject", updateInput.pan || "");
    formData.append("pedagog", "Pedagog  Zertteushy");
    workExperience.forEach((experience, index) => {
      Object.entries(experience).forEach(([key, value]) => {
        formData.append(`job_history[${index}][${key}]`, value);
      });
    });

    // Append each item in mamandygyList array
    mamandygyList.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        formData.append(`speciality_history[${index}][${key}]`, value);
      });
    });

    await instance
      .post("/api/teacher/", formData, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res) {
          dispatch(getTeachersThunk());
        }
      })
      .catch((err) => console.log(err));
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

            <div className="sanaty_dropdown">
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
                    e.target.value
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
                  handleWorkExperienceChange(index, "end_date", e.target.value)
                }
              />
            </div>
          </div>

          <div className="forms" style={{ marginBlock: "3.2rem" }}>
            <div className="login_forms-label_pink">Жұмыс жасаған аймақ *</div>
            <TextArea
              rows={10}
              name="job_characteristic"
              value={experience.job_characteristic}
              onChange={(e) =>
                handleWorkExperienceChange(
                  index,
                  "job_characteristic",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      ))}

      <button onClick={handleAddWorkExperience}>add</button>

      <div className="forms">
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
                    e.target.value
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

        <button onClick={handleAddMamandygy}>add Mamandygy</button>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#CACACA" color="#645C5C" style={{ width: "auto" }}>
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
    type: "Педагог-шебер",
  },

  {
    id: 2,
    type: "Педагог-зерттеуші",
  },

  {
    id: 3,
    type: "Педагог-сарапшы",
  },

  {
    id: 4,
    type: "Педагог-модератор",
  },

  {
    id: 5,
    type: "Педагог-тағылымдамашы",
  },

  {
    id: 6,
    type: "Жоғары",
  },

  {
    id: 7,
    type: "I санатты",
  },

  {
    id: 8,
    type: "I санатты",
  },

  {
    id: 9,
    type: "II санатты",
  },

  {
    id: 10,
    type: "III санатты",
  },
];

export default TeachersTableBlock;
