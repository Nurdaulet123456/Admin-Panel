import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolPhotosThunk } from "@/store/thunks/schoolnfo.thunk";

interface UpdateInputProps {
  name?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
}

const SchoolTableBlock2: FC<IProps> = ({ onReject }) => {
  const dispatch = useAppDispatch();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    name: "",
    file: null,
  });

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setUpdateInput({
        ...updateInput,
        [name]: files?.[0],
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  const onSave = async () => {
    if (updateInput.name && updateInput.file) {
      const formData = new FormData();
      formData.append("slider_name", updateInput.name);
      formData.append("slider_photo", updateInput.file);

      await instance
        .post("/api/slider/", formData, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res) {
            dispatch(getSchoolPhotosThunk());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Фото-суреттер</div>
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Название</div>

            <Input
              type="text"
              placeholder="название"
              name="name"
              value={updateInput.name}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Фото *</div>
            <Input
              type="file"
              name="file"
              onChange={(e) => onChangeUpdateInput(e)}
              accept=".png, .jpg, .jpeg, .svg"
            />
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

export default SchoolTableBlock2;
