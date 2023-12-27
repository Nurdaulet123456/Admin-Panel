import { useEffect, useState } from "react";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import AdministratorTableBlock from "@/components/molecules/SuperAdminTableBlock/AdministratorTableBlock";
import AdministratorTable from "@/components/organisms/SuperAdmin/AdministratorTable";
import SuperAdminLayouts from "@/layouts/SuperAdminLayouts";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getUsersThunk } from "@/store/thunks/schoolnfo.thunk";
import { getUserIdThunk } from "@/store/thunks/available.thunk";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const users = useTypedSelector((state) => state.system.users);
  const usersid = useTypedSelector((state) => state.ia.userid);

  const [getId, setId] = useState<number>();

  useEffect(() => {
    if (users) {
      dispatch(getUsersThunk());
    }
  }, [dispatch]);

  const handleAddButtonClick = () => {
    setEditActive(false);
    setShowActive(!showActive);
  };

  const handleClickGetId = (id?: number) => {
    setEditActive(true);

    setId(id);

    if (id) {
      dispatch(getUserIdThunk(id));
    }
  };

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
          onClick={handleAddButtonClick}
        >
          <PlusIcons />
          Добавить
        </Button>
      </div>

      {(showActive || editActive) && (
        <AdministratorTableBlock onReject={setShowActive} usersid={usersid} getId={getId} onEdit={setEditActive}/>
      )}

      {!showActive && !editActive && (
        <AdministratorTable
          users={users && users}
          handleClickGetId={handleClickGetId}
        />
      )}
    </SuperAdminLayouts>
  );
};

export default MainPage;
