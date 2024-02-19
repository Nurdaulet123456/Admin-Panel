import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction, useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import {Input, Select, TextArea} from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getNewsThunk } from "@/store/thunks/pride.thunk";
import { INews } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useDropzone} from 'react-dropzone'
import news from "@/pages/news";

interface UpdateInputProps {
  text?: string;
  date?: string;
  file?: any;
}

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onReject?: Dispatch<SetStateAction<boolean>>;
  newsid?: INews;
  getId?: number;
}


const NewsTableBlock: FC<IProps> = ({ onEdit, onReject, newsid, getId }) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const onDrop = useCallback((acceptedFiles: any[])=> {
    console.log(acceptedFiles)
    formik.setFieldValue('files', acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const formik = useFormik({
    initialValues: {
      text: "",
      date: "",
      files: [],
      type: "",
    },
    validationSchema: Yup.object({

    }),
    onSubmit: async (values) => {
      console.log(values)
      const formData = new FormData();

      formData.append("type", values.type.toLowerCase());
      formData.append("text", values.text);
      formData.append("date", values.date);
      if(values.files) {
        values.files.forEach((item: any, index: any) => {
          formData.append(`photos[${index}]`, item);
        });
      }
      console.log(formData.get("photos[0]"))

      if (!getId) {
        await instance
            .post("https://bilimge.kz/admins/api/newsApi/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());
                showSuccess();
              }
            })
            .catch((err) => showError());
      } else {
        await instance
            .put(
                `https://bilimge.kz/admins/api/newsApi/${getId}/`,
                formData,
                {
                  headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                    "Content-Type": "multipart/form-data",
                  },
                },
            )
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());
                showSuccess();
              }
            })
            .catch((err) => showError());
      }
    }
  });

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div style={{marginBottom: "2.4rem"}} className="sanaty">
                <div className="login_forms-label_pink">Тип</div>
                <Select {...formik.getFieldProps("class_id")}>
                  <option value="">Выберите тип</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="manual">Ручной</option>
                </Select>
              </div>
              <div className="login_forms-label_pink">Фото *</div>
              <div {...getRootProps()} style={{
                border: '2px dashed #ccc', /* Штрихованный бордер */
                padding: '20px', /* Паддинг внутри div */
                borderRadius: '5px', /* Скругленные углы */
                textAlign: 'center', /* Текст по центру */
                marginBottom: '20px', /* Отступ снизу */
                backgroundColor:"white",
              }}>
                <input {...getInputProps()}/>
                {
                  isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag and drop some files here, or click to select files</p>
                }
              </div>

            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">Уақыты</div>

                {formik.touched.date && formik.errors.date ? (
                    <div style={{color: "red"}}>{formik.errors.date}</div>
                ) : null}
                <Input
                    name={"date"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    style={{
                      borderColor:
                          formik.touched.date && formik.errors.date
                              ? "red"
                              : "#c1bbeb",
                    }}
                />

                <div className="forms">
                  <div className="login_forms-label_pink">Текст</div>
                  {formik.touched.text && formik.errors.text ? (
                      <div style={{color: "red"}}>{formik.errors.text}</div>
                  ) : null}
                  <TextArea
                      name={"text"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.text}
                      style={{
                        borderColor:
                            formik.touched.text && formik.errors.text
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />

                  <div className="length">{formik.values.text?.length}/2000</div>

                </div>

                <div
                    className="flex"
                    style={{justifyContent: "flex-end", gap: "1.6rem"}}
                >
                  <Button
                      background="#CACACA"
                      color="#645C5C"
                      style={{width: "auto"}}
                      onClick={() =>
                          getId ? onEdit && onEdit(false) : onReject && onReject(false)
                      }
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
);
};

export default NewsTableBlock;
