import { useEffect } from "react";

import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MainTableBlock from "@/components/molecules/MainTableBlock";
import MainTable from "@/components/organisms/MainTable";
import MainLayouts from "@/layouts/MainLayouts";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getKruzhokInfoThunk } from "@/store/thunks/schoolnfo.thunk";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const kruzhok = useTypedSelector((state) => state.system.kruzhok);

  useEffect(() => {
    if (kruzhok) {
      dispatch(getKruzhokInfoThunk());
    }
  }, [dispatch]);

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
          onClick={() => setShowActive(!showActive)}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {showActive && <MainTableBlock onReject={setShowActive} />}

      <MainTable kruzhok={kruzhok && kruzhok} />
    </MainLayouts>
  );
};

export default MainPage;
