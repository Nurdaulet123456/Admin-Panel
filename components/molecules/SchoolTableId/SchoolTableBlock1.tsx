import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolAdminThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolAdmin } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getSchoolSportThunk} from "@/store/thunks/pride.thunk";
import {MdClear} from "react-icons/md";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  adminid?: ISchoolAdmin;
  getId?: number;
}

const SchoolTableBlock1: FC<IProps> = ({
  onReject,
  onEdit,
  adminid,
  getId,
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
  const [photo, setPhoto] = useState<File | null>()
  const [photoId, setPhotoId] = useState<string | null>()


  const formik = useFormik({
    initialValues: {
      name: "",
      prof: "",
      tel: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
      prof: Yup.string().required("Обязательно*"),
      tel: Yup.number().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("administrator_name", values.name);
      formData.append("phone_number", values.tel);
      formData.append("position", values.prof);
      photo && formData.append("administator_photo", photo);

      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/school_administration/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolAdminThunk());
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
            .put(`https://bilimge.kz/admins/api/school_administration/${getId}/`, formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolAdminThunk());
                showSuccess();
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
    }
  });


  useEffect(() => {
    if (adminid && getId) {
      formik.resetForm({
        values: {
          name: adminid.administrator_name || "",
          prof: adminid.position || "",
          tel: adminid.phone_number || "",
        },
      });
      setPhotoId(adminid.administator_photo);
    }
  }, [adminid, getId]);


  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        prof: "",
        tel: "",
      },
    });
    setPhoto(null);
    setPhotoId(null);
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
              {
                photo ? (
                    <div className="file-item">
                      <div className="file-info">
                        <p>{photo.name.substring(0, 14)}</p>
                      </div>
                      <div className="file-actions">
                        <MdClear onClick={() => setPhoto(null)}/>
                      </div>
                    </div>
                ) : (
                    photoId ? <div className="file-item">
                          <div className="file-info">
                            <p>{photoId.slice((photoId.lastIndexOf("/") + 1))}</p>
                          </div>
                          <div className="file-actions">
                            <MdClear onClick={() => setPhotoId(null)}/>
                          </div>
                        </div> :
                    <Input type="file" name="file" onChange={(event) => {
                      return setPhoto(event?.target?.files?.[0]);
                    }}
                    />
                )
              }
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">ФИО *</div>
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
                <div className="login_forms-label_pink">Должность *</div>
                {formik.touched.prof && formik.errors.prof ? (
                    <div style={{color: "red"}}>{formik.errors.prof}</div>
                ) : null}
                <Input
                    name={"prof"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prof}
                    style={{
                      borderColor:
                          formik.touched.prof && formik.errors.prof
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">Номер телефона *</div>

                {formik.touched.tel && formik.errors.tel ? (
                    <div style={{color: "red"}}>{formik.errors.tel}</div>
                ) : null}
                <Input
                    name={"tel"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tel}
                    style={{
                      borderColor:
                          formik.touched.tel && formik.errors.tel
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div
                  className="flex"
                  style={{justifyContent: "flex-end", gap: "1.6rem"}}
              >
                <Button
                    background="#CACACA"
                    color="#645C5C"
                    style={{width: "auto"}}
                    type={"button"}
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

export default SchoolTableBlock1;
