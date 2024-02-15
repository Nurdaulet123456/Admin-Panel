import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getOSThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  removeSecondOfTime,
} from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdOS?: (id?: number) => void;
}

const CallsTable: FC<IProps> = ({ handleClickGetIdOS }) => {
  const dispatch = useAppDispatch();
  const os = useTypedSelector((state) => state.pride.os);

  useEffect(() => {
    if (os) {
      dispatch(getOSThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/ringApi/${id}`, {
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
    dispatch(getOSThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Основной урок </div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>План звонков</Th>
              <Th>Номер урока</Th>
              <Th>Смена</Th>
              <Th>Смена начало</Th>
              <Th>Смена конец</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {os &&
            os.map((item, index) => (
              <Tr key={item.plan}>
                <Td>{item.plan}</Td>
                <Td>{item.number}</Td>
                <Td>{item.smena}</Td>
                <Td>{removeSecondOfTime(item.start_time)}</Td>
                <Td>{removeSecondOfTime(item.end_time)}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdOS && handleClickGetIdOS(item.id)
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

export default CallsTable;
