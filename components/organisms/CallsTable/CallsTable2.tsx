import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {FC, useEffect, useState} from "react";
import { getDopThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import {
  getTokenInLocalStorage,
  removeSecondOfTime,
} from "@/utils/assets.utils";
import {ICalls} from "@/types/assets.type";

interface IProps {
  handleClickGetIdDop?: (id?: number) => void;
}

const CallsTable2: FC<IProps> = ({ handleClickGetIdDop }) => {
  const dispatch = useAppDispatch();
  const dop = useTypedSelector((state) => state.pride.dop);
  const [calls, setCalls] = useState<ICalls[][]>([]);
  useEffect(() => {
    if (dop) {
      dispatch(getDopThunk());
    }
  }, [dispatch]);


  useEffect(() => {
    if(dop) {
      const groupByPlan = () => {
        const groups: { [key: number]: ICalls[] } = {};
        for (const item of dop) {
          if (item.plan !== undefined) {
            if (!groups[item.plan]) {
              groups[item.plan] = [];
            }
            groups[item.plan].push(item);
          }
        }
        return Object.values(groups);
      };
      setCalls(groupByPlan);
    }
  }, [dop]);


  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/DopUrokRingApi/${id}/`, {
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
        <div className="main_table-title">Доп.урок</div>

        <div className="main_table-block" style={{display: "flex", flexWrap: "wrap", gap: "4%"}}>
          {
              calls &&
              calls.map((call, index) => (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        width: "48%",
                        padding: "21px",
                        background: "#F4F4F4",
                        borderRadius: "11.429px",
                        marginBottom: "20px",
                      }} key={index}>
                        <div style={{color: "#D12E34", fontWeight: "bold"}}>
                          План звонков: <span style={{color: "black"}}>{call[0].plan}</span>
                        </div>
                        <div style={{color: "#D12E34", fontWeight: "bold"}}>
                          Смена: <span style={{color: "black"}}>{call[0].smena}</span>
                        </div>
                        <div>

                        </div>
                        <Table>
                          <Thead>
                            <tr>
                              <Th>№</Th>
                              <Th>Начало урока</Th>
                              <Th>Конец урока</Th>
                              <Th>Действия</Th>
                            </tr>
                          </Thead>

                          {call &&
                              call.map((item, index) => (
                                  <Tr key={item.plan}>
                                    <Td>{item.number}</Td>
                                    <Td>{removeSecondOfTime(item.start_time)}</Td>
                                    <Td>{removeSecondOfTime(item.end_time)}</Td>
                                    <Td>
                                      <div
                                          onClick={() =>
                                              handleClickGetIdDop && handleClickGetIdDop(item.id)
                                          }
                                      >
                                        <PenIcons/>
                                      </div>

                                      <div onClick={() => handleDeleteItems(item.id)}>
                                        <DeleteIcons/>
                                      </div>
                                    </Td>
                                  </Tr>
                              ))}
                        </Table>
                      </div>

                  )
              )
          }

        </div>
      </div>
  );
};

export default CallsTable2;
