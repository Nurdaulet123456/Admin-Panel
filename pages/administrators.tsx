import { useEffect, useState } from "react";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import AdministratorTableBlock from "@/components/molecules/SuperAdminTableBlock/AdministratorTableBlock";
import AdministratorTable from "@/components/organisms/SuperAdmin/AdministratorTable";
import SuperAdminLayouts from "@/layouts/SuperAdminLayouts";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getUsersThunk } from "@/store/thunks/schoolnfo.thunk";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const users = useTypedSelector(state => state.system.users)

  useEffect(() => {
    if (users) {
        dispatch(getUsersThunk())
    }
  }, [dispatch])

  return (
    <SuperAdminLayouts>
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

      {showActive && <AdministratorTableBlock />}

      {!showActive && <AdministratorTable users={users && users}/>}
    </SuperAdminLayouts>
  );
};

export default MainPage;
