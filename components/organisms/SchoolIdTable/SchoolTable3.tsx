import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolSocialThunk } from "@/store/thunks/schoolnfo.thunk";

const SchoolTable3 = () => {
  const dispatch = useAppDispatch();
  const media = useTypedSelector((state) => state.system.schoolsocial);

  useEffect(() => {
    if (media) {
      dispatch(getSchoolSocialThunk());
    }
  }, [dispatch]);

  return (
    <div className="main_table">
      <div className="main_table-title">Меню</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>ТИП</Th>
              <Th>URL</Th>
              <Th>Наименование</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {media &&
            media.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.type}</Td>
                <Td>Content</Td>
                <Td>{item.account_name}</Td>
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

export default SchoolTable3;
