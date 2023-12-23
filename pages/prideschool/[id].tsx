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
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getSchoolAltynIdThunk,
  getSchoolAtestIdThunk,
  getSchoolOlimpIdThunk,
  getSchoolOnerIdThunk,
  getSchoolSportIdThunk,
} from "@/store/thunks/pride.thunk";

const PrideSchoolComponents = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const router = useRouter();

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();

  const sportid = useTypedSelector((state) => state.pride.sportid);
  const onerid = useTypedSelector((state) => state.pride.onerid);
  const altynid = useTypedSelector((state) => state.pride.altynid);
  const atestid = useTypedSelector((state) => state.pride.atestid);
  const olimpid = useTypedSelector((state) => state.pride.olimpid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetIdSport = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolSportIdThunk(id));
    }
  };

  const handleClickGetIdAltyn = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolAltynIdThunk(id));
    }
  };

  const handleClickGetIdOner = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolOnerIdThunk(id));
    }
  };

  const handleClickGetIdOlimp = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolOlimpIdThunk(id));
    }
  };

  const handleClickGetIdAtest = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolAtestIdThunk(id));
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
          onClick={handleAddButtonClick}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {(showActive || editActive) && router.query.id === "1" && (
        <PrideSchoolTableBlock1
          onReject={setShowActive}
          sportid={sportid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "2" && (
        <PrideSchoolTableBlock2
          onReject={setShowActive}
          onerid={onerid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "3" && (
        <PrideSchoolTableBlock3
          onReject={setShowActive}
          olimpid={olimpid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "4" && (
        <PrideSchoolTableBlock4
          onReject={setShowActive}
          altynid={altynid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}
      {(showActive || editActive) && router.query.id === "5" && (
        <PrideSchoolTableBlock5
          onReject={setShowActive}
          atestid={atestid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}

      {router.query.id === "1" && (
        <PrideSchoolTable1 handleClickGetIdSport={handleClickGetIdSport} />
      )}
      {router.query.id === "2" && (
        <PrideSchoolTable2 handleClickGetIdOner={handleClickGetIdOner} />
      )}
      {router.query.id === "3" && (
        <PrideSchoolTable3 handleClickGetIdOlimp={handleClickGetIdOlimp} />
      )}
      {router.query.id === "4" && (
        <PrideSchoolTable4 handleClickGetIdAltyn={handleClickGetIdAltyn} />
      )}
      {router.query.id === "5" && (
        <PrideSchoolTable5 handleClickGetIdAtest={handleClickGetIdAtest} />
      )}
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
