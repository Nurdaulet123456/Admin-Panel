import { useRouter } from "next/router";
import Tabs from "@/components/molecules/Tabs/Tabs";
import TabsClass from "@/components/molecules/Tabs/TabsClass";
import ScheduleTable from "@/components/organisms/ScheduleTable";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import {ArrowLeftIcons, LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction, useCallback,
    useEffect,
    useState,
} from "react";
import {
    getDopScheduleThunk, getIADopRingThunk,
    getIARingThunk,
    getScheduleThunk,
} from "@/store/thunks/available.thunk";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";
import {getMapThunk} from "@/store/thunks/schoolnfo.thunk";
import {useModalLogic} from "@/hooks/useModalLogic";
import DeleteModal from "@/components/modals/DeleteModal";
import ScheduleTable1 from "@/components/organisms/ScheduleTables/ScheduleTable1";
import ScheduleTableBlock from "@/components/molecules/ScheduleBlocks/ScheduleTableBlock";

const ScheduleComponents = () => {
  const router = useRouter();
    const [showActive, setShowActive] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number | null>();
    const handleAddButtonClick = () => {
        setEditActive(false);
        setShowActive(!showActive);
        setId(null);
    };

    return (
    <MainLayouts>
        {router.query.id?.[0] === "1" && (
            <>
                {
                    router.asPath !== "/schedule/1" ? (
                        <>
                            <HeaderSchedule classL={true}/>
                            <Tables isOsnova={true}/>
                            <Tables isOsnova={false}/>
                        </>
                    ) : (
                        <>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                marginBottom: "1.6rem",
                                gap: "2.4rem",
                            }}>
                                <Tabs link="schedule" tabs={tabs}/>
                            </div>
                            <TabsClass/>
                        </>
                    )
                }
            </>
        )
        }
        {router.query.id?.[0] === "2" && (
            <>
                <HeaderSchedule/>
                <hr/>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1.6rem",
                    gap: "2.4rem",
            }}>
                <Tabs link="schedule/2" tabs={autoTabs}/>
            </div>
                {
                    router.asPath === "/schedule/2/1" && (
                        <>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: "1.6rem",
                                }}
                            >
                                <Button
                                    background={showActive || editActive ? "#CACACA" : "#27AE60"}
                                    radius="14px"
                                    style={{
                                        width: "auto",
                                    }}
                                    onClick={handleAddButtonClick}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: ".8rem",
                                        }}
                                    >
                                        {showActive || editActive ? <LogoutIcons/> : <PlusIcons/>}
                                        {showActive || editActive ? "Закрыть" : "Добавить"}
                                    </div>
                                </Button>
                            </div>
                            {
                                (showActive || editActive) && <ScheduleTableBlock/>
                            }
                            <ScheduleTable1/>
                        </>
                    )
                }
            </>
        )}

    </MainLayouts>
    );
};

interface TablesProps {
    isOsnova?: boolean; // Опциональный пропс
};

