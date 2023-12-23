import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import NumberModal from "@/components/modals/NumberModal";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getOSThunk } from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ICalls } from "@/types/assets.type";

interface UpdateInputProps {
  start?: string;
  end?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  osid?: ICalls;
  getId?: number;
}

const CallsTableBlock1: FC<IProps> = ({ onReject, osid, getId, onEdit }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState([false, false, false]);
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [text3, setText3] = useState<string>("");

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    start: "",
    end: "",
  });

  const showModal = (index: number) => {
    const updatedShow = show.map((value, i) => i === index);
    setShow(updatedShow);
  };

  const hideModal = () => {
    setShow([false, false, false]);
  };

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (osid) {
      setUpdateInput({
        start: osid.start_time || "",
        end: osid.end_time || "",
      });

      setText1((String(osid.plan) as string) || "");
      setText2((String(osid.number) as string) || "");
      setText3((String(osid.smena) as string) || "");
    }
  }, [osid]);

  const onSave = async () => {
    if (updateInput.start && updateInput.end && text1 && text2 && text3) {
      if (!getId) {
        await instance
          .post(
            "/api/ringApi/",
            {
              plan: String(text1),
              number: String(text2),
              smena: String(text3),
              start_time: updateInput.start,
              end_time: updateInput.end,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch(getOSThunk());
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await instance
          .put(
            `/api/ringApi/${getId}/`,
            {
              plan: Number(text1),
              number: Number(text2),
              smena: Number(text3),
              start_time: updateInput.start,
              end_time: updateInput.end,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res) {
              dispatch(getOSThunk());
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="main_table-modal">
      <div className="login_forms-label_pink">Основной урок</div>
      <div className="main_table-modal_forms">
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

          <div>
            <div className="login_forms-label_pink">Номер урока</div>
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

          <div>
            <div>
              <div className="login_forms-label_pink">Смена</div>
              <Input
                type="text"
                name="end"
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
                          ? Array.from({ length: 4 }, (_, i) => ({
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

        <div className="forms">
          <div className="login_forms-label_pink">Смена начало</div>

          <Input
            type="text"
            placeholder="смена начало"
            name="start"
            value={updateInput.start}
            onChange={(e) => onChangeUpdateInput(e)}
          />
        </div>

        <div className="forms">
          <div className="login_forms-label_pink">Смена конец</div>

          <Input
            type="text"
            placeholder="смена конец"
            name="end"
            value={updateInput.end}
            onChange={(e) => onChangeUpdateInput(e)}
          />
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

export default CallsTableBlock1;
