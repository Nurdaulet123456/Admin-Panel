import { FC } from "react";
import { IMenu } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { formatWeekDay } from "@/utils/assets.utils";

interface IProps {
  menu: IMenu[] | undefined;
}

const MenuTable: FC<IProps> = ({ menu }) => {
  return (
    <div className="main_table">
      <div className="main_table-title">Меню</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Күні</Th>
              <Th>Аты</Th>
              <Th>Құрамы</Th>
              <Th>Выход</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {menu &&
            menu.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{formatWeekDay(item.week_day)}</Td>
                <Td>{item.food_name}</Td>
                <Td>{item.food_sostav}</Td>
                <Td>{item.vihod_1}</Td>
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

export default MenuTable;
