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
import TypeModal from "../../modals/TypeModal";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolSocialThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolSocialMedia } from "@/types/assets.type";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";

interface UpdateInputProps {
  url?: string;
  name?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  socialid?: ISchoolSocialMedia;
  getId?: number;
}

const SchoolTableBlock4: FC<IProps> = ({
  onReject,
  socialid,
  getId,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    url: "",
    name: "",
  });

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  useEffect(() => {
    if (socialid) {
      setUpdateInput({
        url: "",
        name: socialid.account_name || "",
      });

      setText((socialid.type as string) || "");
    }
  }, [socialid]);

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    try {
      if (!updateInput.name || !updateInput.url || !text) {
        showError();
        return;
      }

      if (updateInput.name && updateInput.url) {
        if (!getId) {
          await instance
            .post(
              "/api/School_SocialMediaApi/",
              {
                account_name: updateInput.name,
                type: text.toLowerCase(),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getSchoolSocialThunk());
                showSuccess();
                setText("");
                setUpdateInput({
                  name: "",
                  url: "",
                });
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
        } else {
          await instance
            .put(
              `/api/School_SocialMediaApi/${getId}/`,
              {
                account_name: updateInput.name,
                type: text.toLowerCase(),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              },
            )
            .then((res) => {
              if (res) {
                dispatch(getSchoolSocialThunk());
                showSuccess();
                setText("");
                setUpdateInput({
                  name: "",
                  url: "",
                });
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
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
          <div className="main_table-modal_upload sanaty">
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

          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">URL</div>

              <Input
                type="text"
                placeholder="url"
                name="url"
                value={updateInput.url}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Наименование</div>

              <Input
                type="text"
                placeholder="@fkffk.kd"
                name="name"
                value={updateInput.name}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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

export default SchoolTableBlock4;
