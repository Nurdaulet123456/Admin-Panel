import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getTeachersThunk } from "@/store/thunks/pride.thunk";

const TeachersTable = () => {
  const disptach = useAppDispatch();
  const teachers = useTypedSelector((state) => state.pride.teachers);

  useEffect(() => {
    if (teachers) {
      disptach(getTeachersThunk());
    }
  }, [disptach]);

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

                  <div>
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
