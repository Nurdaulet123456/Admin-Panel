import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { IClass } from "@/types/assets.type";
import { FC } from "react";
import { instance } from "@/api/axios.instance";
import { getClassThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  classinfo?: IClass[];
  handleClickGetId?: (id?: number) => void;
}

const ClassTable: FC<IProps> = ({ classinfo, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const onDelete = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/class/${id}/`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .catch((err) => console.log(err));

    dispatch(getClassThunk());
  };

  console.log(classinfo);

  return (
    <div className="main_table">
      <div className="main_table-title">Классы</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Класс</Th>
              <Th>Кабинет</Th>
              <Th>Классный руководиль</Th>
              <Th>План звонков</Th>
              <Th>Смена</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>
          {/* {classinfo &&
            classinfo.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.class_name}</Td>
                <Td>{item.classroom}</Td>
                <Td>{item.class_teacher}</Td>
                <Td>{item.osnova_plan}</Td>
                <Td>{item.osnova_smena}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
                    }
                  >
                    <PenIcons />
                  </div>

                  <div onClick={() => onDelete(item.id)}>
                    <DeleteIcons />
                  </div>
                </Td>
              </Tr>
            ))} */}

          {classinfo?.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item?.class_name}</Td>
              <Td>{item?.classroom?.classroom_name}</Td>
              <Td>{item?.class_teacher?.full_name}</Td>
              <Td>{item?.osnova_plan}</Td>
              <Td>{item?.osnova_smena}</Td>
              <Td>
                <div
                  onClick={() => handleClickGetId && handleClickGetId(item.id)}
                >
                  <PenIcons />
                </div>

                <div onClick={() => onDelete(item.id)}>
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

export default ClassTable;
