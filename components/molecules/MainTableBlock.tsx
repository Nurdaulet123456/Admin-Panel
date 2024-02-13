import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Button } from "../atoms/UI/Buttons/Button";
import {Input, Select, TextArea} from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  getWeekDayNumber,
  getWeekRussianDayString,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getKruzhokInfoThunk,
  getKruzhokTeachersInfoThunk, getMenuThunk,
} from "@/store/thunks/schoolnfo.thunk";
import TypeModal from "../modals/TypeModal";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { BASE_URL } from "@/config/config";
import { IKruzhok } from "@/types/assets.type";
import {useFormik} from "formik";
import * as Yup from "yup";

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
  // const [updateInput, setUpdateInput] = useState<IUpdateInput>({
  //   name: "",
  //   teacher: "",
  //   goal: "",
  //   times: {
  //     Понедельник: "",
  //     Вторник: "",
  //     Среда: "",
  //     Четверг: "",
  //     Пятница: "",
  //     Суббота: "",
  //   },
  // });
  //
  // const [file, setFile] = useState<any>(null);
  //
  // useEffect(() => {
  //   if (kruzhokid) {
  //     const newTimes = updateInput.times;
  //     kruzhokid?.lessons?.forEach((lesson) => {
  //       const russianDay = getWeekRussianDayString(lesson?.week_day as string);
  //       newTimes[russianDay as string] = lesson?.start_end_time as string;
  //     });
  //
  //     setUpdateInput({
  //       name: kruzhokid.kruzhok_name || "",
  //       teacher: kruzhokid?.teacher?.full_name || "",
  //       goal: kruzhokid.purpose || "",
  //       times: newTimes,
  //     });
  //
  //     setText(kruzhokid?.teacher?.full_name || "");
  //     setId(kruzhokid?.teacher?.id || "");
  //   }
  // }, [kruzhokid]);
  //
  // const handleUpdate = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;
  //   if (name === "time") {
  //     const day = e.target.dataset.day as string;
  //     setUpdateInput((prevInput) => ({
  //       ...prevInput,
  //       times: {
  //         ...prevInput.times,
  //         [day]: value,
  //       },
  //     }));
  //   } else {
  //     setUpdateInput({
  //       ...updateInput,
  //       [name]: value,
  //     });
  //   }
  // };
  //
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   console.log("Selected File:", selectedFile);
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  // };
  //
  // const saveTimeSlots = async () => {
  //   const timeSlots: ITimeSlot[] = [];
  //
  //   Object.entries(updateInput.times).forEach(([day, time]) => {
  //     if (time.trim() !== "") {
  //       timeSlots.push({
  //         week_day: String(getWeekDayNumber(day)),
  //         start_end_time: String(time),
  //       });
  //     }
  //   });
  //
  //   if (timeSlots.length > 0 && updateInput.name && id && updateInput.goal) {
  //     if (!getId) {
  //       await instance
  //         .post(
  //           "/api/kruzhok/",
  //           {
  //             kruzhok_name: updateInput.name,
  //             teacher: String(id),
  //             purpose: updateInput.goal,
  //             lessons: timeSlots,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Token ${getTokenInLocalStorage()}`,
  //             },
  //           },
  //         )
  //         .then(async (res) => {
  //           if (res) {
  //             const formData = new FormData();
  //
  //             formData.append("photo", file);
  //             formData.append("id", String((res as any).id));
  //
  //             try {
  //               const uploadPhotoResponse = await instance.post(
  //                 "/api/kruzhok/upload_photo/",
  //                 formData,
  //                 {
  //                   headers: {
  //                     Authorization: `Token ${getTokenInLocalStorage()}`,
  //                   },
  //                 },
  //               );
  //
  //               if (uploadPhotoResponse) {
  //                 dispatch(getKruzhokInfoThunk());
  //               }
  //             } catch (err) {
  //               console.log(err);
  //             }
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //     else {
  //       await instance
  //         .put(`/api/kruzhok/${getId}/`, formData, {
  //           headers: {
  //             Authorization: `Token ${getTokenInLocalStorage()}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         .then((res) => {
  //           if (res) {
  //             dispatch(getKruzhokInfoThunk());
  //           }
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     }
  //   }
  // };
  //
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

  const formik = useFormik({
    initialValues: {
      photo: null,
      name: '',
      teacher: '',
      goal: '',
        times: [
           '',
           '',
           '',
           '',
           '',
           '',
        ],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Введите имя'),
      teacher: Yup.string().required('Введите учителя'),
      goal: Yup.string().required('Введите цель'),
      times: Yup.object().shape({
        1: Yup.string().required('Введите время для Понедельника'),
        2: Yup.string().required('Введите время для Вторника'),
        3: Yup.string().required('Введите время для Среды'),
        4: Yup.string().required('Введите время для Четверга'),
        5: Yup.string().required('Введите время для Пятницы'),
        6: Yup.string().required('Введите время для Субботы'),
      }),
    }),
    onSubmit: async (values) => {
      console.log(values)
    },
  });


  return (
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_title">Үйірме</div>

          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div className="login_forms-label_pink">Фото *</div>
              <div className="login_forms-label_pink">Фото *</div>
              <Input type="file" name="photo" onChange={(event) => {
                console.log(event?.target?.files?.[0]);
                return formik.setFieldValue('photo', event?.target?.files?.[0]);
              }}
                     accept=".png, .jpg, .jpeg, .svg"
                     key={formik.values.photo}

              />
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">Кружок (Үйірме атауы)</div>

                {formik.touched.name && formik.errors.name ? (
                    <div style={{color: "red"}}>{formik.errors.name}</div>
                ) : null}
                <Input
                    name={"name"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    style={{
                      borderColor:
                          formik.touched.name && formik.errors.name
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">Учитель ФИО</div>

                <div className="login_forms-label_pink">Күні</div>
                <Select {...formik.getFieldProps("teacher")}>
                  <option value="">Выберите учителя</option>
                  {teachers?.map((item) => (
                      <option value={item.id}>{item.full_name}</option>
                  ))}
                </Select>
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">Цель (Мақсаты)</div>

                {formik.touched.goal && formik.errors.goal ? (
                    <div style={{color: "red"}}>{formik.errors.goal}</div>
                ) : null}
                <TextArea
                    name={"goal"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.goal}
                    style={{
                      borderColor:
                          formik.touched.goal && formik.errors.goal
                              ? "red"
                              : "#c1bbeb",
                    }}
                />

                <div className="length">{formik.values.goal?.length}/2000</div>
              </div>

              <div className="forms flex">
                <div>
                  {formik.values.times.slice(0,3).map((time, index) => (
                      <div key={index} className="flex-grid">
                        <label htmlFor={`times.${index}`} className="login_forms-label_pink">{weekDay[index]}</label>
                        {formik.touched.times && formik.errors.times && formik.errors.times[index] && (
                            <div style={{ color: "red" }}>{formik.errors.times[index]}</div>
                        )}
                        <Input
                            id={`times.${index}`}
                            name={`times.${index}`}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={time}
                            style={{
                              borderColor: formik.touched.times && formik.errors.times && formik.errors.times[index] ? "red" : "#c1bbeb",
                            }}
                        />
                      </div>
                  ))}
                </div>

                <div>
                  {formik.values.times.slice(3,6).map((time, index) => (
                      <div key={index+2} className="flex-grid">
                        <label htmlFor={`times.${index+2}`} className="login_forms-label_pink">{weekDay[index+2]}</label>
                        {formik.touched.times && formik.errors.times && formik.errors.times[index+2] && (
                            <div style={{ color: "red" }}>{formik.errors.times[index+2]}</div>
                        )}
                        <Input
                            id={`times.${index+2}`}
                            name={`times.${index+2}`}
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={time}
                            style={{
                              borderColor: formik.touched.times && formik.errors.times && formik.errors.times[index+2] ? "red" : "#c1bbeb",
                            }}
                        />
                      </div>
                  ))}
                </div>
              </div>

              <div
                  className="flex"
                  style={{justifyContent: "flex-end", gap: "1.6rem"}}
              >
                <Button
                    type="button"
                    background="#CACACA"
                    color="#645C5C"
                    style={{width: "auto"}}
                    onClick={() => onReject && onReject(false)}
                >
                  Удалить
                </Button>
                <Button
                    background="#27AE60"
                    style={{width: "auto"}}
                    type={"submit"}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
);
};

const weekDay = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

export default MainTableBlock;
