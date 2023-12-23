import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import LessonsTableBlock from "@/components/molecules/LessonsTableBlock";
import LessonsTable from "@/components/organisms/LessonsTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getLessonsIdThunk } from "@/store/thunks/pride.thunk";
import { useState } from "react";

const LessonsPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const lessonsid = useTypedSelector((state) => state.pride.lessonsid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getLessonsIdThunk(id));
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
        <LessonsTableBlock onReject={setShowActive} lessonsid={lessonsid} getId={getId} onEdit={setEditActive}/>
      )}

      <LessonsTable handleClickGetId={handleClickGetId}/>
    </MainLayouts>
  );
};

export default LessonsPage;
