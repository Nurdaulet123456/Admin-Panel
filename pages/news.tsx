import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import NewsTableBlock from "@/components/molecules/NewsTableBlock";
import NewsTable from "@/components/organisms/NewsTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getNewsIdThunk } from "@/store/thunks/pride.thunk";
import { useState } from "react";

const NewsPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const newsid = useTypedSelector((state) => state.pride.newsid);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getNewsIdThunk(id));
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
        <NewsTableBlock
          newsid={newsid}
          getId={getId}
          onEdit={setEditActive}
          onReject={setShowActive}
        />
      )}

      <NewsTable handleClickGetId={handleClickGetId} />
    </MainLayouts>
  );
};

export default NewsPage;
