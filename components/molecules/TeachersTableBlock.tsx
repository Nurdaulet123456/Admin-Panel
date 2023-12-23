import { useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import TypeModal from "../modals/TypeModal";

interface UpdateInputProps {
    name?: string
    pan?: string
    lau?: string

    jobhistory?: IHistoryProps[]

    specification?: ISpecificationProps[]
}

interface IHistoryProps {
    endyear?: number
    startyear?: number
    character?: string
}

interface ISpecificationProps {
    enddate?: number
    speciality_university?: string
    degree?: string
    prof?: string
}

const TeachersTableBlock = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    jobhistory: [],
    specification: [],
  });

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div>
            <div className="login_forms-label_pink">Фото *</div>

            <Input type="file" name="file" />
          </div>

          <div style={{ marginTop: "2.4rem" }}>
            <div className="login_forms-label_pink">Біліктілік санаты</div>
            <Input
              type="text"
              name="eat"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            <div className="main_table-modal-active-block">
              {showActive && (
                <TypeModal
                  setText={setText}
                  setShowActive={setShowActive}
                  timeArr={[
                    {
                      id: 1,
                      type: "Instagram",
                    },

                    {
                      id: 2,
                      type: "Facebook",
                    },

                    {
                      id: 3,
                      type: "Youtube",
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО</div>

            <Input type="text" placeholder="фио" name="name" />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Пән атауы</div>

            <Input type="text" placeholder="пән атауы" name="pan" />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Лауазымы</div>

            <Input type="text" placeholder="лауазымы" name="lau" />
          </div>
        </div>
      </div>

      <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
        Жұмыс тәжірбиесі
      </div>

      <div
        className="forms flex"
        style={{ justifyContent: "flex-start", gap: "3.2rem" }}
      >
        <div className="forms flex">
          <div
            className="login_forms-label_pink mb-0"
            style={{ width: "100%" }}
          >
            Бастаған жылы *
          </div>

          <Input type="text" placeholder="лауазымы" name="startyear" />
        </div>

        <div className="forms flex">
          <div
            className="login_forms-label_pink mb-0"
            style={{ width: "100%" }}
          >
            Аяқтаған жылы *
          </div>

          <Input type="text" placeholder="лауазымы" name="endyear" />
        </div>
      </div>

      <div className="forms" style={{ marginBlock: "3.2rem" }}>
        <div className="login_forms-label_pink">Жұмыс жасаған аймақ *</div>

        <TextArea rows={10} name="goal" />
      </div>

      <button>add</button>

      <div className="forms">
        <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
          Мамандығы
        </div>

        <div className="forms flex-grid-20">
          <div
            className="login_forms-label_pink mb-0"
          >
            Бітірген жылы *
          </div>

          <Input type="text" placeholder="Бітірген жылы" name="enddate" style={{width: '40%'}}/>
        </div>

        <div className="forms flex-grid-20">
          <div
            className="login_forms-label_pink mb-0"
            style={{ width: "100%" }}
          >
            Университет *
          </div>

          <Input type="text" placeholder="Университет" name="speciality_university" style={{width: '40%'}}/>
        </div>

        <div className="forms flex-grid-20">
          <div
            className="login_forms-label_pink mb-0"
            style={{ width: "100%" }}
          >
            Деңгей *
          </div>

          <Input type="text" placeholder="Деңгей" name="degree" style={{width: '40%'}}/>
        </div>

        <div className="forms flex-grid-20">
          <div
            className="login_forms-label_pink mb-0"
            style={{ width: "100%" }}
          >
            Мамандығы *
          </div>

          <Input type="text" placeholder="Мамандығы" name="prof" style={{width: '40%'}}/>
        </div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#CACACA" color="#645C5C" style={{ width: "auto" }}>
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default TeachersTableBlock;
