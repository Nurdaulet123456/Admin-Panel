import { FC } from "react";
import { ISchoolInfo } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";

interface IProps {
  school?: ISchoolInfo[];
}

const SuperAdminTable: FC<IProps> = ({ school }) => {
  return (
    <div className="main_table">
      <div className="main_table-title">Школы</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Мектеп списакасы</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {school &&
            school.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{item.school_kz_name}</Td>
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

export default SuperAdminTable;
