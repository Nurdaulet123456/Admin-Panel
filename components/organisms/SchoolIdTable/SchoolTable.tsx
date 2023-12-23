import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolAdminThunk } from "@/store/thunks/schoolnfo.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetId1?: (id?: number) => void;
}

const SchoolTable: FC<IProps> = ({ handleClickGetId1 }) => {
  const dispatch = useAppDispatch();
  const admin = useTypedSelector((state) => state.system.schooladmin);

  useEffect(() => {
    if (admin) {
      dispatch(getSchoolAdminThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/school_administration/${id}`, {
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
    dispatch(getSchoolAdminThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Меню</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>ФИО</Th>
              <Th>Фото</Th>
              <Th>Должность</Th>
              <Th>Номер телефона</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {admin &&
            admin.map((item, index) => (
              <Tr key={index + 1}>
                <Td>{index + 1}</Td>
                <Td>{item.administrator_name}</Td>
                <Td>Content</Td>
                <Td>{item.position}</Td>
                <Td>{item.phone_number}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId1 && handleClickGetId1(item.id)
                    }
                  >
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

export default SchoolTable;
