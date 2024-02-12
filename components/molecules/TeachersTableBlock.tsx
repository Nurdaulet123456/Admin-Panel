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
import { log } from "console";
import { useFormik, useField, Formik, Form } from "formik";
import * as Yup from "yup";

interface UpdateInputProps {
  name?: string;
  pan?: string;
  lau?: string;

  jobhistory?: IHistoryProps[];

  specification?: ISpecificationProps[];
}

interface IHistoryProps {
  start_date?: string;
  end_date?: string;
  job_characteristic?: string;
}

interface ISpecificationProps {
  end_date?: string;
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

  // const [workExperience, setWorkExperience] = useState<IHistoryProps[]>([
  //   {
  //     start_date: "",
  //     end_date: "",
  //     job_characteristic: "",
  //   },
  // ]);

  // const [mamandygyList, setMamandygyList] = useState<ISpecificationProps[]>([
  //   {
  //     end_date: "",
  //     speciality_university: "",
  //     mamandygy: "",
  //     degree: "",
  //   },
  // ]);

  // const [file, setFile] = useState<any>(null);
  // console.log(teachersid);
  

  // useEffect(() => {
  //   if (teachersid && getId) {
  //     setUpdateInput({
  //       name: teachersid.full_name || "",
  //       pan: teachersid.subject || "",
  //     });

  //     if (teachersid.job_history && teachersid.job_history.length > 0) {
  //       setWorkExperience(teachersid.job_history as IHistoryProps[]);
  //     }

  //     if (
  //       teachersid.speciality_history &&
  //       teachersid.speciality_history.length > 0
  //     ) {
  //       setMamandygyList(
  //         teachersid.speciality_history as ISpecificationProps[],
  //       );
  //     }

  //     setText(teachersid.pedagog as string);
  //   }
  // }, [teachersid]);

  // const onChangeUpdateInput = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;

  //   setUpdateInput({
  //     ...updateInput,
  //     [name]: value,
  //   });
  // };

  const [jobAdded, setJobAdded] = useState(true);

  useEffect(()=> {
        formik.values.jobHistory.push({
          start_date: "",
          end_date: "",
          job_characteristic: ""
        })
      }, [jobAdded]
  )




  // const handleWorkExperienceChange = (
  //   index: number,
  //   fieldName: string,
  //   value: any,
  // ) => {
  //   setWorkExperience((prevExperience) =>
  //     prevExperience.map((experience, i) =>
  //       i === index ? { ...experience, [fieldName]: value } : experience,
  //     ),
  //   );
  // };

  // const handleAddMamandygy = () => {
  //   setMamandygyList((prevList) => [
  //     ...prevList,
  //     {
  //       end_date: "",
  //       speciality_university: "",
  //       mamandygy: "",
  //       degree: "",
  //     },
  //   ]);
  // };

  // const handleMamandygyChange = (
  //   index: number,
  //   fieldName: string,
  //   value: any,
  // ) => {
  //   setMamandygyList((prevList) =>
  //     prevList.map((item, i) =>
  //       i === index ? { ...item, [fieldName]: value } : item,
  //     ),
  //   );
  // };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   console.log("Selected File:", selectedFile);
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  // };

  // const onSave = async () => {
  //   console.log(updateInput.name, updateInput.pan, text);

  //   if (!updateInput.name || !updateInput.pan || !text) {
  //     return;
  //   }

    

  //   if (updateInput.name && updateInput.pan && text) {
  //     if (!getId) {
  //       await instance
  //         .post(
  //           "https://bilimge.kz/admins/api/teacher/",
  //           {
  //             full_name: updateInput.name,
  //             subject: updateInput.pan,
  //             pedagog: text,
  //             job_history: workExperience,
  //             speciality_history: mamandygyList,
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

  //             formData.append("photo3x4", file);
  //             formData.append("id", String((res as any).id));

