import { FC } from "react";

import { IKruzhok } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import {
  formatName,
  formatWeekDay,
  getTokenInLocalStorage,
} from "@/utils/assets.utils";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getKruzhokInfoThunk } from "@/store/thunks/schoolnfo.thunk";

interface IProps {
  kruzhok: IKruzhok[] | undefined;
  handleClickGetId?: (id?: number) => void;
}

const MainTable: FC<IProps> = ({ kruzhok, handleClickGetId }) => {
  const dispatch = useAppDispatch();

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/kruzhok/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
        }
      });
    dispatch(getKruzhokInfoThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Үйірме</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Кружок (Үйірме)</Th>
              <Th>Учитель ФИО</Th>
              <Th>Цель (Мақсаты)</Th>
              <Th>Время (Уақыты)</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {kruzhok &&
            kruzhok.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.kruzhok_name}</Td>
                <Td>{formatName(item.teacher.full_name)}</Td>
                <Td>{item.purpose}</Td>
                <Td>
                  {item.lessons?.map((i) => (
                    <>
                      <div>{formatWeekDay(i.week_day)}</div>
                      <div>{i.start_end_time}</div>
                      <br />
                    </>
                  ))}
                </Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
                    }
                  >
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

export default MainTable;
