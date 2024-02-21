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
import SanatyModalModal from "../modals/SanatyModal";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";
import { ITeachers } from "@/types/assets.type";
import { AddIcons } from "../atoms/Icons";
import styled from "@emotion/styled";
import {FormikErrors, useFormik,} from "formik";
import * as Yup from "yup";
import {getKruzhokInfoThunk} from "@/store/thunks/schoolnfo.thunk";
import {array} from "yup";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useModalLogic} from "@/hooks/useModalLogic";

interface IHistoryProps {
  start_date?: number;
  end_date?: number;
  job_characteristic?: string;
}

interface ISpecificationProps {
  end_date?: number;
  speciality_university?: string;
  mamandygy?: string;
  degree?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  getId?: number;
  teachersid?: ITeachers;
}

// Функция для проверки, является ли значение объектом ошибок с определенным свойством
function isErrorWithProperty<T>(value: any, propertyName: keyof T): value is FormikErrors<T> {
  return typeof value === 'object' && value !== null && propertyName in value;
}



const TeachersTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  getId,
  teachersid,
}) => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});
  const dispatch = useAppDispatch();

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();


  const reset = (isDelete: boolean, isJob: boolean, index: number) => {
    const file = formik.values.file;
    const name = formik.values.name;
    const sanaty = formik.values.sanaty;
    const pan = formik.values.pan;
    let jobH = formik.values.jobHistory;
    let specification = formik.values.specification;

    if(isDelete && isJob) {
      if(index !== 0)
      jobH = jobH.filter((_, i) => i !== index);
    }else if(!isDelete && isJob) {
      jobH.push({
        start_date: "",
        end_date: "",
        job_characteristic: ""
      })
    }else if(isDelete && !isJob) {
      if(index != 0)
        specification = specification.filter((_, i) => i !== index);
    }else {
      specification.push({
        end_date: "",
        speciality_university: "",
        mamandygy: "",
        degree: "",
      })
    }

    formik.resetForm({
      values: {
        file: file,
        name: name,
        sanaty: sanaty,
        pan: pan,
        // lau: lau,
        jobHistory: jobH,
        specification: specification
      },
    });
  }

  const formik= useFormik({
    initialValues: {
      file: null,
      name: "",
      sanaty: "",
      pan: "",
      // lau: "",
      jobHistory: [
        {
          start_date: "",
          end_date: "",
          job_characteristic: "",
        }
      ],
      specification: [{
        end_date: "",
        speciality_university: "",
        mamandygy: "",
        degree: "",
      }]
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required("Name is required"),
    //   pan: Yup.string().required("PAN is required"),
    //   lau: Yup.string().required("Lau is required"),
    //   jobHistory: Yup.array().of(
    //       Yup.object({
    //         start_date: Yup.date().required("Start Date is required"),
    //         end_date: Yup.date().required("End Date is required"),
    //         job_characteristic: Yup.string().required("Job Characteristic is required")
    //       })
    //   ),
    //   specification: Yup.array().of(
    //       Yup.object({
    //         end_date: Yup.date().required("End Date is required"),
    //         speciality_university: Yup.string().required("Speciality University is required"),
    //         mamandygy: Yup.string().required("Mamandygy is required"),
    //         degree: Yup.string().required("Degree is required")
    //       })
    //   )
    // }),
    onSubmit: async (values) => {
      console.log(values);
      if (!getId) {
              await instance
                .post(
                  "https://bilimge.kz/admins/api/teacher/",
                  {
                    full_name: values.name,
                    subject: values.pan,
                    pedagog: values.sanaty,
                    job_history: values.jobHistory,
                    speciality_history: values.specification,
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

                    formData.append("photo3x4", values.file ? values.file : "");
                    formData.append("id", String((res as any).id));

                    try {
                      const uploadPhotoResponse = await instance.post(
                        "https://bilimge.kz/admins/api/teacher/upload_photo/",
                        formData,
                        {
                          headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                          },
                        },
                      );

                      if (uploadPhotoResponse) {
                        dispatch(getTeachersThunk());
                        showSuccess();
                        onDelete();
                        if (showSuccessModal && onReject) {
                          onReject(false);
                        }
                      }
                    } catch (err) {
                      showError();
                      if (showErrorModal && onReject) {
                        onReject(false);
                      }
                    }
                  }
                })
                .catch((err) => console.log(err));
            } else {
              await instance
                .put(
                  `https://bilimge.kz/admins/api/teacher/${getId}/`,
                    {
                      full_name: values.name,
                      subject: values.pan,
                      pedagog: values.sanaty,
                      job_history: values.jobHistory,
                      speciality_history: values.specification,
                    },
                  {
                    headers: {
                      Authorization: `Token ${getTokenInLocalStorage()}`,
                    },
                  },
                )
                .then(async (res) => {
                  if (res) {
                    if(values.file) {
                      const formData = new FormData();

                      formData.append("photo3x4", values.file);
                      formData.append("id", String((res as any).id));

                      try {
                        const uploadPhotoResponse = await instance.put(
                            "https://bilimge.kz/admins/api/teacher/upload_photo/",
                            formData,
                            {
                              headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                                "Content-Type": "multipart/form-data",
                              },
                            },
                        );

                        if (uploadPhotoResponse) {
                          dispatch(getTeachersThunk());
                          showSuccess();
                          if (showSuccessModal && onReject) {
                            onReject(false);
                          }
                        }
                      } catch (err) {
                        showError();
                        if (showErrorModal && onReject) {
                          onReject(false);
                        }
                      }
                    dispatch(getTeachersThunk());
                  }
                }}).catch((err) => console.log(err));

      }
    }
  });

  useEffect(() => {
    if (teachersid && getId) {
      let job: {start_date: string; end_date: string; job_characteristic: string;}[] =
          teachersid.job_history?.map(item => ({
            start_date: item.start_date?.toString() ?? "", // Преобразование в строку
            end_date: item.end_date?.toString() ?? "",
            job_characteristic: item.job_characteristic ?? ""
          })) || [{
            start_date: "",
            end_date: "",
            job_characteristic: "",
          }];


      let spec: {end_date: string; speciality_university: string; mamandygy: string; degree: string;}[] =
          teachersid.speciality_history?.map(item => ({
            end_date: item.end_date?.toString() ?? "",
            speciality_university: item.speciality_university ?? "",
            mamandygy: item.mamandygy ?? "",
            degree: item.degree ?? ""
          })) || [{
            end_date: "",
            speciality_university: "",
            mamandygy: "",
            degree: "",
          }];


      formik.resetForm({
        values: {
          file: null,
          name: teachersid.full_name || "",
          sanaty: teachersid.pedagog || "",
          pan: teachersid.subject || "",
          jobHistory: job || [{
            start_date: "",
            end_date: "",
            job_characteristic: "",
          }],
          specification: spec ||  [{
            end_date: "",
            speciality_university: "",
            mamandygy: "",
            degree: "",
          }]
        },
      });
    }
  }, [teachersid, getId]);

  function onDelete() {
    formik.resetForm({
      values: {
        file: null,
        name: "",
        sanaty: "",
        pan: "",
        jobHistory: [
          {
            start_date: "",
            end_date: "",
            job_characteristic: "",
          }
        ],
        specification: [{
          end_date: "",
          speciality_university: "",
          mamandygy: "",
          degree: "",
        }]
      },
    });
  }




  return (
      <>
        {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
        {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <form onSubmit={formik.handleSubmit}>
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div>
            <div className="login_forms-label_pink">Фото *</div>
            <Input type="file" name="file" onChange={(event) => {
              return formik.setFieldValue('file', event?.target?.files?.[0]);
            }} />
          </div>

          <div style={{ marginTop: "2.4rem" }} className="sanaty">
            <div className="login_forms-label_pink">Біліктілік санаты</div>
            <Select {...formik.getFieldProps("sanaty")}>
              <option value="">Выберите разряд</option>
              {sanatyArr.map((item) => (
                  <option value={item.id}>{item.type}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО</div>
            {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
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
            <div className="login_forms-label_pink">Пән атауы</div>

            {formik.touched.pan && formik.errors.pan ? (
                <div style={{ color: "red" }}>{formik.errors.pan}</div>
            ) : null}
            <Input
                name={"pan"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pan}
                style={{
                  borderColor:
                      formik.touched.pan && formik.errors.pan
                          ? "red"
                          : "#c1bbeb",
                }}
            />
          </div>
        </div>
      </div>

      <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
        Жұмыс тәжірбиесі
      </div>
      <div style={{ position: "relative" }}>
        {formik.initialValues.jobHistory.map((experience, index) => (
          <div key={index}>
            <div className="forms flex">
              <div className="forms flex">
                <div
                  className="login_forms-label_pink mb-0"
                  style={{ width: "100%" }}
                >
                  Бастаған жылы *
                </div>
                {/*{formik.touched.jobHistory && formik.errors.jobHistory && isErrorWithProperty<{start_date: string}>(formik.errors.jobHistory[index], 'start_date') ? (*/}
                {/*    <div style={{ color: "red" }}>{formik.errors.jobHistory[index].start_date}</div>*/}
                {/*) : null}*/}
                <Input
                    name={`jobHistory[${index}].start_date`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobHistory[index]?.start_date} // Use jobHistory instead of name for the value
                    style={{
                      borderColor:
                          formik.touched.jobHistory && formik.touched.jobHistory[index] && formik.errors.jobHistory && formik.errors.jobHistory[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                    }}
                />
              </div>
              <div className="forms flex">
                <div
                  className="login_forms-label_pink mb-0"
                  style={{ width: "100%" }}
                >
                  Аяқтаған жылы *
                </div>
                {/*{formik.touched.jobHistory && formik.errors.jobHistory && formik.errors.jobHistory[index] && formik.errors.jobHistory[index].end_date ? (*/}
                {/*    <div style={{ color: "red" }}>{formik.errors.jobHistory[index].end_date}</div>*/}
                {/*) : null}*/}
                <Input
                    name={`jobHistory[${index}].end_date`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobHistory[index]?.end_date} // Use jobHistory instead of name for the value
                    style={{
                      borderColor:
                          formik.touched.jobHistory && formik.touched.jobHistory[index] && formik.errors.jobHistory && formik.errors.jobHistory[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                    }}
                />
              </div>

              {index !== 0 && (
                  <AddButtton
                      type="button"
                      onClick={() => reset(true,true,index)}
                  >
                    Remove Job History
                  </AddButtton>
              )}
            </div>

            <div className="forms" style={{ marginBlock: "3.2rem" }}>
              <div className="login_forms-label_pink">
                Жұмыс жасаған аймақ *
              </div>
              {/*{formik.touched.jobHistory && formik.errors.jobHistory && formik.errors.jobHistory[index] && formik.errors.jobHistory[index].job_characteristic ? (*/}
              {/*    <div style={{ color: "red" }}>{formik.errors.jobHistory[index].job_characteristic}</div>*/}
              {/*) : null}*/}
              <TextArea
                  name={`jobHistory[${index}].job_characteristic`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobHistory[index]?.job_characteristic} // Use jobHistory instead of name for the value
                  style={{
                    borderColor:
                        formik.touched.jobHistory && formik.touched.jobHistory[index] && formik.errors.jobHistory && formik.errors.jobHistory[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                  }}
              />
            </div>

          </div>

        ))}

        <AddButtton
            type={"button"}
            onClick= {() => reset(false, true, 999)}
          style={{ position: "absolute", bottom: "0", right: "-42px" }}
        >
          <AddIcons />
        </AddButtton>
      </div>

      <div className="forms" style={{ position: "relative" }}>
        <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>
          Мамандығы
        </div>
        {formik.initialValues.specification.map((item, index) => (
          <div key={index}>
            <div className="forms flex-grid-20">
              <div className="login_forms-label_pink mb-0">Бітірген жылы *</div>
              {/*{formik.touched.specification && formik.errors.specification && formik.errors.specification[index] && formik.errors.specification[index].end_date ? (*/}
              {/*    <div style={{ color: "red" }}>{formik.errors.specification[index].end_date}</div>*/}
              {/*) : null}*/}
              <Input
                  name={`specification[${index}].end_date`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specification[index]?.end_date} // Use jobHistory instead of name for the value
                  style={{
                    borderColor:
                        formik.touched.specification && formik.touched.specification[index] && formik.errors.specification ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                  }}
              />
            </div>

            <div className="forms flex-grid-20">
              <div className="login_forms-label_pink mb-0">Университет *</div>
              {/*{formik.touched.specification && formik.errors.specification && formik.errors.specification[index] && formik.errors.specification[index].speciality_university ? (*/}
              {/*    <div style={{ color: "red" }}>{formik.errors.specification[index].speciality_university}</div>*/}
              {/*) : null}*/}
              <Input
                  name={`specification[${index}].speciality_university`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specification[index]?.speciality_university} // Use jobHistory instead of name for the value
                  style={{
                    borderColor:
                        formik.touched.specification && formik.touched.specification[index] && formik.errors.specification ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                  }}
              />
            </div>

            <div className="forms flex-grid-20">
              <div
                className="login_forms-label_pink mb-0"
                style={{ width: "100%" }}
              >
                Деңгей *
              </div>
              {/*{formik.touched.specification && formik.errors.specification && formik.errors.specification[index] && formik.errors.specification[index].degree ? (*/}
              {/*    <div style={{ color: "red" }}>{formik.errors.specification[index].degree}</div>*/}
              {/*) : null}*/}
              {/*<Input*/}
              {/*    name={`specification[${index}].degree`}*/}
              {/*    onChange={formik.handleChange}*/}
              {/*    onBlur={formik.handleBlur}*/}
              {/*    value={formik.values.specification[index]?.degree} // Use jobHistory instead of name for the value*/}
              {/*    style={{*/}
              {/*      borderColor:*/}
              {/*          formik.touched.specification && formik.touched.specification[index] && formik.errors.specification && formik.errors.specification[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors*/}
              {/*    }}*/}
              {/*/>*/}
              <Select {...formik.getFieldProps(`specification[${index}].degree`)}>
                <option value="">Выберите уровень образования</option>
                <option value={"bakalavr"}>Бакалавр</option>
                <option value={"magistratura"}>Магистрант</option>
                <option value={"doktorantura"}>Докторант</option>
                <option value={"srednee"}>Среднее образование</option>
              </Select>
            </div>

            <div className="forms flex-grid-20">
              <div
                className="login_forms-label_pink mb-0"
                style={{ width: "100%" }}
              >
                Мамандығы *
              </div>
              {/*{formik.touched.specification && formik.errors.specification && formik.errors.specification[index] && formik.errors.specification[index] ? (*/}
              {/*    <div style={{ color: "red" }}>{formik.errors.specification[index]}</div>*/}
              {/*) : null}*/}
              <Input
                  name={`specification[${index}].mamandygy`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specification[index]?.mamandygy} // Use jobHistory instead of name for the value
                  style={{
                    borderColor:
                        formik.touched.specification && formik.touched.specification[index] && formik.errors.specification && formik.errors.specification[index] ? "red" : "#c1bbeb", // Update the conditional check for touched and errors
                  }}
              />
            </div>
            {index !== 0 && (
                <AddButtton
                    type="button"
                    onClick={() => reset(true,false,index)}
                >
                  Remove Job History
                </AddButtton>
            )}
          </div>

        ))}

        <AddButtton
            type={"button"}
            onClick= {() => reset(false, false, 999)}
            style={{ position: "absolute", bottom: "0", right: "-42px" }}
        >
          <AddIcons />
        </AddButtton>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button
          background="#CACACA"
          color="#645C5C"
          type={"button"}
          style={{ width: "auto" }}
          onClick={() =>
            getId ? onEdit && onEdit(false) : onReject && onReject(false)
          }
        >
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }} type={"submit"}>
          Сохранить
        </Button>
      </div>
    </div>
        </form>
      </>
  );
};

const sanatyArr = [
  {
    id: 'pedagog_sheber',
    type: "Педагог шебер",
  },

  {
    id: "pedagog_zertteushy",
    type: "Педагог зерттеуші",
  },

  {
    id: 'pedagog_sarapshy',
    type: "Педагог сарапшы",
  },

  {
    id: 'pedagog_moderator',
    type: "Педагог модератор",
  },

  {
    id: 'pedagog_zhogary',
    type: "Жоғары санатты",
  },

  {
    id: 'pedagog_stazher',
    type: "Педагог стажер",
  },

  {
    id: 'pedagog1sanat',
    type: "1 санатты",
  },

  {
    id: 'pedagog2sanat',
    type: "2 санатты",
  },
  {
    id: 'pedagog_sanat_zhok',
    type: "Санаты жоқ",
  },
  {
    id: 'pedagog',
    type: "Педагог",
  },

];

const AddButtton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
`;

export default TeachersTableBlock;
