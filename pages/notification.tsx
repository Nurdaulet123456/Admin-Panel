import {LogoutIcons, PlusIcons} from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import TypeLessonsTableBlock from "@/components/molecules/TypeLessonsTableBlock";
import TypeLessonsTable from "@/components/organisms/TypeLessonsTable";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayouts from "@/layouts/MainLayouts";
import { getExtraIdThunk } from "@/store/thunks/pride.thunk";
import { useState } from "react";
import {getNotificationIdThunk} from "@/store/thunks/schoolnfo.thunk";
import NotificationTableBlock from "@/components/molecules/NotificationTableBlock";
import NotificationTable from "@/components/organisms/NotificationTable";

const NotificationsPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number>();

    const dispatch = useAppDispatch();
    const notificationId = useTypedSelector((state) => state.pride.notificationId);

    const handleAddButtonClick = () => {
        setEditActive(false);
        setShowActive(!showActive);
        setId(undefined);
    };

    const handleClickGetId = (id?: number) => {
        setEditActive(true);

        setId(id);

        if (id) {
            dispatch(getNotificationIdThunk(id));
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
        background={showActive || editActive ? "#CACACA" : "#27AE60"}
    radius="14px"
    style={{
        width: "auto",
    }}
    onClick={handleAddButtonClick}
    >
    <div
        style={{
        display: "flex",
            alignItems: "center",
            gap: ".8rem",
    }}
>
    {showActive || editActive ? <LogoutIcons /> : <PlusIcons />}
    {showActive || editActive ? "Закрыть" : "Добавить"}
    </div>
    </Button>
    </div>

    {(showActive || editActive) && (
        <NotificationTableBlock
            onReject={setShowActive}
        onEdit={setEditActive}
        extraid={notificationId}
        getId={getId}
        />
    )}

    <NotificationTable
        onEdit={setEditActive}
    handleClickGetId={handleClickGetId}
    />
    </MainLayouts>
);
};

export default NotificationsPage;
