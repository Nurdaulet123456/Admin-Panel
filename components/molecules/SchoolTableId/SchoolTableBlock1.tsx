import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolAdminThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface UpdateInputProps {
  name?: string;
  prof?: string;
  tel?: string;
  file: any;
}

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>
}

const SchoolTableBlock1: FC<IProps> = ({onReject}) => {
  const dispatch = useAppDispatch();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    name: "",
    prof: "",
    tel: "",
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
      updateInput.name &&
      updateInput.tel &&
      updateInput.prof &&
      updateInput.file
    ) {
      const formData = new FormData();
      formData.append("administrator_name", updateInput.name);
      formData.append("phone_number", updateInput.tel);
      formData.append("position", updateInput.prof);
      formData.append("administator_photo", updateInput.file);

      await instance
        .post("/api/school_administration/", formData, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res) {
            dispatch(getSchoolAdminThunk());

            setUpdateInput({
              name: "",
              tel: "",
              prof: "",
              file: null,
            });
          }
        })
        .catch((e) => {
          console.log(e.message);
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
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО *</div>

            <Input
              type="text"
              placeholder="фио"
              name="name"
              value={updateInput.name}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Должность *</div>

            <Input
              type="text"
              placeholder="Должность"
              name="prof"
              value={updateInput.prof}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Номер телефона *</div>

            <Input
              type="text"
              placeholder="+7 777 777 77 77"
              name="tel"
              value={updateInput.tel}
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

export default SchoolTableBlock1;
