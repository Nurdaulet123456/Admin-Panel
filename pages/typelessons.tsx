import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import TypeLessonsTableBlock from "@/components/molecules/TypeLessonsTableBlock";
import TypeLessonsTable from "@/components/organisms/TypeLessonsTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getExtraIdThunk } from "@/store/thunks/pride.thunk";
import { useState } from "react";

const TypeLessonsPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const extraid = useTypedSelector((state) => state.pride.extraid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getExtraIdThunk(id));
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
        <TypeLessonsTableBlock
          onReject={setShowActive}
          onEdit={setEditActive}
          extraid={extraid}
          getId={getId}
        />
      )}

      <TypeLessonsTable
        onEdit={setEditActive}
        handleClickGetId={handleClickGetId}
      />
    </MainLayouts>
  );
};

export default TypeLessonsPage;
