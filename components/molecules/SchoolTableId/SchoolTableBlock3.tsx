import {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState,} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {getTokenInLocalStorage, urlToFile} from "@/utils/assets.utils";
import {useFormik} from "formik";
import * as Yup from "yup";
import {ISchoolPassport, ISchoolPhotos} from "@/types/assets.type";
import {useModalLogic} from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import DeleteModal from "@/components/modals/DeleteModal";
import {getMenuThunk, getSchoolPassportThunk} from "@/store/thunks/schoolnfo.thunk";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {MdClear} from "react-icons/md";

interface IProps {
    schoolPassport?: ISchoolPassport[];
}

const SchoolTableBlock3: FC<IProps> = ({
                                          schoolPassport
                                      }) => {

    const dispatch = useAppDispatch();
    const [photo, setPhoto] = useState<File | null>();

    const {
        showSuccessModal,
        showErrorModal,
        onSuccessModalClose,
        onErrorModalClose,
        showSuccess,
        showError,
        showDeleteModal, showDelete, onDeleteModalClose,
    } = useModalLogic();

  const formik = useFormik({
    initialValues: {
        school_name: "",
      year: '',
      school_address:"",
      childNumber: "",
      classComplect:"",
      boyNumber: "",
      girlNumber: "",
      familyNumber: "",
      parentsNumber: "",
      language: "",
      status: "",
      capacity: "",
      actualNumber: "",
      preparatoryClassNumber: "",
      preparatoryChildNumber: "",
      elementarySchoolClass: "",
      elementarySchoolChild: "",
      middleSchoolClass: "",
      middleSchoolChild: "",
      highSchoolClass: "",
      highSchoolChild: "",
      teachersNumber: "",
      pedagogSheber: "",
      pedagogZertteushi: "",
      pedagogSarapshy: "",
      pedagogModerator: "",
      pedagog: "",
      pedagogTagylymdamashy: "",
      pedagogHigh: "",
      sanat1: "",
      sanat2: "",
      sanatZhok: "",
      history: "",
    },
    validationSchema: Yup.object({
      year: Yup.number(),
      school_address: Yup.string(),
      childNumber: Yup.number(),
      classComplect: Yup.number(),
      boyNumber: Yup.number(),
      girlNumber: Yup.number(),
      familyNumber: Yup.number(),
      parentsNumber: Yup.number(),
      language: Yup.string(),
      status: Yup.string(),
      capacity: Yup.number(),
      actualNumber: Yup.number(),
      preparatoryClassNumber: Yup.number(),
      preparatoryChildNumber: Yup.number(),
      elementarySchoolClass: Yup.number(),
      elementarySchoolChild: Yup.number(),
      middleSchoolClass: Yup.number(),
      middleSchoolChild: Yup.number(),
      highSchoolClass: Yup.number(),
      highSchoolChild: Yup.number(),
      teachersNumber: Yup.number(),
      pedagogSheber: Yup.number(),
      pedagogZertteushi: Yup.number(),
      pedagogSarapshy: Yup.number(),
      pedagogModerator: Yup.number(),
      pedagog: Yup.number(),
      pedagogTagylymdamashy: Yup.number(),
      pedagogHigh: Yup.number(),
      sanat1: Yup.number(),
      sanat2: Yup.number(),
      sanatZhok: Yup.number(),
      history: Yup.string(),
    }),
    onSubmit: async (values) => {
        const data = {
                school_name: values.school_name,
                school_address: values.school_address,
                established: parseInt(values.year, 10) || undefined,
                amount_of_children: parseInt(values.childNumber, 10) || undefined,
                ul_sany: parseInt(values.boyNumber, 10) || undefined,
                kiz_sany: parseInt(values.girlNumber, 10) || undefined,
                school_lang: values.language,
                status: values.status,
                vmestimost: parseInt(values.capacity, 10) || undefined,
                dayarlyk_class_number: parseInt(values.preparatoryClassNumber, 10) || undefined,
                dayarlyk_student_number: parseInt(values.preparatoryChildNumber, 10) || undefined,
                number_of_students: parseInt(values.actualNumber, 10) || undefined,
                number_of_classes: parseInt(values.classComplect, 10) || undefined,
                number_of_1_4_students: parseInt(values.elementarySchoolChild, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                number_of_1_4_classes: parseInt(values.elementarySchoolClass, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                number_of_5_9_students: parseInt(values.middleSchoolChild, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                number_of_5_9_classes: parseInt(values.middleSchoolClass, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                number_of_10_11_students: parseInt(values.highSchoolChild, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                number_of_10_11_classes: parseInt(values.highSchoolClass, 10) || undefined, // Внимание: возможно, классы и ученики перепутаны
                amount_of_family: parseInt(values.familyNumber, 10) || undefined,
                amount_of_parents: parseInt(values.parentsNumber, 10) || undefined,
                all_pedagog_number: parseInt(values.teachersNumber, 10) || undefined,
                pedagog_sheber: parseInt(values.pedagogSheber, 10) || undefined,
                pedagog_zertteushy: parseInt(values.pedagogZertteushi, 10) || undefined,
                pedagog_sarapshy: parseInt(values.pedagogSarapshy, 10) || undefined,
                pedagog_moderator: parseInt(values.pedagogModerator, 10) || undefined,
                pedagog: parseInt(values.pedagog, 10) || undefined,
                pedagog_stazher: parseInt(values.pedagogTagylymdamashy, 10) || undefined,
                pedagog_zhogary: parseInt(values.pedagogHigh, 10) || undefined,
                pedagog_1sanat: parseInt(values.sanat1, 10) || undefined,
                pedagog_2sanat: parseInt(values.sanat2, 10) || undefined,
                pedagog_sanat_zhok: parseInt(values.sanatZhok, 10) || undefined,
                school_history: values.history,
            }
        ;
        if(schoolPassport?.length === 0) {
            await instance
                .post(
                    "https://bilimge.kz/admins/api/schoolpasport/",
                    data,
                    {
                        headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                        },
                    },
                )
                .then(async (res) => {
                    if (res) {
                        const formData = new FormData();

                        formData.append("photo", photo ? photo : "");
                        formData.append("id", String((res as any).id));

                        try {
                            const uploadPhotoResponse = await instance.post(
                                "https://bilimge.kz/admins/api/schoolpasport/upload_photo/",
                                formData,
                                {
                                    headers: {
                                        Authorization: `Token ${getTokenInLocalStorage()}`,
                                        "Content-Type": "multipart/form-data",
                                    },
                                },
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }else {
            await instance
                .put(
                    `https://bilimge.kz/admins/api/schoolpasport/${schoolPassport?.[0]?.id}/`,
                    data,
                    {
                        headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                        },
                    },
                )
                .then(async (res) => {
                    if (res) {
                        if(photo) {
                            console.log(photo)

                            const formData = new FormData();

                            formData.append("photo", photo ? photo : "");
                            formData.append("id", String((res as any).id));

                            try {
                                const uploadPhotoResponse = await instance.put(
                                    "https://bilimge.kz/admins/api/schoolpasport/upload_photo/",
                                    formData,
                                    {
                                        headers: {
                                            Authorization: `Token ${getTokenInLocalStorage()}`,
                                            "Content-Type": "multipart/form-data",
                                        },
                                    },
                                );
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
  });

    useEffect(() => {
        async function fetchData() {
            if (schoolPassport && schoolPassport.length > 0) {
                formik.resetForm({
                    values: {
                        school_name: schoolPassport?.[0]?.school_name || "",
                        year:  `${schoolPassport?.[0]?.established || ""}`,
                        school_address: schoolPassport?.[0]?.school_address || "",
                        childNumber: `${schoolPassport?.[0]?.amount_of_children || ""}`,
                        classComplect: `${schoolPassport?.[0]?.number_of_classes || ""}`,
                        boyNumber: `${schoolPassport?.[0]?.ul_sany || ""}`,
                        girlNumber: `${schoolPassport?.[0]?.kiz_sany || ""}`,
                        familyNumber: `${schoolPassport?.[0]?.amount_of_family || ""}`,
                        parentsNumber: `${schoolPassport?.[0]?.amount_of_parents || ""}`,
                        language: `${schoolPassport?.[0]?.school_lang || ""}`,
                        status: `${schoolPassport?.[0]?.status || ""}`,
                        capacity: `${schoolPassport?.[0]?.vmestimost || ""}`,
                        actualNumber: `${schoolPassport?.[0]?.number_of_students || ""}`,
                        preparatoryClassNumber: `${schoolPassport?.[0]?.dayarlyk_class_number || ""}`,
                        preparatoryChildNumber: `${schoolPassport?.[0]?.dayarlyk_student_number || ""}`,
                        elementarySchoolClass: `${schoolPassport?.[0]?.number_of_1_4_classes || ""}`,
                        elementarySchoolChild: `${schoolPassport?.[0]?.number_of_1_4_students || ""}`,
                        middleSchoolClass: `${schoolPassport?.[0]?.number_of_5_9_classes || ""}`,
                        middleSchoolChild: `${schoolPassport?.[0]?.number_of_5_9_students || ""}`,
                        highSchoolClass: `${schoolPassport?.[0]?.number_of_10_11_classes || ""}`,
                        highSchoolChild: `${schoolPassport?.[0]?.number_of_10_11_students || ""}`,
                        teachersNumber: `${schoolPassport?.[0]?.all_pedagog_number || ""}`,
                        pedagogSheber: `${schoolPassport?.[0]?.pedagog_sheber || ""}`,
                        pedagogZertteushi: `${schoolPassport?.[0]?.pedagog_zertteushy || ""}`,
                        pedagogSarapshy: `${schoolPassport?.[0]?.pedagog_sarapshy || ""}`,
                        pedagogModerator: `${schoolPassport?.[0]?.pedagog_moderator || ""}`,
                        pedagog: `${schoolPassport?.[0]?.pedagog || ""}`,
                        pedagogTagylymdamashy: `${schoolPassport?.[0]?.pedagog_stazher || ""}`,
                        pedagogHigh: `${schoolPassport?.[0]?.pedagog_zhogary || ""}`,
                        sanat1: `${schoolPassport?.[0]?.pedagog_1sanat || ""}`,
                        sanat2: `${schoolPassport?.[0]?.pedagog_2sanat || ""}`,
                        sanatZhok: `${schoolPassport?.[0]?.pedagog_sanat_zhok || ""}`,
                        history: `${schoolPassport?.[0]?.school_history || ""}`
                    },
                });
                const passport = await urlToFile(schoolPassport?.[0]?.photo);
                setPhoto(passport);
            }
        }
        fetchData();
    }, [schoolPassport]);

    const handleDelete = async () => {
        await instance
            .delete(`https://www.bilimge.kz/admins/api/schoolpasport/${schoolPassport?.[0]?.id}/`, {
                headers: {
                    Authorization: `Token ${getTokenInLocalStorage()}`,
                },
            })
            .then((res) => {
                console.log("Good")
            })
            .catch((e) => console.log(e));
        dispatch(getSchoolPassportThunk());
        onDeleteModalClose();
    };


  return (
      <>
      {showDeleteModal && <DeleteModal onClose={onDeleteModalClose} handleDelete={handleDelete} />}
      <div className="main_table-modal">
        <form onSubmit={formik.handleSubmit}>
          <div className="main_table-modal_flex" style={{gap: "1.6rem"}}>
            <div className="main_table-modal_upload">
              <div className="login_forms-label_pink">Фото *</div>
                {
                    photo ? (
                        <div className="file-item">
                            <div className="file-info">
                                <p>{photo?.name}</p>
                            </div>
                            <div className="file-actions">
                                <MdClear onClick={() => {
                                    setPhoto(null);
                                }}/>
                            </div>
                        </div>
                    ) : (
                        <Input
                            type="file"
                            name="photo"
                            onChange={(event) => {
                                return setPhoto(event?.target?.files?.[0]);
                            }}
                            accept=".png, .jpg, .jpeg, .svg"
                        />
                    )
                }

                <div style={{marginTop: "2.7rem"}}>
                <div className="login_forms-label_pink">Құрылған жылы *</div>
                {formik.touched.year && formik.errors.year ? (
                    <div style={{color: "red"}}>{formik.errors.year}</div>
                ) : null}
                <Input
                    name={"year"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.year}
                    style={{
                      borderColor:
                          formik.touched.year && formik.errors.year
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>
            </div>

            <div className="main_table-modal_forms">
              <div className="forms">
                <div className="login_forms-label_pink">Мектеп аты *</div>
                  {formik.touched.school_name && formik.errors.school_name ? (
                      <div style={{color: "red"}}>{formik.errors.school_name}</div>
                  ) : null}
                  <Input
                      name={"school_name"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.school_name}
                      style={{
                          borderColor:
                              formik.touched.school_name && formik.errors.school_name
                                  ? "red"
                                  : "#c1bbeb",
                      }}
                  />
              </div>

              <div className="forms">
                <div className="login_forms-label_pink">Адрес *</div>

                {formik.touched.school_address && formik.errors.school_address ? (
                    <div style={{color: "red"}}>{formik.errors.school_address}</div>
                ) : null}
                <TextArea
                    name={"school_address"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.school_address}
                    style={{
                      borderColor:
                          formik.touched.school_address && formik.errors.school_address
                              ? "red"
                              : "#c1bbeb",
                    }}
                    maxLength={2000}
                />

                  <div className="length">
                      {typeof formik.values?.school_address === 'string' && formik.values?.school_address.length}/2000
                  </div>
              </div>
            </div>
          </div>

            <div
                className="forms flex"
                style={{gap: "2.4rem", marginTop: "2.4rem", alignItems: "flex-start"}}
          >
            {/* 1 */}

            <div style={{width: "33.33333%"}}>
              <div className="login_forms-label_pink" style={{color: "#E1000E"}}>
                Мектеп төлқұжаты
              </div>
              <div className="forms school_table">
                <div className="login_forms-label_pink">Жалпы бала саны *</div>
                {formik.touched.childNumber && formik.errors.childNumber ? (
                    <div style={{color: "red"}}>{formik.errors.childNumber}</div>
                ) : null}
                <Input
                    name={"childNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.childNumber}
                    style={{
                      borderColor:
                          formik.touched.childNumber && formik.errors.childNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Ұлдың саны *</div>
                {formik.touched.boyNumber && formik.errors.boyNumber ? (
                    <div style={{color: "red"}}>{formik.errors.boyNumber}</div>
                ) : null}
                <Input
                    name={"boyNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.boyNumber}
                    style={{
                      borderColor:
                          formik.touched.boyNumber && formik.errors.boyNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Қыздың саны *</div>

                {formik.touched.girlNumber && formik.errors.girlNumber ? (
                    <div style={{color: "red"}}>{formik.errors.girlNumber}</div>
                ) : null}
                <Input
                    name={"girlNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.girlNumber}
                    style={{
                      borderColor:
                          formik.touched.girlNumber && formik.errors.girlNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Отбасы саны *</div>
                {formik.touched.familyNumber && formik.errors.familyNumber ? (
                    <div style={{color: "red"}}>{formik.errors.familyNumber}</div>
                ) : null}
                <Input
                    name={"familyNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.familyNumber}
                    style={{
                      borderColor:
                          formik.touched.familyNumber && formik.errors.familyNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Ата-ана саны *</div>
                {formik.touched.parentsNumber && formik.errors.parentsNumber ? (
                    <div style={{color: "red"}}>{formik.errors.parentsNumber}</div>
                ) : null}
                <Input
                    name={"parentsNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentsNumber}
                    style={{
                      borderColor:
                          formik.touched.parentsNumber && formik.errors.parentsNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>
            </div>

            {/* 2 */}

            <div style={{width: "33.33333%"}}>
              <div className="login_forms-label_pink" style={{color: "#E1000E"}}>
                Жалпы сынып-комплект
              </div>
              <div className="forms school_table">
                <div className="login_forms-label_pink">Жалпы сынып комплект *</div>
                {formik.touched.classComplect && formik.errors.classComplect ? (
                    <div style={{color: "red"}}>{formik.errors.classComplect}</div>
                ) : null}
                <Input
                    name={"classComplect"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.classComplect}
                    style={{
                      borderColor:
                          formik.touched.classComplect && formik.errors.classComplect
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Оқыту тілі *</div>
                {formik.touched.language && formik.errors.language ? (
                    <div style={{color: "red"}}>{formik.errors.language}</div>
                ) : null}
                <Input
                    name={"language"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language}
                    style={{
                      borderColor:
                          formik.touched.language && formik.errors.language
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Статусы *</div>
                {formik.touched.status && formik.errors.status ? (
                    <div style={{color: "red"}}>{formik.errors.status}</div>
                ) : null}
                <Input
                    name={"status"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    style={{
                      borderColor:
                          formik.touched.status && formik.errors.status
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Сыйымдылығы *</div>
                {formik.touched.capacity && formik.errors.capacity ? (
                    <div style={{color: "red"}}>{formik.errors.capacity}</div>
                ) : null}
                <Input
                    name={"capacity"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.capacity}
                    style={{
                      borderColor:
                          formik.touched.capacity && formik.errors.capacity
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>

              <div className="forms school_table">
                <div className="login_forms-label_pink">Нақты оқитыны *</div>
                {formik.touched.actualNumber && formik.errors.actualNumber ? (
                    <div style={{color: "red"}}>{formik.errors.actualNumber}</div>
                ) : null}
                <Input
                    name={"actualNumber"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.actualNumber}
                    style={{
                      borderColor:
                          formik.touched.actualNumber && formik.errors.actualNumber
                              ? "red"
                              : "#c1bbeb",
                    }}
                />
              </div>
            </div>

            {/* 3 */}

            <div style={{width: "33.33333%"}}>
              <div className="login_forms-label_pink" style={{color: "#E1000E"}}>
                Даярлық сынып
              </div>
              <div className="flex school_table" style={{gap: "1.6rem"}}>
                <div className="forms">
                  <div className="login_forms-label_pink">Сынып саны</div>
                  {formik.touched.preparatoryClassNumber && formik.errors.preparatoryClassNumber ? (
                      <div style={{color: "red"}}>{formik.errors.preparatoryClassNumber}</div>
                  ) : null}
                  <Input
                      name={"preparatoryClassNumber"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preparatoryClassNumber}
                      style={{
                        borderColor:
                            formik.touched.preparatoryClassNumber && formik.errors.preparatoryClassNumber
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>

                <div className="forms">
                  <div className="login_forms-label_pink">Оқушы саны</div>
                  {formik.touched.preparatoryChildNumber && formik.errors.preparatoryChildNumber ? (
                      <div style={{color: "red"}}>{formik.errors.preparatoryChildNumber}</div>
                  ) : null}
                  <Input
                      name={"preparatoryChildNumber"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.preparatoryChildNumber}
                      style={{
                        borderColor:
                            formik.touched.preparatoryChildNumber && formik.errors.preparatoryChildNumber
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
              </div>
              <div
                  className="login_forms-label_pink"
                  style={{color: "#E1000E", marginBottom: "1.2rem"}}
              >
                1-4 сынып комплект
              </div>
              <div className="flex school_table" style={{gap: "1.6rem"}}>
                <div className="forms">
                  <div className="login_forms-label_pink">Сынып саны</div>
                  {formik.touched.elementarySchoolClass && formik.errors.elementarySchoolClass ? (
                      <div style={{color: "red"}}>{formik.errors.elementarySchoolClass}</div>
                  ) : null}
                  <Input
                      name={"elementarySchoolClass"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.elementarySchoolClass}
                      style={{
                        borderColor:
                            formik.touched.elementarySchoolClass && formik.errors.elementarySchoolClass
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>

                <div className="forms">
                  <div className="login_forms-label_pink">Оқушы саны</div>
                  {formik.touched.elementarySchoolChild && formik.errors.elementarySchoolChild ? (
                      <div style={{color: "red"}}>{formik.errors.elementarySchoolChild}</div>
                  ) : null}
                  <Input
                      name={"elementarySchoolChild"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.elementarySchoolChild}
                      style={{
                        borderColor:
                            formik.touched.elementarySchoolChild && formik.errors.elementarySchoolChild
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
              </div>
              <div
                  className="login_forms-label_pink"
                  style={{color: "#E1000E", marginBottom: "1.2rem"}}
              >
                5-9 сынып комплект
              </div>
              <div className="flex school_table" style={{gap: "1.6rem"}}>
                <div className="forms">
                  <div className="login_forms-label_pink">Сынып саны</div>
                  {formik.touched.middleSchoolClass && formik.errors.middleSchoolClass ? (
                      <div style={{color: "red"}}>{formik.errors.middleSchoolClass}</div>
                  ) : null}
                  <Input
                      name={"middleSchoolClass"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.middleSchoolClass}
                      style={{
                        borderColor:
                            formik.touched.middleSchoolClass && formik.errors.middleSchoolClass
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>

                <div className="forms">
                  <div className="login_forms-label_pink">Оқушы саны</div>
                  {formik.touched.middleSchoolChild && formik.errors.middleSchoolChild ? (
                      <div style={{color: "red"}}>{formik.errors.middleSchoolChild}</div>
                  ) : null}
                  <Input
                      name={"middleSchoolChild"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.middleSchoolChild}
                      style={{
                        borderColor:
                            formik.touched.middleSchoolChild && formik.errors.middleSchoolChild
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
              </div>
              <div
                  className="login_forms-label_pink"
                  style={{color: "#E1000E", marginBottom: "1.2rem"}}
              >
                10-11 сынып комплект
              </div>
              <div className="flex school_table" style={{gap: "1.6rem"}}>
                <div className="forms">
                  <div className="login_forms-label_pink">Сынып саны</div>
                  {formik.touched.highSchoolClass && formik.errors.highSchoolClass ? (
                      <div style={{color: "red"}}>{formik.errors.highSchoolClass}</div>
                  ) : null}
                  <Input
                      name={"highSchoolClass"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.highSchoolClass}
                      style={{
                        borderColor:
                            formik.touched.highSchoolClass && formik.errors.highSchoolClass
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>

                <div className="forms">
                  <div className="login_forms-label_pink">Оқушы саны</div>
                  {formik.touched.highSchoolChild && formik.errors.highSchoolChild ? (
                      <div style={{color: "red"}}>{formik.errors.highSchoolChild}</div>
                  ) : null}
                  <Input
                      name={"highSchoolChild"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.highSchoolChild}
                      style={{
                        borderColor:
                            formik.touched.highSchoolChild && formik.errors.highSchoolChild
                                ? "red"
                                : "#c1bbeb",
                      }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form flex" style={{justifyContent: "flex-start"}}>
            <div
                className="login_forms-label_pink"
                style={{color: "#E1000E", marginBottom: "1.2rem", width: "30%"}}
            >
              Педагогтардың жалпы саны
            </div>
            {formik.touched.teachersNumber && formik.errors.teachersNumber ? (
                <div style={{color: "red"}}>{formik.errors.teachersNumber}</div>
            ) : null}
            <Input
                name={"teachersNumber"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.teachersNumber}
                style={{
                  borderColor:
                      formik.touched.teachersNumber && formik.errors.teachersNumber
                          ? "red"
                          : "#c1bbeb",
                }}
            />
          </div>

          <div className="form flex" style={{marginTop: "2.4rem", gap: "1.6rem"}}>
            <div className="form">
              <div className="login_forms-label_pink">Педагог-шебер *</div>
              {formik.touched.pedagogSheber && formik.errors.pedagogSheber ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogSheber}</div>
              ) : null}
              <Input
                  name={"pedagogSheber"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogSheber}
                  style={{
                    borderColor:
                        formik.touched.pedagogSheber && formik.errors.pedagogSheber
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Педагог-зерттеуші *</div>
              {formik.touched.pedagogZertteushi && formik.errors.pedagogZertteushi ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogSheber}</div>
              ) : null}
              <Input
                  name={"pedagogZertteushi"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogZertteushi}
                  style={{
                    borderColor:
                        formik.touched.pedagogZertteushi && formik.errors.pedagogZertteushi
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Педагог-сарапшы *</div>
              {formik.touched.pedagogSarapshy && formik.errors.pedagogSarapshy ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogSarapshy}</div>
              ) : null}
              <Input
                  name={"pedagogSarapshy"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogSarapshy}
                  style={{
                    borderColor:
                        formik.touched.pedagogSarapshy && formik.errors.pedagogSarapshy
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Педагог-модератор *</div>
              {formik.touched.pedagogModerator && formik.errors.pedagogModerator ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogModerator}</div>
              ) : null}
              <Input
                  name={"pedagogModerator"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogModerator}
                  style={{
                    borderColor:
                        formik.touched.pedagogModerator && formik.errors.pedagogModerator
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>
          </div>

          <div
              className="form flex"
              style={{
                marginTop: "2.4rem",
                gap: "1.6rem",
                justifyContent: "flex-start",
              }}
          >
            <div className="form">
              <div className="login_forms-label_pink">Педагог *</div>
              {formik.touched.pedagog && formik.errors.pedagog ? (
                  <div style={{color: "red"}}>{formik.errors.pedagog}</div>
              ) : null}
              <Input
                  name={"pedagog"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagog}
                  style={{
                    borderColor:
                        formik.touched.pedagog && formik.errors.pedagog
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Педагог-тағылымдамашы *</div>
              {formik.touched.pedagogTagylymdamashy && formik.errors.pedagogTagylymdamashy ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogTagylymdamashy}</div>
              ) : null}
              <Input
                  name={"pedagogTagylymdamashy"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogTagylymdamashy}
                  style={{
                    borderColor:
                        formik.touched.pedagogTagylymdamashy && formik.errors.pedagogTagylymdamashy
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Жоғары *</div>
              {formik.touched.pedagogHigh && formik.errors.pedagogHigh ? (
                  <div style={{color: "red"}}>{formik.errors.pedagogHigh}</div>
              ) : null}
              <Input
                  name={"pedagogHigh"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pedagogHigh}
                  style={{
                    borderColor:
                        formik.touched.pedagogHigh && formik.errors.pedagogHigh
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>
          </div>

          <div
              className="form flex"
              style={{
                marginTop: "2.4rem",
                gap: "1.6rem",
                justifyContent: "flex-start",
              }}
          >
            <div className="form">
              <div className="login_forms-label_pink">I санатты*</div>
              {formik.touched.sanat1 && formik.errors.sanat1 ? (
                  <div style={{color: "red"}}>{formik.errors.sanat1}</div>
              ) : null}
              <Input
                  name={"sanat1"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sanat1}
                  style={{
                    borderColor:
                        formik.touched.sanat1 && formik.errors.sanat1
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">II санатты*</div>
              {formik.touched.sanat2 && formik.errors.sanat2 ? (
                  <div style={{color: "red"}}>{formik.errors.sanat2}</div>
              ) : null}
              <Input
                  name={"sanat2"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sanat2}
                  style={{
                    borderColor:
                        formik.touched.sanat2 && formik.errors.sanat2
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>

            <div className="form">
              <div className="login_forms-label_pink">Санаты жоқ *</div>
              {formik.touched.sanatZhok && formik.errors.sanatZhok ? (
                  <div style={{color: "red"}}>{formik.errors.sanatZhok}</div>
              ) : null}
              <Input
                  name={"sanatZhok"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sanatZhok}
                  style={{
                    borderColor:
                        formik.touched.sanatZhok && formik.errors.sanatZhok
                            ? "red"
                            : "#c1bbeb",
                  }}
              />
            </div>
          </div>

          <div className="forms" style={{marginBlock: "1.6rem", width: "80%"}}>
            <div className="login_forms-label_pink">Мектеп тарихы *</div>

            {formik.touched.history && formik.errors.history ? (
                <div style={{color: "red"}}>{formik.errors.history}</div>
            ) : null}
            <TextArea
                name={"history"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.history}
                style={{
                  borderColor:
                      formik.touched.history && formik.errors.history
                          ? "red"
                          : "#c1bbeb",
                }}
                maxLength={2000}
            />

              <div className="length">
                  {typeof formik.values?.history === 'string' && formik.values?.history.length}/2000
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
                    onClick={showDelete}
                    type="button"
                >
                    Удалить
                </Button>
            <Button background="#27AE60" style={{width: "auto"}} type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
      </>
);
};

export default SchoolTableBlock3;