  //             console.log("adasdasd");
  //             try {
  //               const uploadPhotoResponse = await instance.post(
  //                 "https://bilimge.kz/admins/api/teacher/upload_photo/",
  //                 formData,
  //                 {
  //                   headers: {
  //                     Authorization: `Token ${getTokenInLocalStorage()}`,
  //                   },
  //                 },
  //               );

  //               if (uploadPhotoResponse) {
  //                 dispatch(getTeachersThunk());
  //               }
  //             } catch (err) {
  //               console.log(err);
  //             }
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       await instance
  //         .put(
  //           `https://bilimge.kz/admins/api/teacher/${getId}/`,
  //           {
  //             full_name: updateInput.name,
  //             subject: updateInput.pan,
  //             pedagog: text,
  //             job_history: workExperience,
  //             speciality_history: mamandygyList,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Token ${getTokenInLocalStorage()}`,
  //             },
  //           },
  //         )
  //         .then((res) => {
  //           if (res) {
  //             dispatch(getTeachersThunk());
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // };\

  const formik= useFormik({
    initialValues: {
      file: "",
      name: "",
      sanaty: "",
      pan: "",
      lau: "",
      jobHistory: [{
        start_date: "",
        end_date: "",
        job_characteristic: "",
      }],
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
    }
  });

  const [jobRemove, setJobRemove] = useState(null);

  useEffect(() => {
    if (jobRemove !== null && jobRemove !== undefined) {
      // Filter the jobHistory array and update Formik's values
      const filteredJobHistory = formik.values.jobHistory.filter((_, index) => index !== jobRemove);
      formik.setFieldValue("jobHistory", filteredJobHistory);
    }
  }, [jobRemove]);


  // useEffect(() => {
  //   if (teachersid && getId) {
  //     formik.resetForm({
  //       values: {
  //
  //       },
  //     });
  //   }
  // }, [teachersid, getId]);

