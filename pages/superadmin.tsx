import { useEffect, useState } from "react";
import {
  getSchoolIdThunk,
  getSchoolThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import SuperAdminTableBlock from "@/components/molecules/SuperAdminTableBlock/SuperAdminTableBlock";
import SuperAdminTable from "@/components/organisms/SuperAdmin/SuperAdminTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import SuperAdminLayouts from "@/layouts/SuperAdminLayouts";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  const [getId, setGetId] = useState<number>();
  const dispatch = useAppDispatch();
  const school = useTypedSelector((state) => state.system.school);
  const schoolid = useTypedSelector((state) => state.system.schoolid);

  useEffect(() => {
    if (school) {
      dispatch(getSchoolThunk());
    }
  }, [dispatch]);

  const handleAddButtonClick = () => {
    setShowActive(!showActive);
    setEditActive(false);
  };

  const handleGetId = async (id?: number) => {
    setEditActive(true);
    setGetId(id);

    if (id) {
      dispatch(getSchoolIdThunk(id));
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
        <SuperAdminTableBlock
          onReject={setShowActive}
          onEdit={setEditActive}
          getId={getId}
          schoolid={schoolid}
        />
      )}

      {!showActive && !editActive && (
        <SuperAdminTable school={school && school} onEdit={handleGetId} />
      )}
    </SuperAdminLayouts>
  );
};

export default MainPage;
