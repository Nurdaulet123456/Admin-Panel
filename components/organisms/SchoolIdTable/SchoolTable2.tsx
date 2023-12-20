import { useAppDispatch } from "@/hooks/useAppDispatch";
import { DeleteIcons, PenIcons } from "../../atoms/Icons";
import { Table, Td, Th, Thead, Tr } from "../../atoms/UI/Tables/Table";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { getSchoolPhotosThunk } from "@/store/thunks/schoolnfo.thunk";

const SchoolTable2 = () => {
  const disptach = useAppDispatch();
  const photos = useTypedSelector((state) => state.system.schoolphotos);

  useEffect(() => {
    if (photos) {
      disptach(getSchoolPhotosThunk());
    }
  }, [disptach]);

  console.log(photos);
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
                <Td>Content</Td>
                <Td>{item.slider_name}</Td>
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

export default SchoolTable2;
