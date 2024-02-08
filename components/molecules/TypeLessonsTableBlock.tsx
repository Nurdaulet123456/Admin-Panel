import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getExtraThunk } from "@/store/thunks/pride.thunk";
import { ColorCheckIcons } from "../atoms/Icons";
import { IExtraLessons } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";

const typeColor = [
  "#27AE60",
  "#E2B93B",
  "#F2994A",
  "#CF3535",
  "#E0E0E0",
  "#64748B",
  "#3F6212",
  "#CA8A04",
  "#C84D24",
  "#9F1239",
  "#86198F",
  "#1E293B",
];

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  extraid?: IExtraLessons;
  getId?: number;
}

const TypeLessonsTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  extraid,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<string>("");
  const [chooseColor, setChooseColor] = useState<string>("");

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (extraid && getId) {
      setUpdateInput((extraid?.type_full_name as string) || "");
      setChooseColor((extraid?.type_color as string) || "");
    }
  }, [extraid]);

  const onSave = async () => {
    try {
      if (updateInput && chooseColor) {
        if (!getId) {
          await instance
            .post(
              "https://www.bilimge.kz/admins/api/extra_lesson/",
              {
                type_full_name: updateInput,
                type_color: chooseColor,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getExtraThunk());
                showSuccess();
                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
            })
            .catch((err) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
        } else {
          await instance
            .put(
              `https://www.bilimge.kz/admins/api/extra_lesson/${getId}/`,
              {
                type_full_name: updateInput,
                type_color: chooseColor,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getExtraThunk());
              }
            })
            .catch((err) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
        }
      }
    } catch (error) {}
  };

  return (
    <div className="main_table-modal">
      <div className="login_forms-label_pink">Тип занятий</div>
      <div className="main_table-modal_forms">
        <div className="forms">
          <div className="login_forms-label_pink">Тип занятий</div>

          <Input
            type="text"
            placeholder="Тип занятий"
            name="type"
            value={updateInput}
            onChange={(e) => setUpdateInput(e.target.value)}
          />
        </div>

        <div className="login_forms-label_pink">Цвет</div>

        <div
          className="forms flex"
          style={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "1rem",
            width: "70%",
          }}
        >
          {typeColor.map((item) => (
            <ColorBlock
              color={item}
              key={item}
              onClick={() => setChooseColor(item)}
            >
              {chooseColor === item && <ColorCheckIcons />}
            </ColorBlock>
          ))}
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

export default TypeLessonsTableBlock;
