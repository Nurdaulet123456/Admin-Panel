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

const CallsComponents = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const router = useRouter();

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
        <div style={{ width: "100%", display: "flex", gap: '2.4rem' }}>
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
          onClick={() => setShowActive(!showActive)}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {showActive && router.query.id === "1" && <CallsTableBlock1 onReject={setShowActive}/>}
      {showActive && router.query.id === "2" && <CallsTableBlock2 onReject={setShowActive}/>}

      {router.query.id === "1" && <CallsTable />}
      {router.query.id === "2" && <CallsTable2 />}
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
