import { useEffect, useState } from "react";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MenuTableBlock from "@/components/molecules/MenuTableBlock";
import MenuTable from "@/components/organisms/MenuTable";
import MainLayouts from "@/layouts/MainLayouts";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";

const MenuPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const menu = useTypedSelector((state) => state.system.menu);

  useEffect(() => {
    if (menu) {
      dispatch(getMenuThunk());
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

      {showActive && <MenuTableBlock onReject={setShowActive}/>}

      <MenuTable menu={menu} />
    </MainLayouts>
  );
};

export default MenuPage;
