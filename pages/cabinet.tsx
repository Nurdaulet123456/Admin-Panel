import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import CabinetTableBlock from "@/components/molecules/CabinetTableBlock";
import CabinetTable from "@/components/organisms/CabinetTable";
import MainLayouts from "@/layouts/MainLayouts";
import {
  getClassRoomIdThunk,
  getClassRoomThunk,
} from "@/store/thunks/schoolnfo.thunk";

const CabinetPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const cabinet = useTypedSelector((state) => state.system.classroom);
  const cabinetid = useTypedSelector((state) => state.system.classroomid);

  useEffect(() => {
    if (cabinet) {
      dispatch(getClassRoomThunk());
    }
  }, [dispatch]);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getClassRoomIdThunk(id));
    }
  };

  return (
    <MainLayouts>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1.6rem",
        }}
      >
        <Button
          background="#27AE60"
          radius="14px"
          style={{
            width: "auto",
            display: "flex",
            alignItems: "center",
            gap: ".8rem",
          }}
          onClick={handleAddButtonClick}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {(showActive || editActive) && (
        <CabinetTableBlock onReject={setShowActive} cabinetid={cabinetid} getId={getId} setEditActive={setEditActive}/>
      )}

      <CabinetTable cabinet={cabinet} handleClickGetId={handleClickGetId} />
    </MainLayouts>
  );
};

export default CabinetPage;
