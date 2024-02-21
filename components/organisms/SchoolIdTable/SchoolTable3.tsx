import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolSocialThunk } from "@/store/thunks/schoolnfo.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdDop?: (id?: number) => void;
}

const SchoolTable3: FC<IProps> = ({ handleClickGetIdDop }) => {
  const dispatch = useAppDispatch();
  const media = useTypedSelector((state) => state.system.schoolsocial);

  useEffect(() => {
    if (media) {
      dispatch(getSchoolSocialThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/School_SocialMediaApi/${id}`, {
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
    dispatch(getSchoolSocialThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Әлеуметтік желілер</div>

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
                  <div
                    onClick={() =>
                      handleClickGetIdDop && handleClickGetIdDop(item.id)
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

export default SchoolTable3;
