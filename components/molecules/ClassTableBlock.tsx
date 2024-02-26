import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import {Input, Select} from "../atoms/UI/Inputs/Input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getClassThunk,
  getKruzhokTeachersInfoThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {getClassNameThunk, getDopThunk, getOSThunk} from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { IClass } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { getIAClassRoomThunk } from "@/store/thunks/available.thunk";
import {useFormik} from "formik";
import * as Yup from "yup";
import loginForms from "@/components/forms/LoginForms";

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onReject?: Dispatch<SetStateAction<boolean>>;
  classinfoid?: IClass;
  getId?: number;
}

const ClassTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  getId,
  classinfoid,
}) => {
  const dispatch = useAppDispatch();
  const teachers = useTypedSelector((state) => state.system.teachers);
  const classname = useTypedSelector((state) => state.pride.classname);
  const classroom = useTypedSelector((state) => state.ia.iaclassrooms);
  const os = useTypedSelector((state) => state.pride.os);
  const dop = useTypedSelector((state) => state.pride.dop);
  const [smena1, setSmena1] = useState<number>();
  const [smena2, setSmena2] = useState<number>();

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (teachers && classname && classroom) {
      dispatch(getKruzhokTeachersInfoThunk());
      dispatch(getClassNameThunk());
      dispatch(getIAClassRoomThunk());
      dispatch(getDopThunk());
      dispatch(getOSThunk());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (classinfoid) {
  //     setText7((classinfoid?.class_name as string) || "");
  //     setText2((classinfoid?.language as string) || "");
  //     setText1((classinfoid?.classroom?.classroom_name as string) || "");
  //     setText((classinfoid?.class_teacher?.full_name as string) || "");
  //     setText3((classinfoid?.osnova_plan as string) || "");
  //     setText4((classinfoid?.osnova_smena as string) || "");
  //     setText5((classinfoid?.dopurok_plan as string) || "");
  //     setText6((classinfoid?.dopurok_smena as string) || "");
  //   }
  // }, [classinfoid]);
  //
    console.log(dop)
  const formik = useFormik({
    initialValues: {
      class: "",
      classRuk: "",
      cabinet: "",
      language: "",
      calls1: "",
      calls2: "",
    },
    validationSchema: Yup.object({
      class: Yup.string().required("Обязательно*"),
      classRuk: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (!getId) {
        await instance
            .post(
                "https://bilimge.kz/admins/api/class/",
                {
                  class_name: values.class,
                  language: values.language,
                  classroom: values.cabinet,
                  class_teacher: values.classRuk,
                  osnova_plan: Number(values.calls1),
                  dopurok_plan: Number(values.calls2),
                    osnova_smena: smena1,
                    dopurak_smena: smena2,

                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res) {
                showSuccess();
                onDelete()
                dispatch(getClassThunk());
              }
            })
            .catch((err) => showError());
      } else {
        await instance
            .put(
                `https://bilimge.kz/admins/api/class/${getId}/`,
                {
                  class_name: values.class,
                  language: values.language,
                  classroom: values.cabinet,
                  class_teacher: values.classRuk,
                  osnova_plan: Number(values.calls1),
                  dopurok_plan: Number(values.calls2),
                  osnova_smena: smena1,
                  dopurak_smena: smena2,
                },
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                  },
                },
            )
            .then((res) => {
              if (res) {
                showSuccess();
                dispatch(getClassThunk());
              }
            })
            .catch((err) => showError());
      }
    }
  });

    useEffect(() => {
        if (classinfoid && getId) {
            formik.resetForm({
                values: {
                    class: classinfoid.class_name || "",
                    classRuk: classinfoid.class_teacher?.id || "",
                    cabinet: classinfoid.classroom?.id || "",
                    language: classinfoid.language || "",
                    calls1: classinfoid.osnova_plan || "",
                    calls2: classinfoid.dopurok_plan || "",
                },
            });
            setSmena1(classinfoid.osnova_smena);
            setSmena1(classinfoid.dopurok_smena);

        }
    }, [classinfoid, getId]);

    function onDelete() {
        formik.resetForm({
            values: {
                class: "",
                classRuk: "",
                cabinet: "",
                language: "",
                calls1: "",
                calls2: "",
            },
        });
        setSmena1(0);
        setSmena2(0)
    }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">Класс</div>
              {formik.touched.class && formik.errors.class ? (
                  <div style={{color: "red"}}>{formik.errors.class}</div>
              ) : null}
              <Input
                  name={"class"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.class}
                  style={{
                    borderColor:
                        formik.touched.class && formik.errors.class
                            ? "red"
                            : "#c1bbeb",
                  }}
                  placeholder="Напишите класс"
              />
            </div>

            <div className="forms">
              <div className="sanaty">
                <div className="login_forms-label_pink">
                  Классный руководитель
                </div>
                <Select {...formik.getFieldProps("classRuk")}>
                  <option value="">Выберите классного руководителя</option>
                  {teachers?.map((item, index) => (
                      <option key={index} value={item.id}>{item.full_name}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div
                className="forms flex"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "5.2rem",
                }}
            >
              <div className="sanaty">
                <div className="login_forms-label_pink">Кабинет</div>
                <Select {...formik.getFieldProps("cabinet")}>
                  <option value="">Выберите кабинет</option>
                  {classroom?.map((item, index) => (
                      <option key={index} value={item.id}>{item.classroom_name}</option>
                  ))}
                </Select>
              </div>

              <div className="sanaty">
                <div className="login_forms-label_pink">Оқыту тілі</div>
                <Select {...formik.getFieldProps("language")}>
                  <option value="">Выберите язык</option>
                  <option value="KZ">KZ</option>
                  <option value="ENG">EN</option>
                  <option value="RU">RU</option>
                </Select>
              </div>
            </div>

            <div className="label_title">Основной урок</div>
            <div
                className="forms flex"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "5.2rem",
                }}
            >
              <div className="sanaty">
                <div className="login_forms-label_pink">План звонка</div>
                <Select {...formik.getFieldProps("calls1")}  onChange={(event) => {
                    // Обновление через контекст
                    const selectedItem = os?.find(item => item.id === Number(event.target.value));
                    if (selectedItem) {
                        setSmena1(selectedItem.plan);
                    }
                    formik.handleChange(event);
                }}>
                  <option value="">Выберите номер звонка</option>
                  {Array.from(new Set(os?.map(item => item.plan)))
                      .map((plan, index) => (
                          <option key={index} value={plan}>{plan}</option>
                      ))}
                </Select>
              </div>
            </div>
              <div className="label_title">Доп. урок</div>
            <div
                className="forms flex"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "5.2rem",
                }}
            >
              <div className="sanaty">
                <div className="login_forms-label_pink">План звонка</div>
                <Select {...formik.getFieldProps("calls2")} onChange={(event) => {
                    setSmena2(Number(event.target.value));
                    formik.handleChange(event);
                }}>
                  <option value="">Выберите номер звонка</option>
                  {  Array.from(new Set(dop?.map(item => item.plan)))
                      .map((plan, index) => (
                          <option key={index} value={plan}>{plan}</option>
                      ))}
                </Select>
              </div>
            </div>
          </div>

          <div
              className="flex"
              style={{justifyContent: "flex-end", gap: "1.6rem"}}
          >
            <Button
                background="#CACACA"
                color="#645C5C"
                style={{width: "auto"}}
                onClick={onDelete}
                type="button"
            >
              Удалить
            </Button>
            <Button
                background="#27AE60"
                style={{width: "auto"}}
                type="submit"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </>
);
};

export default ClassTableBlock;
