import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  getClassThunk,
  getKruzhokTeachersInfoThunk,
} from "@/store/thunks/schoolnfo.thunk";
import NumberModal from "../modals/NumberModal";
import { getClassNameThunk } from "@/store/thunks/pride.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { IClass } from "@/types/assets.type";

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
  const [showActive, setShowActive] = useState<boolean>(false);
  const [show, setShow] = useState([false, false, false, false, false, false]);

  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [text3, setText3] = useState<string>("");
  const [text4, setText4] = useState<string>("");
  const [text5, setText5] = useState<string>("");
  const [text6, setText6] = useState<string>("");

  const [text, setText] = useState<string>("");
  const [text7, setText7] = useState<string>("");
  const [id, setId] = useState<number>();

  useEffect(() => {
    if (teachers && classname) {
      dispatch(getKruzhokTeachersInfoThunk());
      dispatch(getClassNameThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (classinfoid) {
      setText7((classinfoid.class_name as string) || "");
      setText2((classinfoid.language as string) || "");
      setText1((classinfoid.classroom as string) || "");
      setText((classinfoid.class_teacher as string) || "");
      setText3((classinfoid.osnova_plan as string) || "");
      setText4((classinfoid.osnova_smena as string) || "");
      setText5((classinfoid.dopurok_plan as string) || "");
      setText6((classinfoid.dopurok_smena as string) || "");
    }
  }, [classinfoid]);

  const handleGetTime = (id?: number, text?: string) => {
    if (setId && setShowActive) {
      setId(id);
      setShowActive(false);
      setText(text as string);
    }
  };

  const showModal = (index: number) => {
    const updatedShow = show.map((value, i) => i === index);
    setShow(updatedShow);
  };

  const hideModal = () => {
    setShow([false, false, false, false, false, false]);
  };

  const onSave = async () => {
    if (text1 && id && text7 && text3 && text2 && text4 && text5 && text6) {
      if (!getId) {
        await instance
          .post(
            "/api/class/",
            {
              class_name: text7,
              language: text2,
              classroom: Number(text1),
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
              dispatch(getClassThunk());
            }
          })
          .catch((err) => console.log(err));
      } else {
        await instance
          .put(
            `/api/class/${getId}/`,
            {
              class_name: text7,
              language: text2,
              classroom: Number(text1),
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
              dispatch(getClassThunk());
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
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
          <div>
            <div className="login_forms-label_pink">Классный руководитель</div>
            <Input
              type="text"
              name="end"
              placeholder="смена конец"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {showActive &&
              teachers &&
              teachers.map((item) => (
                <div
                  className="main_table-modal-active"
                  key={item.id}
                  onClick={() => handleGetTime(item.id, item.full_name)}
                >
                  {item.full_name}
                </div>
              ))}
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
          <div>
            <div className="login_forms-label_pink">Кабинет</div>
            <Input
              type="text"
              name="cabinet"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(0)}
              value={text1}
            />

            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText1}
                    setShowActive={hideModal}
                    timeArr={
                      index === 0
                        ? Array.from({ length: 3 }, (_, i) => ({
                            id: i + 1,
                            type: (i + 1).toString(),
                          }))
                        : []
                    }
                  />
                )
            )}
          </div>

          <div>
            <div className="login_forms-label_pink">Оқыту тілі</div>
            <Input
              type="text"
              name="lang"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(1)}
              value={text2}
            />

            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText2}
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

        <div className="label_title">Основной урок</div>
        <div
          className="forms flex"
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "5.2rem",
          }}
        >
          <div>
            <div className="login_forms-label_pink">План звонков</div>
            <Input
              type="text"
              name="plans"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(2)}
              value={text3}
            />

            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText3}
                    setShowActive={hideModal}
                    timeArr={
                      index === 2
                        ? Array.from({ length: 20 }, (_, i) => ({
                            id: i + 1,
                            type: (i + 1).toString(),
                          }))
                        : []
                    }
                  />
                )
            )}
          </div>
          <div>
            <div className="login_forms-label_pink">Смена</div>
            <Input
              type="text"
              name="smena"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(3)}
              value={text4}
            />

            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText4}
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
        <div className="label_title">Доп. урок</div>
        <div
          className="forms flex"
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "5.2rem",
          }}
        >
          <div>
            <div className="login_forms-label_pink">План звонков</div>
            <Input
              type="text"
              name="plans2"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(4)}
              value={text5}
            />
            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText5}
                    setShowActive={hideModal}
                    timeArr={
                      index === 4
                        ? Array.from({ length: 20 }, (_, i) => ({
                            id: i + 1,
                            type: (i + 1).toString(),
                          }))
                        : []
                    }
                  />
                )
            )}
          </div>

          <div>
            <div className="login_forms-label_pink">Смена</div>
            <Input
              type="text"
              name="smena2"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => showModal(5)}
              value={text6}
            />

            {show.map(
              (isShown, index) =>
                isShown && (
                  <NumberModal
                    key={index}
                    setText={setText6}
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
        <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ClassTableBlock;
