import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import CabinetTableBlock from "@/components/molecules/CabinetTableBlock";
import CabinetTable from "@/components/organisms/CabinetTable";
import MainLayouts from "@/layouts/MainLayouts";
import { getClassRoomThunk } from "@/store/thunks/schoolnfo.thunk";

const CabinetPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const dispatch = useAppDispatch()
  const cabinet = useTypedSelector(state => state.system.classroom)

  useEffect(() => {

    if (cabinet) {
      dispatch(getClassRoomThunk())
    }

  }, [dispatch])

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
          onClick={() => setShowActive(!showActive)}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {showActive && <CabinetTableBlock onReject={setShowActive}/>}

      <CabinetTable cabinet={cabinet}/>
    </MainLayouts>
  );
};

export default CabinetPage;
