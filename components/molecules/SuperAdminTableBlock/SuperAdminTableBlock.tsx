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
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

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
  const router = useRouter();
  const translations: any= {
    kz: kz,
    ru: ru,
  };
  const t = translations[router.locale || "kz"] || kz;
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
      x: "",
      y: "",
    },
    validationSchema: Yup.object({
      kz: Yup.string().required("Обязательно*"),
      ru: Yup.string().required("Обязательно*"),
      eng: Yup.string().required("Обязательно*"),
      url: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      if (!getId) {
        await instance
          .post(
            `https://www.bilimge.kz/admins/api/school/`,
            {
              school_kz_name: values.kz,
              school_ru_name: values.ru,
              school_eng_name: values.eng,
              url: values.url,
              region: values.city,
              timezone: "GMT+5",
              coordinate_x : values.x,
              coordinate_y : values.y,
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
              region: values.city,
              timezone: "GMT+5",
              coordinate_x : values.x,
              coordinate_y : values.y,
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
          city: schoolid.region || "",
          url: schoolid.url || "",
          timezone: schoolid.timezone || "",
          x: schoolid.coordinate_x || "",
          y: schoolid.coordinate_y || "",
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
        x: "",
        y: "",
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
                    <div style={{color: "red"}}>{formik.errors.kz}</div>
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
                    <div style={{color: "red"}}>{formik.errors.ru}</div>
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
                    <div style={{color: "red"}}>{formik.errors.eng}</div>
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
                      <div style={{color: "red"}}>{formik.errors.city}</div>
                  ) : null}
                  <Select {...formik.getFieldProps("city")}>
                    <option value="">Выберите регион</option>
                    {cities.map((item) => (
                        <option value={item.name}>{item.nameUpper}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="login_forms-label_pink">URL</div>
                  {formik.touched.url && formik.errors.url ? (
                      <div style={{color: "red"}}>{formik.errors.url}</div>
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
              </div>
              <div className="forms flex">
                <div>
                  <div className="login_forms-label_pink">X Координата</div>
                  {formik.touched.x && formik.errors.x ? (
                      <div style={{color: "red"}}>{formik.errors.x}</div>
                  ) : null}
                  <Input
                      name={"x"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.x}
                      style={{
                        borderColor:
                            formik.touched.x && formik.errors.x
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>

                <div>
                  <div className="login_forms-label_pink">Y Координата</div>
                  {formik.touched.y && formik.errors.y ? (
                      <div style={{color: "red"}}>{formik.errors.y}</div>
                  ) : null}
                  <Input
                      name={"y"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.y}
                      style={{
                        borderColor:
                            formik.touched.y && formik.errors.y
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
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
                onClick={() => onDelete()}
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
    name: "abay_oblast",
    nameUpper: "Абайская область"
  },
  {
    name: "akmolinsk_oblast",
    nameUpper: "Акмолинская область"
  },
  {
    name: "aktobe_oblast",
    nameUpper: "Актюбинская область"
  },
  {
    name: "almaty_region",
    nameUpper: "Алматинская область"
  },
  {
    name: "atyrau_oblast",
    nameUpper: "Атырауская область"
  },
  {
    name: "east_kazakhstan_oblast",
    nameUpper: "Восточно-Казахстанская область"
  },
  {
    name: "zhambyl_oblast",
    nameUpper: "Жамбылская область"
  },
  {
    name: "west_kazakhstan_oblast",
    nameUpper: "Западно-Казахстанская область"
  },
  {
    name: "zhetysu_oblast",
    nameUpper: "Жетысуская область"
  },
  {
    name: "karaganda_oblast",
    nameUpper: "Карагандинская область"
  },
  {
    name: "kostanay_oblast",
    nameUpper: "Костанайская область"
  },
  {
    name: "kyzylorda_oblast",
    nameUpper: "Кызылординская область"
  },
  {
    name: "mangystau_oblast",
    nameUpper: "Мангистауская область"
  },
  {
    name: "pavlodar_oblast",
    nameUpper: "Павлодарская область"
  },
  {
    name: "north_kazakhstan_oblast",
    nameUpper: "Северо-Казахстанская область"
  },
  {
    name: "turkestan_oblast",
    nameUpper: "Туркестанская область"
  },
  {
    name: "ulytau_oblast",
    nameUpper: "Улытауская область"
  },
]

export default SuperAdminTableBlock;
