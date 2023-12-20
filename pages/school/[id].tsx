import { useState } from "react";
import { useRouter } from "next/router";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import SchoolTable from "@/components/organisms/SchoolIdTable/SchoolTable";
import MainLayouts from "@/layouts/MainLayouts";
import SchoolTable2 from "@/components/organisms/SchoolIdTable/SchoolTable2";
import SchoolTable3 from "@/components/organisms/SchoolIdTable/SchoolTable3";
import SchoolTableBlock1 from "@/components/molecules/SchoolTableId/SchoolTableBlock1";
import SchoolTableBlock2 from "@/components/molecules/SchoolTableId/SchoolTableBlock2";
import SchoolTableBlock4 from "@/components/molecules/SchoolTableId/SchoolTableBlock4";
import { ITabs } from "@/types/assets.type";

const SchoolComponents = () => {
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
        <Tabs link="school" tabs={tabs} />
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

      {showActive && router.query.id === "1" && <SchoolTableBlock1 onReject={setShowActive}/>}
      {showActive && router.query.id === "3" && <SchoolTableBlock2 onReject={setShowActive}/>}
      {showActive && router.query.id === "4" && <SchoolTableBlock4 onReject={setShowActive}/>}

      {router.query.id === "1" && <SchoolTable />}
      {router.query.id === "3" && <SchoolTable2 />}
      {router.query.id === "4" && <SchoolTable3 />}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Мектеп әкімшілігі",
  },

  {
    id: 2,
    type: "Мектеп төлқұжаты",
  },

  {
    id: 3,
    type: "Фото-суреттер",
  },

  {
    id: 4,
    type: "Әлеуметтік желілер",
  },
];

export default SchoolComponents;
