import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction, useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getSchoolAdminThunk, getSchoolPhotosThunk, getSchoolSocialThunk} from "@/store/thunks/schoolnfo.thunk";
import { ISchoolPhotos } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDropzone} from 'react-dropzone'


interface UpdateInputProps {
  name?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  photosid?: ISchoolPhotos;
  getId?: number;
}

const SchoolTableBlock2: FC<IProps> = ({
  onReject,
  onEdit,
  photosid,
  getId,
}) => {
  const dispatch = useAppDispatch();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    name: "",
    file: null,
  });

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setUpdateInput({
        ...updateInput,
        [name]: files?.[0],
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (photosid) {
      setUpdateInput({
        name: photosid.slider_name || "",
        file: null,
      });
    }
  }, [photosid]);

  const onSave = async () => {
    try {
      if (!updateInput.name || !updateInput.file) {
        showError();
        return;
      }

      if (updateInput.name && updateInput.file) {
        const formData = new FormData();
        formData.append("slider_name", updateInput.name);
        formData.append("slider_photo", updateInput.file);

        if (!getId) {
          await instance
            .post("/api/slider/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  file: null,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          await instance
            .put(`/api/slider/${getId}/`, formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  file: null,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (error) {
      showError();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно*"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("slider_name", values.name);
      values.photo &&
      formData.append("slider_photo", values.photo);

      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/slider/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                onDelete();
                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
            })
            .catch((err) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
      } else {
        await instance
            .put(`https://bilimge.kz/admins/api/slider/${getId}/`, formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
            })
            .catch((err) => {
              showError();
              if (showErrorModal && onReject) {
                onReject(false);
              }
            });
      }
    }
  });

  useEffect(() => {
    if (photosid && getId) {
      formik.resetForm({
        values: {
          name: photosid.slider_name || "",
          photo: null,
        },
      });
    }
  }, [photosid, getId]);


  function onDelete() {
    formik.resetForm({
      values: {
        name: "",
        photo: null,
      },
    });
  }


  const onDrop = useCallback((acceptedFiles: any[])=> {
    formik.setFieldValue('photo', acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_title">Фото-суреттер</div>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">Название</div>
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
                <div className="login_forms-label_pink">Фото *</div>
                <div {...getRootProps()} style={{
                  border: '2px dashed #ccc', /* Штрихованный бордер */
                  padding: '20px', /* Паддинг внутри div */
                  borderRadius: '5px', /* Скругленные углы */
                  textAlign: 'center', /* Текст по центру */
                  marginBottom: '20px', /* Отступ снизу */
                  backgroundColor: "white",
                }}>
                  <input {...getInputProps()}/>
                  {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag and drop some files here, or click to select files</p>
                  }
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

export default SchoolTableBlock2;