  return (
      <form onSubmit={formik.handleSubmit}>
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div>
            <div className="login_forms-label_pink">Фото *</div>
            <Input type="file" name="file" onChange={(event) => {
              return formik.setFieldValue('file', event?.target?.files[0]);
            }} />
          </div>

          <div style={{ marginTop: "2.4rem" }} className="sanaty">
            <div className="login_forms-label_pink">Біліктілік санаты</div>
            <Select {...formik.getFieldProps("sanaty")}>
              <option value="">Выберите день недели</option>
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

          <div className="forms">
            <div className="login_forms-label_pink">Лауазымы</div>
            {formik.touched.lau && formik.errors.lau ? (
                <div style={{ color: "red" }}>{formik.errors.lau}</div>
            ) : null}
            <Input
                name={"lau"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lau}
                style={{
                  borderColor:
                      formik.touched.lau && formik.errors.lau
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
                {formik.touched.jobHistory && formik.errors.jobHistory && formik.errors.jobHistory[index] && formik.errors.jobHistory[index]?.start_date ? (
                    <div style={{ color: "red" }}>{formik.errors.jobHistory[index]?.start_date}</div>
                ) : null}
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
                {formik.touched.jobHistory && formik.errors.jobHistory && formik.errors.jobHistory[index] && formik.errors.jobHistory[index].end_date ? (
                    <div style={{ color: "red" }}>{formik.errors.jobHistory[index].end_date}</div>
                ) : null}
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
                      onClick={() => {
                        console.log(index)
                        setJobRemove(index); // Set the jobRemove state when the button is clicked
                      }}
                  >
                    Remove Job History
                  </AddButtton>
              )}
            </div>

            <div className="forms" style={{ marginBlock: "3.2rem" }}>
              <div className="login_forms-label_pink">
                Жұмыс жасаған аймақ *
              </div>
              {formik.touched.jobHistory && formik.errors.jobHistory && formik.errors.jobHistory[index] && formik.errors.jobHistory[index].job_characteristic ? (
                  <div style={{ color: "red" }}>{formik.errors.jobHistory[index].job_characteristic}</div>
              ) : null}
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
            onClick={() =>
            setJobAdded(!jobAdded)
          }
          style={{ position: "absolute", bottom: "0", right: "-42px" }}
        >
          <AddIcons />
        </AddButtton>
      </div>

      {/*<div className="forms" style={{ position: "relative" }}>*/}
      {/*  <div className="login_forms-label_pink" style={{ color: "#E94E29" }}>*/}
      {/*    Мамандығы*/}
      {/*  </div>*/}
      {/*  {mamandygyList.map((item, index) => (*/}
      {/*    <div key={index}>*/}
      {/*      <div className="forms flex-grid-20">*/}
      {/*        <div className="login_forms-label_pink mb-0">Бітірген жылы *</div>*/}
      {/*        <Input*/}
      {/*          type="text"*/}
      {/*          placeholder="Бітірген жылы"*/}
      {/*          name={`end_date_${index}`}*/}
      {/*          style={{ width: "40%" }}*/}
      {/*          value={item.end_date}*/}
      {/*          onChange={(e) =>*/}
      {/*            handleMamandygyChange(index, "end_date", e.target.value)*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </div>*/}

      {/*      <div className="forms flex-grid-20">*/}
      {/*        <div className="login_forms-label_pink mb-0">Университет *</div>*/}
      {/*        <Input*/}
      {/*          type="text"*/}
      {/*          placeholder="Университет"*/}
      {/*          name={`speciality_university_${index}`}*/}
      {/*          style={{ width: "40%" }}*/}
      {/*          value={item.speciality_university}*/}
      {/*          onChange={(e) =>*/}
      {/*            handleMamandygyChange(*/}
      {/*              index,*/}
      {/*              "speciality_university",*/}
      {/*              e.target.value,*/}
      {/*            )*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </div>*/}

      {/*      <div className="forms flex-grid-20">*/}
      {/*        <div*/}
      {/*          className="login_forms-label_pink mb-0"*/}
      {/*          style={{ width: "100%" }}*/}
      {/*        >*/}
      {/*          Деңгей **/}
      {/*        </div>*/}
      {/*        <Input*/}
      {/*          type="text"*/}
      {/*          placeholder="Деңгей"*/}
      {/*          name={`degree_${index}`}*/}
      {/*          style={{ width: "40%" }}*/}
      {/*          value={item.degree}*/}
      {/*          onChange={(e) =>*/}
      {/*            handleMamandygyChange(index, "degree", e.target.value)*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </div>*/}

      {/*      <div className="forms flex-grid-20">*/}
      {/*        <div*/}
      {/*          className="login_forms-label_pink mb-0"*/}
      {/*          style={{ width: "100%" }}*/}
      {/*        >*/}
      {/*          Мамандығы **/}
      {/*        </div>*/}
      {/*        <Input*/}
      {/*          type="text"*/}
      {/*          placeholder="Мамандығы"*/}
      {/*          name={`mamandygy_${index}`}*/}
      {/*          style={{ width: "40%" }}*/}
      {/*          value={item.mamandygy}*/}
      {/*          onChange={(e) =>*/}
      {/*            handleMamandygyChange(index, "mamandygy", e.target.value)*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}

      {/*  <AddButtton*/}
      {/*    onClick={handleAddMamandygy}*/}
      {/*    style={{ position: "absolute", bottom: "0", right: "45%" }}*/}
      {/*  >*/}
      {/*    <AddIcons />*/}
      {/*  </AddButtton>*/}
      {/*</div>*/}

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
  );
};

const sanatyArr = [
  {
    id: 1,
    type: "Pedagog Sheber",
  },

  {
    id: 2,
    type: "Pedagog Zertteushy",
  },

  {
    id: 3,
    type: "Pedagog Sarapshy",
  },

  {
    id: 4,
    type: "Pedagog Moderator",
  },

  {
    id: 5,
    type: "Pedagog Zhogary",
  },

  {
    id: 6,
    type: "Pedagog Stazher",
  },

  {
    id: 7,
    type: "Pedagog 1 sanat",
  },

  {
    id: 8,
    type: "Pedagog 2 sanat",
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
