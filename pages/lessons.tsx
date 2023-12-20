import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import LessonsTableBlock from "@/components/molecules/LessonsTableBlock";
import LessonsTable from "@/components/organisms/LessonsTable";
import MainLayouts from "@/layouts/MainLayouts";
import { useState } from "react";

const LessonsPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false)
  return (
    <MainLayouts>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '1.6rem'}}>
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

      {showActive && <LessonsTableBlock onReject={setShowActive}/>}
      
      <LessonsTable />
    </MainLayouts>
  );
};

export default LessonsPage;
