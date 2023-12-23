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
import SchoolTableBlock3 from "@/components/molecules/SchoolTableId/SchoolTableBlock3";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  getSchoolAdminIdThunk,
  getSchoolPhotosIdThunk,
  getSchoolSocialIdThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const SchoolComponents = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const router = useRouter();

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const socialid = useTypedSelector((state) => state.system.schoolsocialid);
  const adminid = useTypedSelector((state) => state.system.schooladminid);
  const photosid = useTypedSelector((state) => state.system.schoolphotosid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetIdDop = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolSocialIdThunk(id));
    }
  };

  const handleClickGetId1 = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolAdminIdThunk(id));
    }
  };

  const handleClickGetId2 = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getSchoolPhotosIdThunk(id));
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
          onClick={handleAddButtonClick}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {(showActive || editActive) && router.query.id === "1" && (
        <SchoolTableBlock1 onReject={setShowActive} adminid={adminid} getId={getId} onEdit={setEditActive}/>
      )}
      {router.query.id === "2" && <SchoolTableBlock3 />}
      {(showActive || editActive) && router.query.id === "3" && (
        <SchoolTableBlock2 onReject={setShowActive} photosid={photosid} getId={getId} onEdit={setEditActive}/>
      )}
      {(showActive || editActive) && router.query.id === "4" && (
        <SchoolTableBlock4
          onReject={setShowActive}
          socialid={socialid}
          getId={getId}
          onEdit={setEditActive}
        />
      )}

      {router.query.id === "1" && <SchoolTable handleClickGetId1={handleClickGetId1}/>}
      {router.query.id === "3" && <SchoolTable2 handleClickGetId2={handleClickGetId2}/>}
      {router.query.id === "4" && (
        <SchoolTable3 handleClickGetIdDop={handleClickGetIdDop} />
      )}
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
