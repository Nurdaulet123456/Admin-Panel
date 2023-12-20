import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolOnerThunk } from "@/store/thunks/pride.thunk";

const PrideSchoolTable2 = () => {
  const dispatch = useAppDispatch();
  const oner = useTypedSelector((state) => state.pride.oner);

  useEffect(() => {
    if (oner) {
      dispatch(getSchoolOnerThunk());
    }
  }, [dispatch]);

  return (
    <div className="main_table">
      <div className="main_table-title">Өнер</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фото</Th>
              <Th>ФИО</Th>
              <Th>Текст</Th>
              <Th>Класс</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {oner &&
            oner.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>Content</Td>
                <Td>{item.fullname}</Td>
                <Td>{item.student_success}</Td>
                <Td>{item.classl} класс</Td>
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

export default PrideSchoolTable2;
