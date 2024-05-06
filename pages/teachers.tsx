import { LogoutIcons, PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import TeachersTableBlock from "@/components/molecules/TeachersTableBlock";
import TeachersTable from "@/components/organisms/TeachersTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getTeacherIdThunk } from "@/store/thunks/available.thunk";
import { useState } from "react";
import {scrollToTop} from "@/utils/assets.utils";
import {useRouter} from "next/router";
import {kz} from "@/locales/kz";
import {ru} from "@/locales/ru";

const TeachersPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const teachersid = useTypedSelector((state) => state.ia.teachersid);
    const router = useRouter();
    const translations: any= {
        kz: kz,
        ru: ru,
    };
    const t = translations[router.locale || "kz"] || kz;
  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
    setId(undefined);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);
    scrollToTop();
    setId(id);

    if (id) {
      dispatch(getTeacherIdThunk(id));
    }
  };
  return (
    <MainLayouts link={"/teachers"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1.6rem",
        }}
      >
        <Button
          background={showActive || editActive ? "#CACACA" : "#27AE60"}
          radius="14px"
          style={{
            width: "auto",
          }}
          onClick={handleAddButtonClick}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            {showActive || editActive ? <LogoutIcons /> : <PlusIcons />}
            {showActive || editActive ? t.actions.close : t.actions.add}
          </div>
        </Button>
      </div>

      {(showActive || editActive) && (
        <TeachersTableBlock
          teachersid={teachersid}
          onEdit={setEditActive}
          getId={getId}
          onReject={setShowActive}
        />
      )}

      <TeachersTable handleClickGetId={handleClickGetId} />
    </MainLayouts>
  );
};

export default TeachersPage;
