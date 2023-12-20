import { useEffect, useState } from "react";
import { getSchoolThunk } from "@/store/thunks/schoolnfo.thunk";
import { PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import SuperAdminTableBlock from "@/components/molecules/SuperAdminTableBlock/SuperAdminTableBlock";
import SuperAdminTable from "@/components/organisms/SuperAdmin/SuperAdminTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import SuperAdminLayouts from "@/layouts/SuperAdminLayouts";

const MainPage = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const school = useTypedSelector((state) => state.system.school);

  useEffect(() => {
    if (school) {
      dispatch(getSchoolThunk());
    }
  }, [dispatch]);

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

      {showActive && <SuperAdminTableBlock onReject={setShowActive}/>}

      {!showActive && <SuperAdminTable school={school && school}/>}
    </SuperAdminLayouts>
  );
};

export default MainPage;
