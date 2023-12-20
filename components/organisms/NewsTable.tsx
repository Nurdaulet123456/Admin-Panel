import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";

const NewsTable = () => {
  return (
    <div className="main_table">
      <div className="main_table-title">Новости</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Тип</Th>
              <Th>Фото</Th>
              <Th>Текст</Th>
              <Th>Дата</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          <Tr>
            <Td>1</Td>
            <Td>Content</Td>
            <Td>Content</Td>
            <Td>Content</Td>
            <Td>Content</Td>
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
            <Td>Content</Td>
            <Td>Content</Td>
            <Td>Content</Td>
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

export default NewsTable;
