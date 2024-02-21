import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getNewsThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps {
  handleClickGetId?: (id?: number) => void;
}

const NewsTable: FC<IProps> = ({ handleClickGetId }) => {
  const dispatch = useAppDispatch();
  const news = useTypedSelector((state) => state.pride.news);

  useEffect(() => {
    if (news) {
      dispatch(getNewsThunk());
    }
  }, [dispatch]);
  console.log(news)

  const onDelete = async (id: number) => {
    await instance
      .delete(`/api/newsApi/${id}`, {
        headers: {
          Authorization: `Token ${getTokenInLocalStorage()}`,
        },
      })
      .catch((e) => console.log(e));

    dispatch(getNewsThunk());
  };

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

          {news &&
            news.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.type}</Td>
                <Td>
                  <div className="img-block" key={index + 1}>
                    <img
                      className="img"
                      src={item!.photos?.[0]}
                      alt={item!.photos?.[0]}
                    />
                  </div>
                </Td>
                <Td>{item.text?.slice(0, 30)}...</Td>
                <Td>{item.date}</Td>
                <Td style={{ alignItems: "center" }}>
                  <div
                    onClick={() =>
                      handleClickGetId && handleClickGetId(item.id)
                    }
                  >
                    <PenIcons />
                  </div>

                  <div onClick={() => onDelete(item.id as number)}>
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

export default NewsTable;
