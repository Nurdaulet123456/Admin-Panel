import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import TypeModal from "../modals/TypeModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getLessonsThunk } from "@/store/thunks/pride.thunk";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
}

const LessonsTableBlock: FC<IProps> = ({ onReject }) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [updateInput, setUpdateInput] = useState<string>("");

  const onSave = async () => {
    if (updateInput && text) {
      await instance
        .post(
          "/api/subject/",
          {
            full_name: updateInput,
            type: text.toUpperCase(),
          },
          {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            dispatch(getLessonsThunk());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_forms">
          <div className="forms flex" style={{ alignItems: "flex-start" }}>
            <div style={{ width: "70%" }}>
              <div className="login_forms-label_pink">Наименование</div>

              <Input
                type="text"
                placeholder="оқушы"
                name="name"
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
              />
            </div>

            <div>
              <div className="login_forms-label_pink">Сабақ деңгейі</div>
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
                      { id: 1, type: "Easy" },
                      { id: 2, type: "Medium" },
                      { id: 3, type: "Hard" },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button
          background="#CACACA"
          color="#645C5C"
          style={{ width: "auto" }}
          onClick={() => onReject && onReject(false)}
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

export default LessonsTableBlock;
