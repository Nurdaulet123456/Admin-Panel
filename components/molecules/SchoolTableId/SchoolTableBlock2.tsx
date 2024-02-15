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
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {getSchoolAdminThunk, getSchoolPhotosThunk} from "@/store/thunks/schoolnfo.thunk";
import { ISchoolPhotos } from "@/types/assets.type";
import { useModalLogic } from "@/hooks/useModalLogic";
import ErrorModal from "@/components/modals/ErrorModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {useFormik} from "formik";
import * as Yup from "yup";

interface UpdateInputProps {
  name?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  photosid?: ISchoolPhotos;
  getId?: number;
}

const SchoolTableBlock2: FC<IProps> = ({
  onReject,
  onEdit,
  photosid,
  getId,
}) => {
  const dispatch = useAppDispatch();

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    name: "",
    file: null,
  });

  const {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  } = useModalLogic();

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setUpdateInput({
        ...updateInput,
        [name]: files?.[0],
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (photosid) {
      setUpdateInput({
        name: photosid.slider_name || "",
        file: null,
      });
    }
  }, [photosid]);

  const onSave = async () => {
    try {
      if (!updateInput.name || !updateInput.file) {
        showError();
        return;
      }

      if (updateInput.name && updateInput.file) {
        const formData = new FormData();
        formData.append("slider_name", updateInput.name);
        formData.append("slider_photo", updateInput.file);

        if (!getId) {
          await instance
            .post("/api/slider/", formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  file: null,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          await instance
            .put(`/api/slider/${getId}/`, formData, {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res) {
                dispatch(getSchoolPhotosThunk());
                showSuccess();
                setUpdateInput({
                  name: "",
                  file: null,
                });
              }
            })
            .catch((err) => {
              console.log(err);
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
        <div className="main_table-modal_title">Фото-суреттер</div>
        <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
          <div className="main_table-modal_forms">
            <div className="forms">
              <div className="login_forms-label_pink">Название</div>

              <Input
                type="text"
                placeholder="название"
                name="name"
                value={updateInput.name}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div className="forms">
              <div className="login_forms-label_pink">Фото *</div>
              <Input
                type="file"
                name="file"
                onChange={(e) => onChangeUpdateInput(e)}
                accept=".png, .jpg, .jpeg, .svg"
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

export default SchoolTableBlock2;
