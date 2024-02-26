import { useEffect, useState } from "react";
import { LogoutIcons, PlusIcons } from "@/components/atoms/Icons";
import { Button } from "@/components/atoms/UI/Buttons/Button";
import MenuTableBlock from "@/components/molecules/MenuTableBlock";
import MenuTable from "@/components/organisms/MenuTable";
import MainLayouts from "@/layouts/MainLayouts";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {getMapThunk, getMenuIdThunk, getMenuThunk} from "@/store/thunks/schoolnfo.thunk";
import {useSelector} from "react-redux";

const MenuPage = () => {
    const [showActive, setShowActive] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [editActive, setEditActive] = useState<boolean>(false);
    const [getId, setId] = useState<number>();

    const dispatch = useAppDispatch();
    const maps = useTypedSelector((state) => state.system.maps);
    const map = useTypedSelector((state) => state.system.map);

    useEffect(() => {
        if (maps) {
            dispatch(getMapThunk());
        }
    }, [dispatch]);

    const handleAddButtonClick = () => {
        setEditActive(false);
        setShowActive(!showActive);
        setId(undefined);
    };

    const handleClickGetId = (id?: number) => {
        setEditActive(true);

        setId(id);

        if (id) {
            dispatch(getMenuIdThunk(id));
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
                <MapTableBlock
                    onReject={setShowActive}
                    getId={getId}
                    menuid={menuid}
                    onEdit={setEditActive}
                />
            )}

            <MapTable
                menu={menu}
                setDel={setDel}
                del={del}
                handleClickGetId={handleClickGetId}
            />
        </MainLayouts>
    );
};

export default MenuPage;
