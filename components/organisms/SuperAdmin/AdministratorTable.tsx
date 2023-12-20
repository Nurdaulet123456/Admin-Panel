import { IUsers } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { FC } from "react";

interface IProps {
  users?: IUsers[];
}

const AdministratorTable: FC<IProps> = ({ users }) => {
  return (
    <div className="main_table">
      <div className="main_table-title">Школы</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Admin</Th>
              <Th>Школа</Th>
              <Th>URL</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {users &&
            users.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{item.email}</Td>
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
            ))}
        </Table>
      </div>
    </div>
  );
};

export default AdministratorTable;
