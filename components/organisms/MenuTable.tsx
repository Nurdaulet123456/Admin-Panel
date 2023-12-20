import { FC, useCallback, useEffect } from "react";
import { IMenu } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { formatWeekDay, getTokenInLocalStorage } from "@/utils/assets.utils";
import { instance } from "@/api/axios.instance";
import { getMenuThunk } from "@/store/thunks/schoolnfo.thunk";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface IProps {
  menu: IMenu[] | undefined;
  setDel?: any;
  del?: boolean;
}

const MenuTable: FC<IProps> = ({ menu, setDel, del }) => {
  const dispatch = useAppDispatch();

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/menu/${id}`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
          setDel(true);
        }
      })
      .catch((e) => console.log(e));
    dispatch(getMenuThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Меню</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Күні</Th>
              <Th>Аты</Th>
              <Th>Құрамы</Th>
              <Th>Выход</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {menu &&
            menu.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{formatWeekDay(item.week_day)}</Td>
                <Td>{item.food_name}</Td>
                <Td>{item.food_sostav}</Td>
                <Td>{item.vihod_1}</Td>
                <Td>
                  <div>
                    <PenIcons />
                  </div>

                  <div onClick={() => handleDeleteItems(item.id)}>
                    <DeleteIcons />
                  </div>
                </Td>
              </Tr>
            ))}
        </Table>
      </div>
    </div>
  );
};

export default MenuTable;
