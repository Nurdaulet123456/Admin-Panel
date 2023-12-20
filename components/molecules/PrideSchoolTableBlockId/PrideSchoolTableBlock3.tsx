import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolOlimpThunk } from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface UpdateInputProps {
  fullname: string;
  text?: string;
  class?: string;
  file: any;
}

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>;
}

const PrideSchoolTableBlock3: FC<IProps> = ({onReject}) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    fullname: "",
    text: "",
    class: "",
    file: null,
  });

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setUpdateInput({
        ...updateInput,
        file: files?.[0] || null,
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  const onSave = async () => {
    if (
      updateInput.fullname &&
      updateInput.text &&
      updateInput.class &&
      updateInput.file
    ) {
      const formData = new FormData();
      formData.append("fullname", updateInput.fullname);
      formData.append("photo", updateInput.file);
      formData.append("student_success", updateInput.text);
      formData.append("classl", updateInput.class);

      await instance
        .post("/api/PandikOlimpiadaApi/", formData, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res) {
            dispatch(getSchoolOlimpThunk());
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Должность</div>
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input
            type="file"
            name="file"
            onChange={(e) => onChangeUpdateInput(e)}
            accept=".png, .jpg, .jpeg, .svg"
          />
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО *</div>

            <Input
              type="text"
              placeholder="ФИО"
              name="fullname"
              value={updateInput.fullname}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Текст</div>

            <Input
              type="text"
              placeholder="текст"
              name="text"
              value={updateInput.text}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Класс</div>

            <Input
              type="number"
              placeholder="класс"
              name="class"
              value={updateInput.class}
              onChange={(e) => onChangeUpdateInput(e)}
            />
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
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
              onClick={onSave}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrideSchoolTableBlock3;
