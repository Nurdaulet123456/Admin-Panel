import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolOlimpThunk } from "@/store/thunks/pride.thunk";

const PrideSchoolTable3 = () => {
  const dispatch = useAppDispatch();
  const olimp = useTypedSelector((state) => state.pride.olimp);

  useEffect(() => {
    if (olimp) {
      dispatch(getSchoolOlimpThunk());
    }
  }, [dispatch]);

  return (
    <div className="main_table">
      <div className="main_table-title">Пәндік олимпиада</div>

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

          {olimp &&
            olimp.map((item, index) => (
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

export default PrideSchoolTable3;
