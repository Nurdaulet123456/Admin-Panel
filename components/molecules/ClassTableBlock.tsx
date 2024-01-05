import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getClassThunk,
  getKruzhokTeachersInfoThunk,
} from "@/store/thunks/schoolnfo.thunk";
import { getClassNameThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { IClass } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";
import { getIAClassRoomThunk } from "@/store/thunks/available.thunk";

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onReject?: Dispatch<SetStateAction<boolean>>;
  classinfoid?: IClass;
  getId?: number;
}

const ClassTableBlock: FC<IProps> = ({
  onReject,
  onEdit,
  getId,
  classinfoid,
}) => {
  const dispatch = useAppDispatch();
  const teachers = useTypedSelector((state) => state.system.teachers);
  const classname = useTypedSelector((state) => state.pride.classname);
  const classroom = useTypedSelector((state) => state.ia.iaclassrooms);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [show, setShow] = useState([false, false, false, false, false, false]);

  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [text3, setText3] = useState<string>("");
  const [text4, setText4] = useState<string>("");
  const [text5, setText5] = useState<string>("");
  const [text6, setText6] = useState<string>("");

  const [id1, setId1] = useState<number>();
  const [id2, setId2] = useState<number>();
  const [id3, setId3] = useState<number>();
  const [id4, setId4] = useState<number>();
  const [id5, setId5] = useState<number>();
  const [id6, setId6] = useState<number>();

  const [text, setText] = useState<string>("");
  const [text7, setText7] = useState<string>("");
  const [id, setId] = useState<number>();

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (teachers && classname && classroom) {
      dispatch(getKruzhokTeachersInfoThunk());
      dispatch(getClassNameThunk());
      dispatch(getIAClassRoomThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (classinfoid) {
      setText7((classinfoid.class_name as string) || "");
      setText2((classinfoid.language as string) || "");
      setText1((classinfoid.classroom.classroom_name as string) || "");
      setText((classinfoid.class_teacher.full_name as string) || "");
      setText3((classinfoid.osnova_plan as string) || "");
      setText4((classinfoid.osnova_smena as string) || "");
      setText5((classinfoid.dopurok_plan as string) || "");
      setText6((classinfoid.dopurok_smena as string) || "");
    }
  }, [classinfoid]);

  const showModal = (index: number) => {
    const updatedShow = show.map((value, i) => i === index);
    setShow(updatedShow);
  };

  const hideModal = () => {
    setShow([false, false, false, false, false, false]);
  };

  const onSave = async () => {
    try {
      if (
        !text1 ||
        !text2 ||
        !text3 ||
        !text4 ||
        !text5 ||
        !text6 ||
        !text7 ||
        !id ||
        !text
      ) {
        showError();
        return;
      }

      if (text1 && id && text7 && text3 && text2 && text4 && text5 && text6) {
        if (!getId) {
          await instance
            .post(
              "/api/class/",
              {
                class_name: text7,
                language: text2,
                classroom: id1,
                class_teacher: id,
                osnova_plan: Number(text3),
                osnova_smena: Number(text4),
                dopurok_plan: Number(text5),
                dopurok_smena: Number(text6),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                showSuccess();
                dispatch(getClassThunk());

                setText("");
                setText1("");
                setText2("");
                setText3("");
                setText4("");
                setText5("");
                setText6("");
                setText7("");
              }
            })
            .catch((err) => showError());
        } else {
          await instance
            .put(
              `/api/class/${getId}/`,
              {
                class_name: text7,
                language: text2,
                classroom: id1,
                class_teacher: id,
                osnova_plan: Number(text3),
                osnova_smena: Number(text4),
                dopurok_plan: Number(text5),
                dopurok_smena: Number(text6),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                showSuccess();
                dispatch(getClassThunk());

                setText("");
                setText2("");
                setText3("");
                setText4("");
                setText5("");
                setText6("");
                setText7("");
              }
            })
            .catch((err) => showError());
        }
      }
    } catch (error) {
      console.error(error);
      showError();
    }
  };

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Класс</div>

            <Input
              type="text"
              name="teacher"
              onChange={(e) => setText7(e.target.value)}
              placeholder="класс"
              value={text7}
            />
          </div>

          <div className="forms">
            <div className="sanaty">
              <div className="login_forms-label_pink">
                Классный руководитель
              </div>
              <Input
                type="text"
                name="end"
                placeholder="классный руководитель"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => setShowActive(!showActive)}
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
                      teachers
                        ? teachers?.map((item, i) => ({
                            id: item.id,
                            type: item.full_name,
                          }))
                        : []
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="forms flex"
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "5.2rem",
            }}
          >
            <div className="sanaty">
              <div className="login_forms-label_pink">Кабинет</div>
              <Input
                type="text"
                name="cabinet"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(0)}
                value={text1}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText1}
                        setId={setId1}
                        setShowActive={hideModal}
                        timeArr={
                          index === 0 && classroom
                            ? classroom?.map((item) => ({
                                id: item.id as number,
                                type: item.classroom_name as string,
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>

            <div className="sanaty">
              <div className="login_forms-label_pink">Оқыту тілі</div>
              <Input
                type="text"
                name="lang"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(1)}
                value={text2}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText2}
                        setId={setId2}
                        setShowActive={hideModal}
                        timeArr={
                          index === 1
                            ? ["KZ", "RU"].map((item, index) => ({
                                id: index + 1,
                                type: item,
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>
          </div>

          <div className="label_title">Основной урок</div>
          <div
            className="forms flex"
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "5.2rem",
            }}
          >
            <div className="sanaty">
              <div className="login_forms-label_pink">План звонков</div>
              <Input
                type="text"
                name="plans"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(2)}
                value={text3}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText3}
                        setId={setId3}
                        setShowActive={hideModal}
                        timeArr={
                          index === 2
                            ? Array.from({ length: 10 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>
            <div className="sanaty">
              <div className="login_forms-label_pink">Смена</div>
              <Input
                type="text"
                name="smena"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(3)}
                value={text4}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText4}
                        setId={setId4}
                        setShowActive={hideModal}
                        timeArr={
                          index === 3
                            ? Array.from({ length: 5 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>
          </div>
          <div className="label_title">Доп. урок</div>
          <div
            className="forms flex"
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: "5.2rem",
            }}
          >
            <div className="sanaty">
              <div className="login_forms-label_pink">План звонков</div>
              <Input
                type="text"
                name="plans2"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(4)}
                value={text5}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText5}
                        setId={setId5}
                        setShowActive={hideModal}
                        timeArr={
                          index === 4
                            ? Array.from({ length: 10 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>

            <div className="sanaty">
              <div className="login_forms-label_pink">Смена</div>
              <Input
                type="text"
                name="smena2"
                readOnly={true}
                style={{ cursor: "pointer" }}
                onClick={() => showModal(5)}
                value={text6}
              />
              <div
                className="sanaty_dropdown"
                style={{ textAlign: "center", width: "100%" }}
              >
                {show.map(
                  (isShown, index) =>
                    isShown && (
                      <SanatyModalModal
                        key={index}
                        setText={setText6}
                        setId={setId6}
                        setShowActive={hideModal}
                        timeArr={
                          index === 5
                            ? Array.from({ length: 5 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex"
          style={{ justifyContent: "flex-end", gap: "1.6rem" }}
        >
          <Button
            background="#CACACA"
            color="#645C5C"
            style={{ width: "auto" }}
            onClick={() =>
              getId ? onEdit && onEdit(false) : onReject && onReject(false)
            }
          >
            Удалить
          </Button>
          <Button
            background="#27AE60"
            style={{ width: "auto" }}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClassTableBlock;
