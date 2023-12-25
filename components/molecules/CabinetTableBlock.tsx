import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FC,
  useEffect,
} from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { instance } from "@/api/axios.instance";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getClassRoomThunk } from "@/store/thunks/schoolnfo.thunk";
import { IClassRoom } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";

interface IUpdateInputProps {
  name?: string;
  gr?: string;
  floor?: string;
  corpuse?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  setEditActive?: Dispatch<SetStateAction<boolean>>;
  cabinetid?: IClassRoom;
  getId?: number;
}

const CabinetTableBlock: FC<IProps> = ({
  onReject,
  getId,
  cabinetid,
  setEditActive,
}) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<IUpdateInputProps>({
    name: "",
    gr: "",
    floor: "",
    corpuse: "",
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
    if (cabinetid) {
      setUpdateInput({
        name: cabinetid.classroom_name || "",
        gr: String(cabinetid.classroom_number) || "",
        floor: String(cabinetid.flat) || "",
        corpuse: String(cabinetid.korpus) || "",
      });
    }
  }, [cabinetid]);

  const onChangeUpdateInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    try {
      if (!updateInput.gr || !updateInput.floor) {
        showError();
        return;
      }

      if (updateInput.gr && updateInput.floor) {
        if (!getId) {
          await instance
            .post(
              "/api/classroom/",
              {
                classroom_name: updateInput.name,
                classroom_number: Number(updateInput.gr),
                flat: Number(updateInput.floor),
                korpus: Number(updateInput.corpuse),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                dispatch(getClassRoomThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  gr: "",
                  floor: "",
                  corpuse: "",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          await instance
            .put(
              `/api/classroom/${getId}/`,
              {
                classroom_name: updateInput.name,
                classroom_number: Number(updateInput.gr),
                flat: Number(updateInput.floor),
                korpus: Number(updateInput.corpuse),
              },
              {
                headers: {
                  Authorization: `Token ${getTokenInLocalStorage()}`,
                },
              }
            )
            .then((res) => {
              if (res) {
                dispatch(getClassRoomThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  gr: "",
                  floor: "",
                  corpuse: "",
                });
              }
            })
            .catch((e) => {
              console.log(e);
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
        <div className="main_table-modal_title">Кабинет</div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Наименование *</div>

            <Input
              type="text"
              placeholder="наименование"
              name="name"
              value={updateInput.name}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="flex">
            <div className="forms">
              <div className="login_forms-label_pink">
                Номер (кабинет номері)
              </div>
              <Input
                type="number"
                placeholder="кабинет номері: пример 305"
                name="gr"
                value={updateInput.gr}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Этаж</div>
              <Input
                type="number"
                placeholder="этаж:2"
                name="floor"
                value={updateInput.floor}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Корпус</div>
              <Input
                type="number"
                placeholder="корпус:2"
                name="corpuse"
                value={updateInput.corpuse}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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
              getId
                ? setEditActive && setEditActive(false)
                : onReject && onReject(false)
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

export default CabinetTableBlock;
