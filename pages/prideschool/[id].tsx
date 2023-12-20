import { useState } from "react";
import { useRouter } from "next/router";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import Tabs from "@/components/molecules/Tabs/Tabs";
import MainLayouts from "@/layouts/MainLayouts";
import { ITabs } from "@/types/assets.type";
import PrideSchoolTable1 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable1";
import PrideSchoolTable2 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable2";
import PrideSchoolTable3 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable3";
import PrideSchoolTable4 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable4";
import PrideSchoolTable5 from "@/components/organisms/PrideSchoolTable/PrideSchoolTable5";
import PrideSchoolTableBlock1 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock1";
import PrideSchoolTableBlock2 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock2";
import PrideSchoolTableBlock3 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock3";
import PrideSchoolTableBlock4 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock4";
import PrideSchoolTableBlock5 from "@/components/molecules/PrideSchoolTableBlockId/PrideSchoolTableBlock5";

const PrideSchoolComponents = () => {
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
        <Tabs link="prideschool" tabs={tabs} />
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

      {showActive && router.query.id === "1" && <PrideSchoolTableBlock1 onReject={setShowActive}/>}
      {showActive && router.query.id === "2" && <PrideSchoolTableBlock2 onReject={setShowActive}/>}
      {showActive && router.query.id === "3" && <PrideSchoolTableBlock3 onReject={setShowActive}/>}
      {showActive && router.query.id === "4" && <PrideSchoolTableBlock4 onReject={setShowActive}/>}
      {showActive && router.query.id === "5" && <PrideSchoolTableBlock5 onReject={setShowActive}/>}

      {router.query.id === "1" && <PrideSchoolTable1 />}
      {router.query.id === "2" && <PrideSchoolTable2 />}
      {router.query.id === "3" && <PrideSchoolTable3 />}
      {router.query.id === "4" && <PrideSchoolTable4 />}
      {router.query.id === "5" && <PrideSchoolTable5 />}
    </MainLayouts>
  );
};

const tabs: ITabs[] = [
  {
    id: 1,
    type: "Спорт",
  },

  {
    id: 2,
    type: "Өнер",
  },

  {
    id: 3,
    type: "Пәндік олимпиада",
  },

  {
    id: 4,
    type: "Алтын белгі",
  },

  {
    id: 5,
    type: "Қызыл аттестат",
  },
];

export default PrideSchoolComponents;
