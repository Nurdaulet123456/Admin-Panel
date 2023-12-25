import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  getWeekDayNumber,
  getWeekDayString,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";
import { IMenu } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";

interface IUpdateInput {
  name?: string;
  recipe?: string;
  exits: Record<string, string>;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  getId?: any;
  menuid?: IMenu;
}

const MenuTableBlock: FC<IProps> = ({ onReject, getId, menuid, onEdit }) => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  const dispatch = useAppDispatch();

  const [updateInput, setUpdateInput] = useState<IUpdateInput>({
    name: "",
    recipe: "",
    exits: {
      gr1: "",
      gr2: "",
      gr3: "",
    },
  });

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (menuid) {
      setUpdateInput((prevInput) => ({
        ...prevInput,
        name: menuid.food_name || "",
        recipe: menuid.food_reti || "",
        exits: {
          gr1: menuid.vihod_1 || "",
          gr2: menuid.vihod_2 || "",
          gr3: menuid.vihod_3 || "",
        },
      }));

      setText(getWeekDayString(menuid.week_day as string) || "");
    }
  }, [menuid]);

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "gr") {
      const day = e.target.dataset.day as string;
      setUpdateInput((prevInput) => ({
        ...prevInput,
        exits: {
          ...prevInput.exits,
          [day]: value,
        },
      }));
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  const onSave = async () => {
    try {
      if (
        !updateInput.name ||
        !updateInput.recipe ||
        !updateInput.exits.gr1 ||
        !updateInput.exits.gr2 ||
        !updateInput.exits.gr3
      ) {
        showError();
        return;
      }

      if (!getId) {
        await instance
          .post(
            "/api/menu/",
            {
              food_name: updateInput.name,
              food_sostav: updateInput.recipe,
              vihod_1: updateInput.exits.gr1,
              vihod_2: updateInput.exits.gr2,
              vihod_3: updateInput.exits.gr3,
              week_day: getWeekDayNumber(text),
              food_reti: updateInput.recipe,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch(getMenuThunk());
              showSuccess();
              setText("");
              setUpdateInput({
                name: "",
                recipe: "",
                exits: {
                  gr1: "",
                  gr2: "",
                  gr3: "",
                },
              });
            }
          });
      } else {
        await instance
          .put(
            `/api/menu/${getId}/`,
            {
              food_name: updateInput.name,
              food_sostav: updateInput.recipe,
              vihod_1: updateInput.exits.gr1,
              vihod_2: updateInput.exits.gr2,
              vihod_3: updateInput.exits.gr3,
              week_day: getWeekDayNumber(text),
              food_reti: updateInput.recipe,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch(getMenuThunk());
              showSuccess();
              setText("");
              setUpdateInput({
                name: "",
                recipe: "",
                exits: {
                  gr1: "",
                  gr2: "",
                  gr3: "",
                },
              });
            }
          });
      }
    } catch (error) {
      showError();
    }
  };

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}

      <div className="main_table-modal">
        <div className="main_table-modal_title">Меню</div>

        <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
          <div className="main_table-modal_upload sanaty">
            <div className="login_forms-label_pink">Күні</div>
            <Input
              type="text"
              name="eat"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            <div
              className="sanaty_dropdown"
              style={{ textAlign: "center", width: "100%" }}
            >
              {showActive && (
                <SanatyModalModal
                  setText={setText}
                  setId={setId}
                  setShowActive={setShowActive}
                  timeArr={timeArr}
                />
              )}
            </div>
          </div>

          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">Тамақ атауы</div>

              <Input
                type="text"
                placeholder="тамақ ататуы"
                name="name"
                value={updateInput.name}
                onChange={(e) => handleUpdate(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Құрамы</div>

              <Input
                type="text"
                placeholder="құрамы"
                name="recipe"
                value={updateInput.recipe}
                onChange={(e) => handleUpdate(e)}
              />
            </div>

            <div className="forms flex" style={{ gap: "1.6rem" }}>
              <div
                className="login_forms-label_pink"
                style={{ marginBottom: "0" }}
              >
                Выход:
              </div>
              {Object.keys(updateInput.exits).map((gr) => (
                <Input
                  type="text"
                  placeholder="Гр"
                  name="gr"
                  data-day={gr}
                  value={updateInput.exits[gr]}
                  onChange={(e) => handleUpdate(e)}
                />
              ))}
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
    </>
  );
};

const timeArr = [
  {
    id: 1,
    type: "Понедельник",
  },

  {
    id: 2,
    type: "Вторник",
  },

  {
    id: 3,
    type: "Среда",
  },

  {
    id: 4,
    type: "Четверг",
  },

  {
    id: 5,
    type: "Пятница",
  },

  {
    id: 6,
    type: "Суббота",
  },
];

export default MenuTableBlock;
