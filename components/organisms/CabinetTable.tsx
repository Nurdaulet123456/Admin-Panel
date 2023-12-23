import { FC } from "react";
import { IClassRoom } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getClassRoomThunk } from "@/store/thunks/schoolnfo.thunk";

interface IProps {
  cabinet?: IClassRoom[];
  handleClickGetId?: (id?: number) => void;
}

const CabinetTable: FC<IProps> = ({ cabinet, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/classroom/${id}`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
    dispatch(getClassRoomThunk());
  };
  return (
    <div className="main_table">
      <div className="main_table-title">Кабинет</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Наименование</Th>
              <Th>Кабинет номері</Th>
              <Th>Этаж</Th>
              <Th>Корпус</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {cabinet &&
            cabinet.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.classroom_name}</Td>
                <Td>{item.classroom_number}</Td>
                <Td>{item.flat}</Td>
                <Td>{item.korpus}</Td>
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

export default CabinetTable;
