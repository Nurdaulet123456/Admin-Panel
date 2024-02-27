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
import {getSchoolAdminThunk, getSchoolDirectorThunk} from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import {ISchoolAdmin, ISchoolDirector} from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";
import {getSchoolSportThunk} from "@/store/thunks/pride.thunk";
import {get} from "immutable";
import {MdClear} from "react-icons/md";

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>;
    onEdit?: Dispatch<SetStateAction<boolean>>;
    directorId?: ISchoolDirector[];
    getId?: number;
}

const SchoolTableBlock: FC<IProps> = ({
                                           onReject,
                                           onEdit,
                                           directorId,
                                           getId,
                                       }) => {
    const dispatch = useAppDispatch();
    const [photo, setPhoto] = useState<File | null>()
    const [photoId, setPhotoId] = useState<string | null>()

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
            name: "",
            email: "",
            tel: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Обязательно*"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("director_name", values.name);
            formData.append("phone_number", values.tel);
            formData.append("email", values.email);
            photo && formData.append("director_photo", photo);
            console.log(directorId)
            if (directorId && directorId.length === 0) {
                await instance
                    .post("https://bilimge.kz/admins/api/school_director/", formData, {
                        headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res) {
                            dispatch(getSchoolDirectorThunk());
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
                    .put(`https://bilimge.kz/admins/api/school_director/1/`, formData, {
                        headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((res) => {
                        if (res) {
                            dispatch(getSchoolDirectorThunk());
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
        if (directorId) {
            formik.resetForm({
                values: {
                    name: directorId?.[0]?.director_name || "",
                    email: directorId?.[0]?.email || "",
                    tel: directorId?.[0]?.phone_number || "",
                },
            });
        }
        setPhotoId(directorId?.[0]?.director_photo)
    }, [directorId, getId]);


    function onDelete() {
        formik.resetForm({
            values: {
                name: "",
                email: "",
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
                                ) : ( photoId ? <div className="file-item">
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
                                <div className="login_forms-label_pink">Почта *</div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={{color: "red"}}>{formik.errors.email}</div>
                                ) : null}
                                <Input
                                    name={"email"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    style={{
                                        borderColor:
                                            formik.touched.email && formik.errors.email
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

export default SchoolTableBlock;
