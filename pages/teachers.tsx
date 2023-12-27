import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import TeachersTableBlock from "@/components/molecules/TeachersTableBlock";
import TeachersTable from "@/components/organisms/TeachersTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getTeacherIdThunk } from "@/store/thunks/available.thunk";
import { useState } from "react";

const TeachersPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const teachersid = useTypedSelector((state) => state.ia.teachersid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getTeacherIdThunk(id));
    }
  };
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
          onClick={handleAddButtonClick}
        >
          <PlusIcons />
          Добавить
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
