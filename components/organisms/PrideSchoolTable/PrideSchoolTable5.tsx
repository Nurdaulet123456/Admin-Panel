import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolAtestThunk } from "@/store/thunks/pride.thunk";

const PrideSchoolTable5 = () => {
  const dispatch = useAppDispatch();
  const atest = useTypedSelector((state) => state.pride.atest);

  useEffect(() => {
    if (atest) {
      dispatch(getSchoolAtestThunk());
    }
  }, [dispatch]);

  console.log(atest)

  return (
    <div className="main_table">
      <div className="main_table-title">Қызыл аттестат</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фото</Th>
              <Th>ФИО</Th>
              <Th>Текст</Th>
              <Th>Год</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {atest &&
            atest.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>Content</Td>
                <Td>{item.fullname}</Td>
                <Td>{item.student_success}</Td>
                <Td>{item.endyear}</Td>
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

export default PrideSchoolTable5;
