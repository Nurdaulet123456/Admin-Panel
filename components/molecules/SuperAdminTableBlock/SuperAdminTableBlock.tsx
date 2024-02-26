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
  getSchoolIdThunk,
  getSchoolThunk,
  getUsersThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolInfo } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Formik, Form, Field, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  getId?: number;
  schoolid?: ISchoolInfo;
  onEdit?: any;
}

interface IUpdateInputProps {
  kz?: string;
  ru?: string;
  eng?: string;
  city?: string;
  url?: string;
  timezone?: string;
}

const SuperAdminTableBlock: FC<IProps> = ({
  onReject,
  getId,
  schoolid,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const formik = useFormik({
    initialValues: {
      kz: "",
      ru: "",
      eng: "",
      city: "",
      url: "",
      timezone: "",
    },
    validationSchema: Yup.object({
      kz: Yup.string().required("Обязательно*"),
      ru: Yup.string().required("Обязательно*"),
      eng: Yup.string().required("Обязательно*"),
      city: Yup.string().required("Обязательно*"),
      url: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (!getId) {
        await instance
          .post(
            `https://www.bilimge.kz/admins/api/school/`,
            {
              school_kz_name: values.kz,
              school_ru_name: values.ru,
              school_eng_name: values.eng,
              url: values.url,
              city: values.city,
              timezone: values.timezone,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res && onReject) {
              showSuccess();
              dispatch(getSchoolThunk());
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
          .put(
            `https://www.bilimge.kz/admins/api/school/${getId}/`,
            {
              school_kz_name: values.kz,
              school_ru_name: values.ru,
              school_eng_name: values.eng,
              url: values.url,
              city: values.city,
              timezone: values.timezone,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            },
          )
          .then((res) => {
            if (res && onEdit) {
              showSuccess();
              dispatch(getSchoolThunk());
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
      }
    },
  });

  useEffect(() => {
    if (schoolid && getId) {
      formik.resetForm({
        values: {
          kz: schoolid.school_kz_name || "",
          ru: schoolid.school_ru_name || "",
          eng: schoolid.school_eng_name || "",
          city: schoolid.city || "",
          url: schoolid.url || "",
          timezone: schoolid.timezone || "",
        },
      });
    }
  }, [schoolid, getId, formik.resetForm]);

  function onDelete() {
    formik.resetForm({
      values: {
        kz: "",
        ru: "",
        eng: "",
        city: "",
        url: "",
        timezone: "",
      },
    });
  }

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <div className="main_table-modal_title">Школы</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex">
            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">
                  Наименование школы (KZ)*
                </div>
                {formik.touched.kz && formik.errors.kz ? (
                  <div style={{ color: "red" }}>{formik.errors.kz}</div>
                ) : null}
                <Input
                  name={"kz"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.kz}
                  style={{
                    borderColor:
                      formik.touched.kz && formik.errors.kz ? "red" : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">
                  Наименование школы (RU)*
                </div>
                {formik.touched.ru && formik.errors.ru ? (
                  <div style={{ color: "red" }}>{formik.errors.ru}</div>
                ) : null}
                <Input
                  name={"ru"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ru}
                  style={{
                    borderColor:
                      formik.touched.ru && formik.errors.ru ? "red" : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">
                  Наименование школы (ENG)*
                </div>
                {formik.touched.eng && formik.errors.eng ? (
                  <div style={{ color: "red" }}>{formik.errors.eng}</div>
                ) : null}
                <Input
                  name={"eng"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eng}
                  style={{
                    borderColor:
                      formik.touched.eng && formik.errors.eng
                        ? "red"
                        : "#c1bbeb",
                  }}
                />
              </div>

              <div className="forms flex">
                <div>
                  <div className="login_forms-label_pink">Город</div>
                  {formik.touched.city && formik.errors.city ? (
                    <div style={{ color: "red" }}>{formik.errors.city}</div>
                  ) : null}
                  <Select {...formik.getFieldProps("week_day")}>
                    <option value="">Выберите день недели</option>
                    {cities.map((item) => (
                        <option value={item.name}>{item.nameUpper}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="login_forms-label_pink">URL</div>
                  {formik.touched.url && formik.errors.url ? (
                    <div style={{ color: "red" }}>{formik.errors.url}</div>
                  ) : null}
                  <Input
                    name={"url"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.url}
                    style={{
                      borderColor:
                        formik.touched.url && formik.errors.url
                          ? "red"
                          : "#c1bbeb",
                    }}
                  />
                </div>

                <div>
                  {/*<div className="login_forms-label_pink">Тайм-зона</div>*/}
                  {/*{formik.touched.timezone && formik.errors.timezone ? (*/}
                  {/*  <div style={{ color: "red" }}>{formik.errors.timezone}</div>*/}
                  {/*) : null}*/}
                  {/*<Input*/}
                  {/*  name={"timezone"}*/}
                  {/*  onChange={formik.handleChange}*/}
                  {/*  onBlur={formik.handleBlur}*/}
                  {/*  value={formik.values.timezone}*/}
                  {/*  style={{*/}
                  {/*    borderColor:*/}
                  {/*      formik.touched.timezone && formik.errors.timezone*/}
                  {/*        ? "red"*/}
                  {/*        : "#c1bbeb",*/}
                  {/*  }}*/}
                  {/*/>*/}
                </div>
              </div>
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
              onClick={() => onDelete()}
            >
              Удалить
            </Button>
            <Button
              background="#27AE60"
              style={{ width: "auto" }}
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

const cities = [
  {
    name: "almaty",
    nameUpper: "Алматы"
  },
  {
    name: "astana",
    nameUpper: "Астана"
  },
  {
    name: "shymkent",
    nameUpper: "Шымкент"
  },
  {
    name: "abay",
    nameUpper: "Абайская область"
  },
  {
    name: "akmolinsk",
    nameUpper: "Акмолинская область"
  },
  {
    name: "aktobe",
    nameUpper: "Актюбинская область"
  },
  {
    name: "almaty_region",
    nameUpper: "Алматинская область"
  },
  {
    name: "atyrau",
    nameUpper: "Атырауская область"
  },
  {
    name: "east_kazakhstan",
    nameUpper: "Восточно-Казахстанская область"
  },
  {
    name: "zhambyl",
    nameUpper: "Жамбылская область"
  },
  {
    name: "west_kazakhstan",
    nameUpper: "Западно-Казахстанская область"
  },
  {
    name: "zhetysu",
    nameUpper: "Жетысуская область"
  },
  {
    name: "karaganda",
    nameUpper: "Карагандинская область"
  },
  {
    name: "kostanay",
    nameUpper: "Костанайская область"
  },
  {
    name: "kyzylorda",
    nameUpper: "Кызылординская область"
  },
  {
    name: "mangystau",
    nameUpper: "Мангистауская область"
  },
  {
    name: "pavlodar",
    nameUpper: "Павлодарская область"
  },
  {
    name: "north_kazakhstan",
    nameUpper: "Северо-Казахстанская область"
  },
  {
    name: "turkestan",
    nameUpper: "Туркестанская область"
  },
  {
    name: "ulytau",
    nameUpper: "Улытауская область"
  },


]

export default SuperAdminTableBlock;
