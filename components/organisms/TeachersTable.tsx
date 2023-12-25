import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

const TeachersTable = () => {
  const disptach = useAppDispatch();
  const teachers = useTypedSelector((state) => state.pride.teachers);

  useEffect(() => {
    if (teachers) {
      disptach(getTeachersThunk());
    }
  }, [disptach]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/teacher/${id}/`, {
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
    disptach(getTeachersThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Преподаватели</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>ФИО</Th>
              <Th>Фото</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {teachers &&
            teachers.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.full_name}</Td>
                <Td>
                  <div className="img-block">
                    <img src={item.photo3x4} alt={item.photo3x4} />
                  </div>
                </Td>
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

export default TeachersTable;