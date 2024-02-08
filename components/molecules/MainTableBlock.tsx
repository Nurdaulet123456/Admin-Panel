import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  getWeekDayNumber,
  getWeekRussianDayString,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getKruzhokInfoThunk,
  getKruzhokTeachersInfoThunk,
} from "@/store/thunks/schoolnfo.thunk";
import TypeModal from "../modals/TypeModal";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { BASE_URL } from "@/config/config";
import { IKruzhok } from "@/types/assets.type";

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
  kruzhokid?: IKruzhok;
  getId?: number;
  onEdit?: Dispatch<SetStateAction<boolean>>;
}

const MainTableBlock: FC<IProps> = ({ onReject, kruzhokid, getId, onEdit }) => {
  const dispatch = useAppDispatch();
  const teachers = useTypedSelector((state) => state.system.teachers);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
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

  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    if (kruzhokid) {
      const newTimes = updateInput.times;
      kruzhokid?.lessons?.forEach((lesson) => {
        const russianDay = getWeekRussianDayString(lesson?.week_day as string);
        newTimes[russianDay as string] = lesson?.start_end_time as string;
      });

      setUpdateInput({
        name: kruzhokid.kruzhok_name || "",
        teacher: kruzhokid?.teacher?.full_name || "",
        goal: kruzhokid.purpose || "",
        times: newTimes,
      });

      setText(kruzhokid?.teacher?.full_name || "");
      setId(kruzhokid?.teacher?.id || "");
    }
  }, [kruzhokid]);

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected File:", selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const saveTimeSlots = async () => {
    const timeSlots: ITimeSlot[] = [];

    Object.entries(updateInput.times).forEach(([day, time]) => {
      if (time.trim() !== "") {
        timeSlots.push({
          week_day: String(getWeekDayNumber(day)),
          start_end_time: String(time),
        });
      }
    });

    if (timeSlots.length > 0 && updateInput.name && id && updateInput.goal) {
      if (!getId) {
        await instance
          .post(
            "/api/kruzhok/",
            {
              kruzhok_name: updateInput.name,
              teacher: String(id),
              purpose: updateInput.goal,
              lessons: timeSlots,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then(async (res) => {
            if (res) {
              const formData = new FormData();

              formData.append("photo", file);
              formData.append("id", String((res as any).id));

              console.log("adasdasd");
              try {
                const uploadPhotoResponse = await instance.post(
                  "/api/kruzhok/upload_photo/",
                  formData,
                  {
                    headers: {
                      Authorization: `Token ${getTokenInLocalStorage()}`,
                    },
                  },
                );

                if (uploadPhotoResponse) {
                  dispatch(getKruzhokInfoThunk());
                }
              } catch (err) {
                console.log(err);
              }
            }
          })
          .catch((err) => console.log(err));
      }
      // else {
      //   await instance
      //     .put(`/api/kruzhok/${getId}/`, formData, {
      //       headers: {
      //         Authorization: `Token ${getTokenInLocalStorage()}`,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     })
      //     .then((res) => {
      //       if (res) {
      //         dispatch(getKruzhokInfoThunk());
      //       }
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // }
    }
  };

  useEffect(() => {
    if (teachers) {
      dispatch(getKruzhokTeachersInfoThunk());
    }
  }, [dispatch]);

  const handleGetTime = (id?: number, text?: string) => {
    if (setId && setShowActive) {
      setId(id);
      setShowActive(false);
      setText(text as string);
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Үйірме</div>

      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input
            type="file"
            name="file"
            onChange={(e) => handleFileChange(e)}
          />
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
              name="teacher"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            <div className="main_table-modal-active-block">
              {showActive &&
                teachers &&
                teachers.map((item) => (
                  <div
                    className="main_table-modal-active"
                    key={item.id}
                    onClick={() => handleGetTime(item.id, item.full_name)}
                  >
                    {item.full_name}
                  </div>
                ))}
            </div>
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
                      name={`time`}
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
