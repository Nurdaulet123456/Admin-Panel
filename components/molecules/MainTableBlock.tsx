import { Dispatch, FC, SetStateAction, useState } from "react";

import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getKruzhokInfoThunk } from "@/store/thunks/schoolnfo.thunk";

interface IUpdateInput {
  name?: string;
  teacher?: string;
  goal?: string;
  times: Record<string, string>;
}

interface ITimeSlot {
  week_day: string;
  start_end_time: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
}

const MainTableBlock: FC<IProps> = ({ onReject }) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<IUpdateInput>({
    name: "",
    teacher: "",
    goal: "",
    times: {
      Понедельник: "",
      Вторник: "",
      Среда: "",
      Четверг: "",
      Пятница: "",
      Суббота: "",
    },
  });

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "time") {
      const day = e.target.dataset.day as string;
      setUpdateInput((prevInput) => ({
        ...prevInput,
        times: {
          ...prevInput.times,
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

  const saveTimeSlots = async () => {
    const timeSlots: ITimeSlot[] = [];

    Object.entries(updateInput.times).forEach(([day, time]) => {
      if (time.trim() !== "") {
        timeSlots.push({
          week_day: getWeekDayNumber(day),
          start_end_time: time,
        });
      }
    });

    if (
      timeSlots &&
      updateInput.name &&
      updateInput.teacher &&
      updateInput.goal
    ) {
      await instance
        .post(
          "/api/kruzhok/",
          {
            kruzhok_name: updateInput.name,
            purpose: updateInput.goal,
            lessons: timeSlots,
          },
          {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
            },
          }
        )
        .then((res) => {
          if (res) {
            dispatch(getKruzhokInfoThunk());
          }
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Үйірме</div>

      <div className="main_table-modal_flex">
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Кружок (Үйірме атауы)</div>

            <Input
              type="text"
              placeholder="курс атауы"
              name="name"
              value={updateInput.name}
              onChange={(e) => handleUpdate(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Учитель ФИО</div>

            <Input
              type="text"
              placeholder="мұғалім аты"
              name="teacher"
              value={updateInput.teacher}
              onChange={(e) => handleUpdate(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Цель (Мақсаты)</div>

            <TextArea
              rows={10}
              name="goal"
              value={updateInput.goal}
              onChange={(e) => handleUpdate(e)}
              maxLength={100}
            />

            <div className="length">{updateInput.goal?.length}/100</div>
          </div>

          <div className="forms flex">
            <div>
              {Object.keys(updateInput.times)
                .slice(0, 3)
                .map((day) => (
                  <div key={day} className="flex-grid">
                    <div className="login_forms-label_pink">{day}:</div>
                    <Input
                      type="text"
                      placeholder="Уақыты"
                      name="time"
                      data-day={day}
                      value={updateInput.times[day]}
                      onChange={(e) => handleUpdate(e)}
                    />
                  </div>
                ))}
            </div>

            <div>
              {Object.keys(updateInput.times)
                .slice(3, 6)
                .map((day) => (
                  <div key={day} className="flex-grid">
                    <div className="login_forms-label_pink">{day}:</div>
                    <Input
                      type="text"
                      placeholder="Уақыты"
                      name="time"
                      data-day={day}
                      value={updateInput.times[day]}
                      onChange={(e) => handleUpdate(e)}
                    />
                  </div>
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
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
              onClick={saveTimeSlots}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTableBlock;
