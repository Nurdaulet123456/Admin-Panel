import { FC } from "react";
import { IClassRoom } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";

interface IProps {
  cabinet?: IClassRoom[];
}

const CabinetTable: FC<IProps> = ({ cabinet }) => {
  return (
    <div className="main_table">
      <div className="main_table-title">Кабинет</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Наименование</Th>
              <Th>Кабинет номері</Th>
              <Th>Этаж</Th>
              <Th>Корпус</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {cabinet &&
            cabinet.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.classroom_name}</Td>
                <Td>{item.classroom_number}</Td>
                <Td>{item.flat}</Td>
                <Td>{item.korpus}</Td>
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

export default CabinetTable;
