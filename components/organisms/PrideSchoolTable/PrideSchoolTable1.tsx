import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolSportThunk } from "@/store/thunks/pride.thunk";

const PrideSchoolTable1 = () => {
  const dispatch = useAppDispatch();
  const sport = useTypedSelector((state) => state.pride.sport);

  useEffect(() => {
    if (sport) {
      dispatch(getSchoolSportThunk());
    }
  }, [dispatch]);

  console.log(sport);
  return (
    <div className="main_table">
      <div className="main_table-title">Спорт</div>

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

          {sport &&
            sport.map((item, index) => (
              <Tr key={item.id}>
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

export default PrideSchoolTable1;
