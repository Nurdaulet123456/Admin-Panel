import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getDopThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  removeSecondOfTime,
} from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdDop?: (id?: number) => void;
}

const CallsTable2: FC<IProps> = ({ handleClickGetIdDop }) => {
  const dispatch = useAppDispatch();
  const dop = useTypedSelector((state) => state.pride.dop);

  useEffect(() => {
    if (dop) {
      dispatch(getDopThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/DopUrokRingApi/${id}`, {
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
    dispatch(getDopThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Доп.урок </div>

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

          {dop &&
            dop.map((item, index) => (
              <Tr key={item.plan}>
                <Td>{item.plan}</Td>
                <Td>{item.number}</Td>
                <Td>{item.smena}</Td>
                <Td>{removeSecondOfTime(item.start_time)}</Td>
                <Td>{removeSecondOfTime(item.end_time)}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdDop && handleClickGetIdDop(item.id)
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

export default CallsTable2;
