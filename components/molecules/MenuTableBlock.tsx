import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import TimeModal from "../modals/TimeModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";

interface IUpdateInput {
  name?: string;
  recipe?: string;
  exits: Record<string, string>;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>
}

const MenuTableBlock: FC<IProps> = ({onReject}) => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
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
    if (updateInput.name && updateInput.recipe && updateInput.exits) {
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
            food_reti: updateInput.recipe
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
          }
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Меню</div>

      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Күні</div>
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
              <TimeModal setText={setText} setShowActive={setShowActive} />
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
                placeholder="Уақыты"
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
              onClick={() => onReject && onReject(false)}
            >
              Удалить
            </Button>
            <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTableBlock;
