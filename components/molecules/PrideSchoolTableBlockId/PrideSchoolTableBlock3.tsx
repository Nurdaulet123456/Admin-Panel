import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import {Input, Select} from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getClassNameThunk,
  getSchoolOlimpThunk, getSchoolSportThunk,
} from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolOlimp } from "@/types/assets.type";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import ClassNamesModal from "@/components/modals/ClassNames";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { getIAClassThunk } from "@/store/thunks/available.thunk";
import {useFormik} from "formik";
import * as Yup from "yup";

interface UpdateInputProps {
  fullname: string;
  text?: string;
  class?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  olimpid?: ISchoolOlimp;
  getId?: number;
}

const PrideSchoolTableBlock3: FC<IProps> = ({
  onReject,
  onEdit,
  olimpid,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const classes = useTypedSelector((state) => state.ia.iaclass);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (classes) {
      dispatch(getIAClassThunk());
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      student_success: "",
      class_id: "",
      photo: null,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Обязательно*"),
      student_success: Yup.string().required("Обязательно*"),
      class_id: Yup.number().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/PandikOlimpiadaApi/", values, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolOlimpThunk());
                showSuccess();
                onDelete();
                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
            })
            .catch((e) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
      } else {
        await instance
            .put(`https://bilimge.kz/admins/api/PandikOlimpiadaApi/${getId}/`,
                values.photo ? {
                      fullname: values.fullname,
                      class_id: values.class_id,
                      student_success: values.student_success,
                      photo: values.photo
                    } :
                    {
                      fullname: values.fullname,
                      class_id: values.class_id,
                      student_success: values.student_success,
                    }, {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                    "Content-Type": "multipart/form-data",
                  },
                })
            .then((res) => {
              if (res) {
                if (res) {
                  dispatch(getSchoolOlimpThunk());
                  showSuccess();
                  if (showSuccessModal && onReject) {
                    onReject(false);
                  }
                }
              }
            })
            .catch((e) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
      }
    }
  });


  useEffect(() => {
    if (olimpid && getId) {
      formik.resetForm({
        values: {
          fullname: olimpid.fullname || "",
          student_success: olimpid.student_success || "",
          class_id: olimpid.class_id || "",
          photo: null,
        },
      });
    }
  }, [olimpid, getId]);


  function onDelete() {
    formik.resetForm({
      values: {
        fullname: "",
        student_success: "",
        class_id: "",
        photo: null,
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}

      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>

          <div className="main_table-modal_title">Должность</div>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
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
                <div className="login_forms-label_pink">ФИО *</div>
                {formik.touched.fullname && formik.errors.fullname ? (
                    <div style={{color: "red"}}>{formik.errors.fullname}</div>
                ) : null}
                <Input
                    name={"fullname"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullname}
                    style={{
                      borderColor:
                          formik.touched.fullname && formik.errors.fullname
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">Текст</div>
                {formik.touched.student_success && formik.errors.student_success ? (
                    <div style={{color: "red"}}>{formik.errors.student_success}</div>
                ) : null}
                <Input
                    name={"student_success"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.student_success}
                    style={{
                      borderColor:
                          formik.touched.student_success && formik.errors.student_success
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms sanaty">
                <div className="login_forms-label_pink">Класс</div>
                <Select {...formik.getFieldProps("class_id")}>
                  <option value="">Выберите класс</option>
                  {classes?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.class_name}
                      </option>
                  ))
                  }
                </Select>
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
                    onClick={onDelete}
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
            </div>
          </div>
        </form>
      </div>
    </>
);
};

export default PrideSchoolTableBlock3;
