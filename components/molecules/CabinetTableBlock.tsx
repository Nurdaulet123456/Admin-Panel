import { useState, ChangeEvent, Dispatch, SetStateAction, FC } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getClassRoomThunk } from "@/store/thunks/schoolnfo.thunk";

interface IUpdateInputProps {
  name?: string;
  gr?: string;
  floor?: string;
  corpuse?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
}

const CabinetTableBlock: FC<IProps> = ({onReject}) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<IUpdateInputProps>({
    name: "",
    gr: "",
    floor: "",
    corpuse: "",
  });

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    if (
      updateInput.gr &&
      updateInput.floor &&
      updateInput.corpuse &&
      updateInput.name
    ) {
      await instance
        .post(
          "/api/classroom/",
          {
            classroom_name: updateInput.name,
            classroom_number: Number(updateInput.gr),
            flat: Number(updateInput.floor),
            korpus: Number(updateInput.corpuse),
          },
          {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            dispatch(getClassRoomThunk());

            setUpdateInput({
              name: "",
              gr: "",
              floor: "",
              corpuse: "",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Кабинет</div>

      <div className="main_table-modal_forms">
        <div className="forms">
          <div className="login_forms-label_pink">Наименование *</div>

          <Input
            type="text"
            placeholder="наименование"
            name="name"
            value={updateInput.name}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="flex">
          <div className="forms">
            <div className="login_forms-label_pink">Номер (кабинет номері)</div>
            <Input
              type="number"
              placeholder="кабинет номері: пример 305"
              name="gr"
              value={updateInput.gr}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Этаж</div>
            <Input
              type="number"
              placeholder="этаж:2"
              name="floor"
              value={updateInput.floor}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Корпус</div>
            <Input
              type="number"
              placeholder="корпус:2"
              name="corpuse"
              value={updateInput.corpuse}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>
        </div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#CACACA" color="#645C5C" style={{ width: "auto" }} onClick={() => onReject && onReject(false)}>
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default CabinetTableBlock;
