import { useState } from "react";
import { useRouter } from "next/router";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import CallsTable from "@/components/organisms/CallsTable/CallsTable1";
import CallsTable2 from "@/components/organisms/CallsTable/CallsTable2";
import CallsTableBlock1 from "@/components/molecules/Calls/CallsTableBlock1";
import CallsTableBlock2 from "@/components/molecules/Calls/CallsTableBlock2";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getDopIdThunk, getOSIdThunk } from "@/store/thunks/pride.thunk";

const CallsComponents = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const router = useRouter();

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const dopid = useTypedSelector((state) => state.pride.dopid);
  const osid = useTypedSelector((state) => state.pride.osid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetIdDop = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getDopIdThunk(id));
    }
  };

  const handleClickGetIdOS = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getOSIdThunk(id));
    }
  };

  return (
    <MainLayouts>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.6rem",
        }}
      >
        <div style={{ width: "100%", display: "flex", gap: "2.4rem" }}>
          <Tabs link="calls" tabs={tabs} />
        </div>
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

      {(showActive || editActive) && router.query.id === "1" && (
        <CallsTableBlock1 onReject={setShowActive} osid={osid} onEdit={setEditActive}/>
      )}
      {(showActive || editActive) && router.query.id === "2" && (
        <CallsTableBlock2 onReject={setShowActive} dopid={dopid} getId={getId} onEdit={setEditActive}/>
      )}

      {router.query.id === "1" && <CallsTable handleClickGetIdOS={handleClickGetIdOS}/>}
      {router.query.id === "2" && <CallsTable2 handleClickGetIdDop={handleClickGetIdDop}/>}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Основной урок",
  },

  {
    id: 2,
    type: "Доп. урок",
  },
];

export default CallsComponents;
