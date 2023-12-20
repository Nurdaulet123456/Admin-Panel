import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getLessonsThunk } from "@/store/thunks/pride.thunk";

const LessonsTable = () => {
  const dispatch = useAppDispatch();
  const lessons = useTypedSelector((state) => state.pride.lessons);

  useEffect(() => {
    if (lessons) {
      dispatch(getLessonsThunk());
    }
  }, [dispatch]);

  console.log(lessons);
  return (
    <div className="main_table">
      <div className="main_table-title">Предметы</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Наименование</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {lessons &&
            lessons.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.full_name}</Td>
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

export default LessonsTable;
