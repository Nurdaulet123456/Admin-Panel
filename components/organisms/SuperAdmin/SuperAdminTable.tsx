import { FC } from "react";
import { ISchoolInfo } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getSchoolThunk } from "@/store/thunks/schoolnfo.thunk";

interface IProps {
  school?: ISchoolInfo[];
}

const SuperAdminTable: FC<IProps> = ({ school }) => {
  const dispatch = useAppDispatch();
  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/school/${id}`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .then((res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
    dispatch(getSchoolThunk());
  };

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
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.school_kz_name}</Td>
                <Td>
                  <div>
                    <PenIcons />
                  </div>

                  <div onClick={() => handleDeleteItems(item.id)}>
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
