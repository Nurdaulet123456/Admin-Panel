  import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { ColorBlock } from "../atoms/UI/Blocks/Block";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { getExtraThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  handleClickGetId?: (id?: number) => void;
}

const TypeLessonsTable: FC<IProps> = ({ onEdit, handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const extra = useTypedSelector((state) => state.pride.extra);

  useEffect(() => {
    if (extra) {
      dispatch(getExtraThunk());
    }
  }, [dispatch]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`https://www.bilimge.kz/admins/api/extra_lesson/${id}`, {
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
    dispatch(getExtraThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Тип занятий</div>
      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Наименование</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {extra &&
            extra.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.type_full_name}</Td>
                <Td>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
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

export default TypeLessonsTable;
