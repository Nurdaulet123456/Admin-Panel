import { IUsers } from "@/types/assets.type";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { FC } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getUsersThunk } from "@/store/thunks/schoolnfo.thunk";

interface IProps {
  users?: IUsers[];
  handleClickGetId?: (id?: number) => void;
}

const AdministratorTable: FC<IProps> = ({ users, handleClickGetId }) => {
  const dispatch = useAppDispatch();

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/admin/${id}/`, {
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
    dispatch(getUsersThunk());
  };

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
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.email}</Td>
                <Td>{item.school || "null"}</Td>
                <Td>Content</Td>
                <Td>
                  <div onClick={() => handleClickGetId && handleClickGetId(item.id)}>
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

export default AdministratorTable;
