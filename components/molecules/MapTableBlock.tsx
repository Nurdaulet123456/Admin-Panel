import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, Select } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import {
    getTokenInLocalStorage,
    getWeekDayNumber,
    getWeekDayString,
} from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
    getClassRoomThunk,
    getMenuThunk,
} from "@/store/thunks/schoolnfo.thunk";
import {IMap, IMenu} from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { useFormik, useField, Formik, Form } from "formik";
import * as Yup from "yup";

interface IUpdateInput {
    name?: string;
    recipe?: string;
    exits: Record<string, string>;
}

interface IProps {
    onReject?: Dispatch<SetStateAction<boolean>>;
    onEdit?: Dispatch<SetStateAction<boolean>>;
    getId?: any;
    mapId?: IMap;
}

const MenuTableBlock: FC<IProps> = ({ onReject, getId, mapId, onEdit }) => {
    const [showActive, setShowActive] = useState<boolean>(false);
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
            flat: [
                    ""
            ]
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            if (!getId) {
                await instance
                    .post(
                        "https://www.bilimge.kz/admins/api/schoolmap/w",
                        {
                            flat1: values.flat[0],
                        },
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getMenuThunk());
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
                    .put(
                        `https://www.bilimge.kz/admins/api/schoolmap/${getId}/`,
                        {
                            flat1: values.flat[0],
                        },
                        {
                            headers: {
                                Authorization: `Token ${getTokenInLocalStorage()}`,
                            },
                        },
                    )
                    .then((res) => {
                        if (res) {
                            dispatch(getMenuThunk());
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
        },
    });

    useEffect(() => {
        if (mapId && getId) {
            formik.resetForm({
                values: {
                    flat: [
                        mapId.flat1 || "",
                        mapId.flat2 || "",
                        mapId.flat3 || "",
                        mapId.flat4 || "",
                        mapId.flat5 || "",
                    ]

                },
            });
        }
    }, [mapId, getId]);

    function onDelete() {
        formik.resetForm({
            values: {
                flat: [
                    ""
                ]
            },
        });
    }

    return (
        <>
            {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
            {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
            <form onSubmit={formik.handleSubmit}>
                <div className="main_table-modal">
                    <div className="main_table-modal_title">Карта школы</div>
                    <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
                        <div className="main_table-modal_forms">
                            <div className="forms">
                                <div className="flex">
                                    <div className="login_forms-label_pink">1 этаж</div>
                                    <Input type="file" name="photo" onChange={(event) => {
                                        console.log(event?.target?.files?.[0]);
                                        return formik.setFieldValue('photo', event?.target?.files?.[0]);
                                    }}
                                           accept=".png, .jpg, .jpeg, .svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">2 этаж</div>
                                    <Input type="file" name="photo" onChange={(event) => {
                                        console.log(event?.target?.files?.[0]);
                                        return formik.setFieldValue('photo', event?.target?.files?.[0]);
                                    }}
                                           accept=".png, .jpg, .jpeg, .svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">3 этаж</div>
                                    <Input type="file" name="photo" onChange={(event) => {
                                        console.log(event?.target?.files?.[0]);
                                        return formik.setFieldValue('photo', event?.target?.files?.[0]);
                                    }}
                                           accept=".png, .jpg, .jpeg, .svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">4 этаж</div>
                                    <Input type="file" name="photo" onChange={(event) => {
                                        console.log(event?.target?.files?.[0]);
                                        return formik.setFieldValue('photo', event?.target?.files?.[0]);
                                    }}
                                           accept=".png, .jpg, .jpeg, .svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">5 этаж</div>
                                    <Input type="file" name="photo" onChange={(event) => {
                                        console.log(event?.target?.files?.[0]);
                                        return formik.setFieldValue('photo', event?.target?.files?.[0]);
                                    }}
                                           accept=".png, .jpg, .jpeg, .svg"

                                    />
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
                                    type="button"
                                    onClick={onDelete}
                                >
                                    Удалить
                                </Button>
                                <Button
                                    background="#27AE60"
                                    style={{ width: "auto" }}
                                    type={"submit"}
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

const timeArr = [
    {
        id: 1,
        type: "Понедельник",
    },

    {
        id: 2,
        type: "Вторник",
    },

    {
        id: 3,
        type: "Среда",
    },

    {
        id: 4,
        type: "Четверг",
    },

    {
        id: 5,
        type: "Пятница",
    },

    {
        id: 6,
        type: "Суббота",
    },
];

export default MenuTableBlock;
