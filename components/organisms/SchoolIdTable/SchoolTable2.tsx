import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { FC, useEffect } from "react";
import { getSchoolPhotosThunk } from "@/store/thunks/schoolnfo.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface IProps{
  handleClickGetId2?: (id?: number) => void;
}

const SchoolTable2: FC<IProps> = ({handleClickGetId2}) => {
  const disptach = useAppDispatch();
  const photos = useTypedSelector((state) => state.system.schoolphotos);

  useEffect(() => {
    if (photos) {
      disptach(getSchoolPhotosThunk());
    }
  }, [disptach]);

  const handleDeleteItems = async (id?: number) => {
    await instance
      .delete(`/api/slider/${id}`, {
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
    disptach(getSchoolPhotosThunk());
  };

  return (
    <div className="main_table">
      <div className="main_table-title">Фото-суреттер</div>

      <div className="main_table-block">
        <Table>
          <Thead>
            <tr>
              <Th>No</Th>
              <Th>Фотографии</Th>
              <Th>Название</Th>
              <Th>Действие</Th>
            </tr>
          </Thead>

          {photos &&
            photos.map((item, index) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <div className="img-block">
                    <img src={item.slider_photo} alt={item.slider_photo} />
                  </div>
                </Td>
                <Td>{item.slider_name}</Td>
                <Td>
                  <div onClick={() => handleClickGetId2 && handleClickGetId2(item.id)}>
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

export default SchoolTable2;
