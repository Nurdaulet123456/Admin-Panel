import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";

const TypeLessonsTable = () => {
  return (
    <div className="main_table">
      <div className="main_table-title">Тип занятий</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Наименование</Th>
              <Th>Цвет</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          <Tr>
            <Td>1</Td>
            <Td>Content</Td>
            <Td><ColorBlock color="red" circle/></Td>
            <Td>
              <div>
                <PenIcons />
              </div>

              <div>
                <DeleteIcons />
              </div>
            </Td>
          </Tr>

          <Tr>
            <Td>2</Td>
            <Td>Content</Td>
            <Td><ColorBlock color="red" circle/></Td>
            <Td>
              <div>
                <PenIcons />
              </div>

              <div>
                <DeleteIcons />
              </div>
            </Td>
          </Tr>
        </Table>
      </div>
    </div>
  );
};

export default TypeLessonsTable;