const Tables: FC<TablesProps> = ({isOsnova}) => {
    console.log(isOsnova)
    const dispatch = useAppDispatch();
    const iaring = useTypedSelector((state) => state.ia.iaring);
    const iaDopRing = useTypedSelector((state) => state.ia.iaDopRing);

    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [selectModePaste, setSelectModePaste] = useState<boolean>(false);
    const [selectedCells, setSelectedCells] = useState<
        {
            day?: any;
            start_time?: any;
            end_time?: any;
            teacherId?: any;
            ringId?: any;
            classlId?: any;
            subjectId?: any;
            classroomId?: any;
            typezId?: any;
            id?:any;
        }[]
    >([]);
    const [copiedData, setCopiedData] = useState<any[]>([]);

    const [selectedCellsPaste, setSelectedCellsPaste] = useState<
        {
            day?: any;
            start_time?: any;
            end_time?: any;
            timeId?: any;
        }[]
    >([]);

    const handleSelectClick = () => {
        setSelectMode(!selectMode);
        setSelectModePaste(false);
        setCopiedData([]);
        setSelectedCells([]);
        setSelectedCellsPaste([]);
        setSelectedCheckboxId([]);
    };
    const [selectedCheckboxId, setSelectedCheckboxId] = useState<number[]>([]);
    const handleCheckboxClick = (
        day: any,
        start_time: any,
        end_time: any,
        teacherId: any,
        ringId: any,
        classlId: any,
        subjectId: any,
        classroomId: any,
        typezId: any,
        itemId: any,
        teacher2Id: any,
        subject2Id: any,
        classroom2Id: any,

    ) => {
        const cell = {
            day,
            start_time,
            end_time,
            teacherId,
            ringId,
            classlId,
            subjectId,
            classroomId,
            typezId,
            itemId,
            teacher2Id,
            subject2Id,
            classroom2Id,
        };

        if (selectMode) {
            setSelectedCells([]);
        }

        console.log(cell)

        const isSelected = selectedCells.some(
            (selectedCell) =>
                selectedCell.day === cell.day &&
                selectedCell.start_time === cell.start_time &&
                selectedCell.end_time === cell.end_time,
        );

        const isSelectedCheckbox = selectedCheckboxId?.some((checkbox) =>
                checkbox === itemId
        )

        if(isSelectedCheckbox) {
            const updatedCheckboxes = selectedCheckboxId?.filter((checkbox) =>
                checkbox !== itemId
            );
            setSelectedCheckboxId(updatedCheckboxes);
        }else {
            setSelectedCheckboxId([...selectedCheckboxId, itemId]);
        }

        if (isSelected) {
            const updatedSelection = selectedCells.filter(
                (selectedCell) =>
                    selectedCell.day !== cell.day ||
                    (selectedCell.start_time !== cell.start_time && selectedCell.end_time !== cell.end_time),
            );
            setSelectedCells(updatedSelection);
        } else {
            setSelectedCells([...selectedCells,cell]);
        }
    };

    const handleCheckboxClickPaste = (
        day: any,
        start_time: any,
        end_time: any,
        timeId?: any,
    ) => {
        const cell = {
            day,
            start_time,
            end_time,
            timeId,
        };

        if (selectModePaste) {
            setSelectedCellsPaste([]);
        }

        const isSelected = selectedCellsPaste.some(
            (selectedCell) =>
                selectedCell.day === cell.day &&
                selectedCell.start_time === cell.start_time &&
                selectedCell.end_time === cell.end_time,
        );

        if (isSelected) {
            const updatedSelection = selectedCellsPaste.filter(
                (selectedCell) =>
                    selectedCell.day !== cell.day &&
                    selectedCell.start_time !== cell.start_time &&
                    selectedCell.end_time !== cell.end_time,
            );
            setSelectedCellsPaste(updatedSelection);
        } else {
            setSelectedCellsPaste([...selectedCellsPaste, cell]);
        }
    };

    const {
        showDeleteModal,
        onDeleteModalClose,
        showDelete,
    } = useModalLogic();



    const handleDelete = async () => {
        const urlPost = isOsnova ? "https://bilimge.kz/admins/api/schedule/" : "https://bilimge.kz/admins/api/DopUrokApi/";
        for(const checkboxId of selectedCheckboxId) {
            await instance
                .delete(`${urlPost}${checkboxId}/`, {
                    headers: {
                        Authorization: `Token ${getTokenInLocalStorage()}`,
                    },
                })
                .then((res) => {
                    console.log("Good")
                })
                .catch((e) => console.log(e));
        }
        dispatch(getMapThunk());
        onDeleteModalClose();
        dispatch(getScheduleThunk());
        dispatch(getDopScheduleThunk());
        setSelectModePaste(false);
        setCopiedData([]);
        setSelectedCells([]);
        setSelectedCellsPaste([]);
        setSelectedCheckboxId([]);

    };


    const handleCopyClick = () => {
        setCopiedData([...selectedCells]);

        setSelectModePaste(true);
    };



    const handlePasteClick = async () => {
        const urlPost = isOsnova ? "https://bilimge.kz/admins/api/schedule/" : "https://bilimge.kz/admins/api/DopUrokApi/";
        for(const cell of selectedCellsPaste) {
            await instance
                .post(
                    urlPost,
                    {
                        week_day: getWeekDayNumber(cell.day),
                        teacher: copiedData[0]?.teacherId,
                        ring: cell?.timeId,
                        classl: copiedData[0]?.classlId,
                        subject: copiedData[0]?.subjectId,
                        classroom: copiedData[0]?.classroomId,
                        typez: copiedData[0]?.typezId,
                        teacher2: copiedData[0]?.teacher2Id,
                        subject2: copiedData[0]?.subject2Id,
                        classroom2: copiedData[0]?.classroom2Id,
                    },
                    {
                        headers: {
                            Authorization: `Token ${getTokenInLocalStorage()}`,
                        },
                    },
                )
                .then((res) => {
                    if (res) {
                        dispatch(getScheduleThunk());
                        dispatch(getDopScheduleThunk());
                        setSelectMode(false);
                        setSelectModePaste(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        dispatch(getScheduleThunk());
        dispatch(getDopScheduleThunk());
    }, [dispatch]);

    useEffect(() => {
        if (iaring) {
            dispatch(getIARingThunk());
        }
    }, [dispatch]);

    useEffect(() => {
        if (iaDopRing) {
            dispatch(getIADopRingThunk());
        }
    }, [dispatch]);
    console.log(getTokenInLocalStorage())
    return(
        <>
            {showDeleteModal && <DeleteModal onClose = {onDeleteModalClose} handleDelete={handleDelete}/>}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1.6rem",
                    gap: "2.4rem",
                }}
            >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1.6rem",
                    gap: "2.4rem",
                }}
            >
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1.6rem",
                    gap: "2.4rem",
                }}
            >
                <Button
                    background="#CACACA"
                    color="#645C5C"
                    radius="14px"
                    onClick={handleSelectClick}
                >
                    {selectMode ? "Отменить" : "Выбрать"}
                </Button>
                {
                    selectMode &&  <Button
                        background="#CACACA"
                        color="#645C5C"
                        radius="14px"
                        onClick={showDelete}
                        disabled={!selectMode || selectedCells.length === 0}
                    >
                        Удалить
                    </Button>
                }
                {
                    selectedCells.length == 1 && <Button
                        background="#CACACA"
                        color="#645C5C"
                        radius="14px"
                        onClick={handleCopyClick}
                        disabled={!selectMode}
                    >
                        Копировать
                    </Button>
                }

                <Button
                    background="#288220"
                    color="white"
                    radius="14px"
                    onClick={handlePasteClick}
                    disabled={!selectModePaste}
                >
                    Вставить
                </Button>
            </div>
            </div>
            <ScheduleTable
                selectModePaste={selectModePaste}
                selectMode={selectMode}
                selectedCellsPaste={selectedCellsPaste}
                selectedCells={selectedCells}
                handleCheckboxClick={handleCheckboxClick}
                handleCheckboxClickPaste={handleCheckboxClickPaste}
                iaring={isOsnova ? iaring : iaDopRing}
                selectedCheckboxId={selectedCheckboxId}
                isOsnova={isOsnova}
            />
        </>
    );
};

interface HeaderScheduleProps {
    classL? :boolean;
}

const HeaderSchedule:FC<HeaderScheduleProps> = ({classL}) => {
    const router = useRouter();
    return(
        <div
            className="flex"
            style={{
                justifyContent: "flex-start",
                gap: "3rem",
                marginBottom: "3.2rem",
            }}
        >
            <div
                style={{cursor: "pointer"}}
                onClick={() => {
                    router.push("/schedule/1");
                }}
            >
                <ArrowLeftIcons/>
            </div>
            {
                classL ? (
                    <div className="class_name">
                        Класс:{" "}
                        {decodeURIComponent(router.asPath.split("/").at(-1) as string)}
                    </div>
                ) : (
                    <div className="class_name">
                       Назад
                    </div>
                )
            }

        </div>
    )
}

const tabs: ITabs[] = [
    {
        id: 1,
        type: "Ручной",
    },

    {
        id: 2,
        type: "Автораспределение",
    },
];

const autoTabs: ITabs[] = [
    {
        id: 1,
        type: "Список"
    },
    {
        id: 2,
        type: "Автораспределение"
    },
    {
        id: 3,
        type: "Relations"
    }
]
export default ScheduleComponents;
