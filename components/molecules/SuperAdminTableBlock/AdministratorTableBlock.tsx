import { useModalLogic } from "@/hooks/useModalLogic";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SanatyModalModal from "@/components/modals/SanatyModal";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { getIASchoolThunk } from "@/store/thunks/available.thunk";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { getUsersThunk } from "@/store/thunks/schoolnfo.thunk";
import SuccessModal from "@/components/modals/SuccessModal";
import ErrorModal from "@/components/modals/ErrorModal";
import { IUsers } from "@/types/assets.type";

interface UpdateInputProps {
  username?: string;
  password?: string;
  email?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  usersid?: IUsers;
  getId?: number;
}

const AdministratorTableBlock: FC<IProps> = ({
  onReject,
  getId,
  usersid,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const school = useTypedSelector((state) => state.ia.iaschool);

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    username: "",
    password: "",
    email: "",
  });

  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [showActive, setShowActive] = useState<boolean>(false);

  useEffect(() => {
    if (school) {
      dispatch(getIASchoolThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    if (usersid) {
      setUpdateInput({
        username: usersid.username || "",
        email: usersid.email || "",
      });
    }
  }, [usersid]);

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    try {
      if (
        !updateInput.password ||
        !updateInput.username ||
        !updateInput.email ||
        !id
      ) {
        showError();
        return;
      }

      if (
        updateInput.password &&
        updateInput.username &&
        updateInput.email &&
        id
      ) {
        if (!getId) {
          await instance
            .post(
              "/auth/users/",
              {
                email: updateInput.email,
                username: updateInput.username,
                password: updateInput.password,
                school: id,
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
                dispatch(getUsersThunk());
                // onReject(false);
                setUpdateInput({
                  username: "",
                  email: "",
                  password: "",
                });

                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
            });
        } else {
          await instance
            .put(
              `/auth/users/${getId}/`,
              {
                email: updateInput.email,
                // username: updateInput.username,
                password: updateInput.password,
                school: id,
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
                dispatch(getUsersThunk());
                // onReject(false);
                setUpdateInput({
                  username: "",
                  email: "",
                  password: "",
                });

                if (showSuccessModal && onReject) {
                  onReject(false);
                }
              }
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
        <div className="main_table-modal_title">Админстраторы</div>

        <div>
          <div className="main_table-modal_forms" style={{ width: "100%" }}>
            <div className="forms flex" style={{ gap: "1.6rem" }}>
              <div style={{ width: "75%" }}>
                <div className="login_forms-label_pink">Username *</div>

                <Input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={updateInput.username}
                  onChange={(e) => onChangeUpdateInput(e)}
                />
              </div>

              <div style={{ width: "75%" }}>
                <div className="login_forms-label_pink">Email *</div>

                <Input
                  type="email"
                  placeholder="admin@aa11"
                  name="email"
                  value={updateInput.email}
                  onChange={(e) => onChangeUpdateInput(e)}
                />
              </div>

              <div>
                <div className="login_forms-label_pink">Пароль</div>

                <Input
                  type="password"
                  placeholder="пароль"
                  name="password"
                  value={updateInput.password}
                  onChange={(e) => onChangeUpdateInput(e)}
                />
              </div>
            </div>

            <div className="sanaty" style={{ width: "40%" }}>
              <div className="login_forms-label_pink">Школа</div>
              <Input
                type="text"
                name="school"
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
                      school
                        ? school.map((item) => ({
                            id: item.id,
                            type: item.school_kz_name,
                          }))
                        : []
                    }
                  />
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

export default AdministratorTableBlock;
