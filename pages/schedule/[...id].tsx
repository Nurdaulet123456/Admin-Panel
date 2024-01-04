import { useRouter } from "next/router";
import Tabs from "@/components/molecules/Tabs/Tabs";
import TabsClass from "@/components/molecules/Tabs/TabsClass";
import ScheduleTable from "@/components/organisms/ScheduleTable";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import { ArrowLeftIcons } from "@/components/atoms/Icons";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import {
  getIARingThunk,
  getScheduleThunk,
} from "@/store/thunks/available.thunk";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";

const ScheduleComponents = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const sch = useTypedSelector((state) => state.ia.sch);
  const iaring = useTypedSelector((state) => state.ia.iaring);

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
    }[]
  >([]);
  const [copiedData, setCopiedData] = useState<any[]>([]);

  const [selectedCellsPaste, setSelectedCellsPaste] = useState<
    {
      day?: any;
      start_time?: any;
      end_time?: any;
    }[]
  >([]);

  const handleSelectClick = () => {
    setSelectMode(!selectMode);
    setSelectModePaste(false);
  };

  const handleCheckboxClick = (
    day: any,
    start_time: any,
    end_time: any,
    teacherId: any,
    ringId: any,
    classlId: any,
    subjectId: any,
    classroomId: any,
    typezId: any
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
    };

    if (selectMode) {
      setSelectedCells([]);
    }

    const isSelected = selectedCellsPaste.some(
      (selectedCell) =>
        selectedCell.day === cell.day &&
        selectedCell.start_time === cell.start_time &&
        selectedCell.end_time === cell.end_time
    );

    if (isSelected) {
      const updatedSelection = selectedCellsPaste.filter(
        (selectedCell) =>
          selectedCell.day !== cell.day &&
          selectedCell.start_time !== cell.start_time &&
          selectedCell.end_time !== cell.end_time
      );
      setSelectedCells(updatedSelection);
    } else {
      setSelectedCells([cell]);
    }
  };

  const handleCheckboxClickPaste = (
    day: any,
    start_time: any,
    end_time: any
  ) => {
    const cell = {
      day,
      start_time,
      end_time,
    };

    if (selectModePaste) {
      setSelectedCellsPaste([]);
    }

    const isSelected = selectedCellsPaste.some(
      (selectedCell) =>
        selectedCell.day === cell.day &&
        selectedCell.start_time === cell.start_time &&
        selectedCell.end_time === cell.end_time
    );

    if (isSelected) {
      const updatedSelection = selectedCellsPaste.filter(
        (selectedCell) =>
          selectedCell.day !== cell.day &&
          selectedCell.start_time !== cell.start_time &&
          selectedCell.end_time !== cell.end_time
      );
      setSelectedCellsPaste(updatedSelection);
    } else {
      setSelectedCellsPaste([cell]);
    }
  };

  const handleCopyClick = () => {
    setCopiedData([...selectedCells]);

    setSelectModePaste(true);
  };

  const handlePasteClick = async () => {
    await instance
      .post(
        "/api/schedule/",
        {
          week_day: getWeekDayNumber(selectedCellsPaste[0]?.day),
          teacher: copiedData[0]?.teacherId,
          ring: iaring && iaring[0]?.id,
          classl: copiedData[0]?.classlId,
          subject: copiedData[0]?.subjectId,
          classroom: copiedData[0]?.classroomId,
          typez: copiedData[0]?.typezId,
        },
        {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          dispatch(getScheduleThunk());
          setSelectMode(false);
          setSelectModePaste(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sch) {
      dispatch(getScheduleThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedCellsPaste && iaring) {
      dispatch(getIARingThunk(selectedCellsPaste[0]?.start_time));
    }
  }, [selectedCellsPaste, dispatch]);

  return (
    <MainLayouts>
      {router.asPath !== "/schedule/1" && (
        <div
          className="flex"
          style={{
            justifyContent: "flex-start",
            gap: "3rem",
            marginBottom: "3.2rem",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/schedule/1")}
          >
            <ArrowLeftIcons />
          </div>
          <div className="class_name">
            Класс:{" "}
            {decodeURIComponent(router.asPath.split("/").at(-1) as string)}
          </div>
        </div>
      )}

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
          <Tabs link="schedule" tabs={tabs} />
        </div>

        {router.asPath !== "/schedule/1" && (
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
            <Button
              background="#CACACA"
              color="#645C5C"
              radius="14px"
              onClick={handleCopyClick}
              disabled={!selectMode || selectedCells.length === 0}
            >
              Копировать
            </Button>
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
        )}
      </div>

      {router.asPath === "/schedule/1" ? (
        <TabsClass />
      ) : (
        <ScheduleTable
          schedule={sch && sch}
          selectModePaste={selectModePaste}
          selectMode={selectMode}
          selectedCellsPaste={selectedCellsPaste}
          selectedCells={selectedCells}
          handleCheckboxClick={handleCheckboxClick}
          handleCheckboxClickPaste={handleCheckboxClickPaste}
        />
      )}
    </MainLayouts>
  );
};

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

export default ScheduleComponents;
