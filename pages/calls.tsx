import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import ClassTableBlock from "@/components/molecules/ClassTableBlock";
import CallsTable from "@/components/organisms/CallsTable/CallsTable1";
import MainLayouts from "@/layouts/MainLayouts";
import { useState } from "react";

const CallsPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
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

      {showActive && <ClassTableBlock />}

      <CallsTable />
    </MainLayouts>
  );
};

export default CallsPage;
