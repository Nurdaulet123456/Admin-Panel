import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getNewsThunk } from "@/store/thunks/pride.thunk";
import { INews } from "@/types/assets.type";
import SanatyModalModal from "../modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";

interface UpdateInputProps {
  text?: string;
  date?: string;
  file?: any;
}

interface IProps {
  onEdit?: Dispatch<SetStateAction<boolean>>;
  onReject?: Dispatch<SetStateAction<boolean>>;
  newsid?: INews;
  getId?: number;
}

const NewsTableBlock: FC<IProps> = ({ onEdit, onReject, newsid, getId }) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({});

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      setUpdateInput({
        ...updateInput,
        [name]: Array.from(fileInput.files || []),
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (newsid) {
      setUpdateInput({
        text: newsid.text || "",
        date: newsid.date || "",
      });

      setText((newsid.type as string) || "");
    }
  }, [newsid]);

  const onSave = async () => {
    try {
      if (
        !updateInput.date ||
        !updateInput.text ||
        !updateInput.file ||
        !text
      ) {
        showError();
        return;
      }

      if (updateInput.date && updateInput.text && updateInput.file && text) {
        if (!getId) {
          await instance
            .post(
              "/api/newsApi/",
              {
                type: "manual",
                photos: updateInput.file,
                text: text,
                date: updateInput.date,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());

                showSuccess();
                setUpdateInput({
                  text: "",
                  date: "",
                  file: null,
                });

                setText("");
              }
            })
            .catch((err) => console.log(err));
        } else {
          await instance
            .put(
              `/api/newsApi/${getId}/`,
              {
                type: "manual",
                photos: updateInput.file,
                text: updateInput.text,
                date: updateInput.date,
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                dispatch(getNewsThunk());

                showSuccess();
                setUpdateInput({
                  text: "",
                  date: "",
                  file: null,
                });

                setText("");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } catch (error) {
      showError();
    }
  };

  return (
    <>
      {showErrorModal && <ErrorModal onClose={onErrorModalClose} />}
      {showSuccessModal && <SuccessModal onClose={onSuccessModalClose} />}
      <div className="main_table-modal">
        <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
          <div className="main_table-modal_upload">
            <div style={{ marginBottom: "2.4rem" }} className="sanaty">
              <div className="login_forms-label_pink">Тип</div>
              <Input
                type="text"
                name="eat"
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
                    timeArr={[
                      {
                        id: 1,
                        type: "Instagram",
                      },

                      {
                        id: 2,
                        type: "Facebook",
                      },

                      {
                        id: 3,
                        type: "Youtube",
                      },
                    ]}
                  />
                )}
              </div>
            </div>
            <div className="login_forms-label_pink">Фото *</div>
            <Input
              type="file"
              name="file"
              readOnly={false}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">Уақыты</div>

              <Input
                type="text"
                placeholder="уақыты"
                name="date"
                value={updateInput.date}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Текст</div>

              <TextArea
                rows={10}
                name="text"
                value={updateInput.text}
                onChange={(e) => onChangeUpdateInput(e)}
              />

              <div className="length">0/2000</div>
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
        </div>
      </div>
    </>
  );
};

export default NewsTableBlock;
