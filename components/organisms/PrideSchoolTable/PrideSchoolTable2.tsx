import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolOnerThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetIdOner?: (id?: number) => void;
}

const PrideSchoolTable2: FC<IProps> = ({ handleClickGetIdOner }) => {
  const dispatch = useAppDispatch();
  const oner = useTypedSelector((state) => state.pride.oner);

  useEffect(() => {
    if (oner) {
      dispatch(getSchoolOnerThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://bilimge.kz/admins/api/Oner_SuccessApi/${id}`, {
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
    dispatch(getSchoolOnerThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Өнер</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фото</Th>
              <Th>ФИО</Th>
              <Th>Текст</Th>
              <Th>Класс</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {oner &&
            oner.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <div className="img-block">
                    <img src={item.photo} alt={item.photo} />
                  </div>
                </Td>
                <Td>{item.fullname}</Td>
                <Td>{item.student_success}</Td>
                <Td>{item.classl} класс</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetIdOner && handleClickGetIdOner(item.id)
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

export default PrideSchoolTable2;
