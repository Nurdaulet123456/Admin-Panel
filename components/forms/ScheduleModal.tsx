import { FC, use, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getIAClassRoomThunk,
  getIAClassThunk,
  getIARingThunk,
  getIASchoolThunk,
  getIASubjectThunk,
  getIATypeZThunk,
  getScheduleThunk,
} from "@/store/thunks/available.thunk";
import SanatyModalModal from "../modals/SanatyModal";
import { getKruzhokTeachersInfoThunk } from "@/store/thunks/schoolnfo.thunk";
import { useRouter } from "next/router";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage, getWeekDayNumber } from "@/utils/assets.utils";

interface IProps {
  onReject?: () => void;
  selectedCell?: any;
  classnames?: string;
}

const ScheduleModal: FC<IProps> = ({ onReject, selectedCell, classnames }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const iaschool = useTypedSelector((state) => state.ia.iaschool);
  const iaclass = useTypedSelector((state) => state.ia.iaclass);
  const iaclassrooms = useTypedSelector((state) => state.ia.iaclassrooms);
  const iatypez = useTypedSelector((state) => state.ia.iatypez);
  const iaring = useTypedSelector((state) => state.ia.iaring);
  const iasubject = useTypedSelector((state) => state.ia.iasubject);
  const teachers = useTypedSelector((state) => state.system.teachers);

  const [showActive, setShowActive] = useState<boolean>(false);
  const [showActive2, setShowActive2] = useState<boolean>(false);
  const [showActive3, setShowActive3] = useState<boolean>(false);
  const [showActive4, setShowActive4] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  const [text2, setText2] = useState<string>("");
  const [id2, setId2] = useState<number>();

  const [text3, setText3] = useState<string>("");
  const [id3, setId3] = useState<number>();

  const [text4, setText4] = useState<string>("");
  const [id4, setId4] = useState<number>();

  useEffect(() => {
    if (
      iaschool &&
      iaclass &&
      iaclassrooms &&
      iatypez &&
      iaring &&
      iasubject &&
      teachers
    ) {
      dispatch(getIASchoolThunk());
      dispatch(getIAClassRoomThunk());
      dispatch(getIAClassThunk(router.asPath?.split("/")?.at(-1)));
      dispatch(getIATypeZThunk());
      dispatch(getIASubjectThunk());
      dispatch(getKruzhokTeachersInfoThunk());
    }
  }, [dispatch]);

  const handelClickOpen = () => {
    setShowActive(!showActive);
    setShowActive2(false);
    setShowActive3(false);
    setShowActive4(false);
  };

  const handelClickOpen2 = () => {
    setShowActive(false);
    setShowActive2(!showActive2);
    setShowActive3(false);
    setShowActive4(false);
  };

  const handelClickOpen3 = () => {
    setShowActive(false);
    setShowActive2(false);
    setShowActive3(!showActive3);
    setShowActive4(false);
  };

  const handelClickOpen4 = () => {
    setShowActive(false);
    setShowActive2(false);
    setShowActive3(false);
    setShowActive4(!showActive4);
  };

  const onSave = async () => {
    await instance
      .post(
        "/api/schedule/",
        {
          week_day: getWeekDayNumber(selectedCell.day),
          teacher: id2,
          ring: selectedCell.timeId,
          classl: iaclass && iaclass[0].id,
          subject: id,
          classroom: id3,
          typez: id4,
        },
        {
          headers: {
            Authorization: `Token ${getTokenInLocalStorage()}`,
          },
        }
      )
      .then((res) => {
        if (res && onReject) {
          dispatch(getScheduleThunk());
          onReject();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal>
        <ModalInner>
          <ModalContent>
            <div className="modal_header">Расписание</div>

            <div className="modal_body">
              <div className="forms flex-grid">
                <div>День недели:</div>
                <span>{selectedCell.day}</span>
              </div>

              <div className="forms flex-grid">
                <div>Класс:</div>
                <span>{classnames?.split("")?.join(" ")}</span>
              </div>

              <div className="forms flex-grid">
                <div>Время:</div>
                <span>
                  {selectedCell.start_time}-{selectedCell.end_time}
                </span>
              </div>

              <div className="forms flex-grid">
                <div>Предмет:</div>
                <div className="sanaty">
                  <Input
                    type="text"
                    name="pred"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                    onClick={() => handelClickOpen()}
                    value={text}
                  />

                  <div
                    className="sanaty_dropdown"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    {showActive && (
                      <SanatyModalModal
                        setText={setText}
                        setId={setId}
                        setShowActive={setShowActive}
                        timeArr={
                          iasubject
                            ? iasubject.map((item, index) => ({
                                id: item.id as number,
                                type: item.full_name as string,
                              }))
                            : []
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Преподаватель:</div>
                <div className="sanaty">
                  <Input
                    type="text"
                    name="pred"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                    onClick={() => handelClickOpen2()}
                    value={text2}
                  />

                  <div
                    className="sanaty_dropdown"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    {showActive2 && (
                      <SanatyModalModal
                        setText={setText2}
                        setId={setId2}
                        setShowActive={setShowActive2}
                        timeArr={
                          teachers
                            ? teachers.map((item) => {
                                return {
                                  id: item.id as number,
                                  type: item.full_name as string,
                                };
                              })
                            : []
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Кабинет:</div>
                <div className="sanaty">
                  <Input
                    type="text"
                    name="pred"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                    onClick={() => handelClickOpen3()}
                    value={text3}
                  />

                  <div
                    className="sanaty_dropdown"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    {showActive3 && (
                      <SanatyModalModal
                        setText={setText3}
                        setId={setId3}
                        setShowActive={setShowActive3}
                        timeArr={
                          iaclassrooms
                            ? iaclassrooms.map((item) => {
                                return {
                                  id: item.id as number,
                                  type: item.classroom_name as string,
                                };
                              })
                            : []
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Тип занятия:</div>
                <div className="sanaty">
                  <Input
                    type="text"
                    name="pred"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                    onClick={() => handelClickOpen4()}
                    value={text4}
                  />

                  <div
                    className="sanaty_dropdown"
                    style={{ textAlign: "center", width: "100%" }}
                  >
                    {showActive4 && (
                      <SanatyModalModal
                        setText={setText4}
                        setId={setId4}
                        setShowActive={setShowActive4}
                        timeArr={
                          iatypez
                            ? iatypez.map((item, index) => ({
                                id: item.id as number,
                                type: item.type_full_name as string,
                              }))
                            : []
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal_footer">
              <Button
                background="#CACACA"
                radius="14px"
                color="#645C5C"
                style={{ width: "auto" }}
                onClick={onReject}
              >
                Удалить
              </Button>
              <Button
                background="#27AE60"
                radius="14px"
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: ".8rem",
                }}
                onClick={onSave}
              >
                Сохранить
              </Button>
            </div>
          </ModalContent>
        </ModalInner>
      </Modal>
    </>
  );
};

export default ScheduleModal;
