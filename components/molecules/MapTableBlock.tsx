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
    mapId?: IMap[];
}

const MapTableBlock: FC<IProps> = ({ onReject, getId, mapId, onEdit }) => {
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

    const [map, setMap] = useState<File>();
    const [flat1, setFlat1] = useState<File>();
    const [flat2, setFlat2] = useState<File>();
    const [flat3, setFlat3] = useState<File>();
    const [flat4, setFlat4] = useState<File>();
    const [flat5, setFlat5] = useState<File>();


    const formik = useFormik({
        initialValues: {
        },
        validationSchema: Yup.object({
        }),
        onSubmit: async (values) => {
            console.log(map)
            console.log(flat1)
            if (mapId?.[0]) {
                await instance
                    .post(
                        "https://www.bilimge.kz/admins/api/schoolmap/",
                        {
                            map: map,
                            flat1: flat1,
                            flat2: flat2,
                            flat3: flat3,
                            flat4: flat4,
                            flat5: flat5,
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
                        `https://www.bilimge.kz/admins/api/schoolmap/1/`,
                        {
                            map: map,
                            flat1: flat1,
                            flat2: flat2,
                            flat3: flat3,
                            flat4: flat4,
                            flat5: flat5,
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


    function onDelete() {
        setFlat1(undefined);
        setFlat2(undefined);
        setFlat3(undefined);
        setFlat4(undefined);
        setFlat5(undefined);

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
                                    <div className="login_forms-label_pink">Карта</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setMap(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"
                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">1 этаж</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setFlat1(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"
                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">2 этаж</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setFlat2(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">3 этаж</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setFlat3(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"

                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">4 этаж</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setFlat4(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"
                                    />
                                </div>
                                <div className="flex">
                                    <div className="login_forms-label_pink">5 этаж</div>
                                    <Input style={{width: "80%", marginBottom: "1%"}} type="file" name="photo" onChange={(event) => {
                                        return setFlat5(event?.target?.files?.[0]);
                                    }}
                                           accept=".svg"
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

export default MapTableBlock;
