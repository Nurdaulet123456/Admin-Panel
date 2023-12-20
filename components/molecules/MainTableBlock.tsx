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
  file?: any;
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
    file: null,
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
    } else if (name === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = (fileInput.files && fileInput.files[0]) || null;
      setUpdateInput((prevInput) => ({
        ...prevInput,
        file,
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
      const formData = new FormData();
      formData.append("file", updateInput.file); // Добавляем файл в FormData
      formData.append("kruzhok_name", updateInput.name);
      formData.append("teacher", updateInput.teacher);
      formData.append("purpose", updateInput.goal);

      formData.append("lessons", JSON.stringify(timeSlots));

      await instance
        .post("/api/kruzhok/", formData, {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res) {
            dispatch(getKruzhokInfoThunk());
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Үйірме</div>

      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input type="file" name="file" onChange={(e) => handleUpdate(e)} />
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
