import { FC } from "react";

import { IKruzhok } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { formatWeekDay } from "@/utils/assets.utils";

interface IProps {
  kruzhok: IKruzhok[] | undefined;
}

const MainTable: FC<IProps> = ({ kruzhok }) => {
  return (
    <div className="main_table">
      <div className="main_table-title">Үйірме</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Кружок (Үйірме)</Th>
              <Th>Учитель ФИО</Th>
              <Th>Цель (Мақсаты)</Th>
              <Th>Время (Уақыты)</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {kruzhok &&
            kruzhok.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.kruzhok_name}</Td>
                <Td>{"Maksat"}</Td>
                <Td>{item.purpose}</Td>
                <Td>
                  {item.lessons?.map((i) => (
                    <>
                      <div>{formatWeekDay(i.week_day)}</div>
                      <div>{i.start_end_time}</div>
                      <br />
                    </>
                  ))}
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

export default MainTable;
