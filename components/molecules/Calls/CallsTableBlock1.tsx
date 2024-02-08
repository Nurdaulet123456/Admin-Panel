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
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getOSThunk } from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ICalls } from "@/types/assets.type";
import SanatyModalModal from "@/components/modals/SanatyModal";
import SuccessModal from "@/components/modals/SuccessModal";
import ErrorModal from "@/components/modals/ErrorModal";
import { useModalLogic } from "@/hooks/useModalLogic";

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

  const [id1, setId1] = useState<number>();
  const [id2, setId2] = useState<number>();
  const [id3, setId3] = useState<number>();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    start: "",
    end: "",
  });

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

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
    if (osid && osid?.plan && osid?.number && osid?.smena) {
      setUpdateInput({
        start: osid.start_time || "",
        end: osid.end_time || "",
      });

      setText1((String(osid?.plan) as string) || "");
      setText2((String(osid?.number) as string) || "");
      setText3((String(osid?.smena) as string) || "");
    }
  }, [osid]);

  const onSave = async () => {
    if (!updateInput.start || !updateInput.end || !text1 || !text2 || !text3) {
      showError();
      return;
    }

    try {
      if (!getId) {
        const res = await instance.post(
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
          },
        );

        if (res) {
          showSuccess();
          dispatch(getOSThunk());
        }
      } else {
        const res = await instance.put(
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
          },
        );

        if (res) {
          showSuccess();
          dispatch(getOSThunk());
        }
      }
    } catch (err) {
      console.error(err);
      showError();
    }
  };
  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
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
            <div className="sanaty">
              <div className="login_forms-label_pink">План звонков</div>
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
                          index === 0
                            ? Array.from({ length: 10 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    ),
                )}
              </div>
            </div>

            <div className="sanaty">
              <div className="login_forms-label_pink">Номер урока</div>
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
                            ? Array.from({ length: 10 }, (_, i) => ({
                                id: i + 1,
                                type: (i + 1).toString(),
                              }))
                            : []
                        }
                      />
                    ),
                )}
              </div>
            </div>

            <div className="sanaty">
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
                              ? Array.from({ length: 4 }, (_, i) => ({
                                  id: i + 1,
                                  type: (i + 1).toString(),
                                }))
                              : []
                          }
                        />
                      ),
                  )}
                </div>
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
          <Button
            background="#27AE60"
            style={{ width: "auto" }}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </div>{" "}
    </>
  );
};

export default CallsTableBlock1;
