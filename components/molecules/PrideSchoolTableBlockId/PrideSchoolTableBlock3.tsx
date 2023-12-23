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
import {
  getClassNameThunk,
  getSchoolOlimpThunk,
} from "@/store/thunks/pride.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolOlimp } from "@/types/assets.type";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import ClassNamesModal from "@/components/modals/ClassNames";

interface UpdateInputProps {
  fullname: string;
  text?: string;
  class?: string;
  file: any;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  onEdit?: Dispatch<SetStateAction<boolean>>;
  olimpid?: ISchoolOlimp;
  getId?: number;
}

const PrideSchoolTableBlock3: FC<IProps> = ({
  onReject,
  onEdit,
  olimpid,
  getId,
}) => {
  const dispatch = useAppDispatch();
  const clasname = useTypedSelector((state) => state.pride.classname);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [id, setId] = useState<number>();
  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    fullname: "",
    text: "",
    class: "",
    file: null,
  });

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setUpdateInput({
        ...updateInput,
        file: files?.[0] || null,
      });
    } else {
      setUpdateInput({
        ...updateInput,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (olimpid) {
      setUpdateInput({
        fullname: olimpid.fullname || "",
        file: null,
        text: olimpid.student_success || "",
        class: olimpid.classl || "",
      });

      setText(olimpid.classl || "");
    }
  }, [olimpid]);

  const onSave = async () => {
    if (updateInput.fullname && updateInput.text && id && updateInput.file) {
      const formData = new FormData();
      formData.append("fullname", updateInput.fullname);
      formData.append("photo", updateInput.file);
      formData.append("student_success", updateInput.text);
      formData.append("classl", String(id));

      if (!getId) {
        await instance
          .post("/api/PandikOlimpiadaApi/", formData, {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res) {
              dispatch(getSchoolOlimpThunk());
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await instance
          .put(`/api/PandikOlimpiadaApi/${getId}/`, formData, {
            headers: {
              Authorization: `Token ${getTokenInLocalStorage()}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res) {
              dispatch(getSchoolOlimpThunk());
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  useEffect(() => {
    if (clasname) {
      dispatch(getClassNameThunk());
    }
  }, [dispatch]);

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Должность</div>
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Фото *</div>
          <Input
            type="file"
            name="file"
            onChange={(e) => onChangeUpdateInput(e)}
            accept=".png, .jpg, .jpeg, .svg"
          />
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">ФИО *</div>

            <Input
              type="text"
              placeholder="ФИО"
              name="fullname"
              value={updateInput.fullname}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Текст</div>

            <Input
              type="text"
              placeholder="текст"
              name="text"
              value={updateInput.text}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Класс</div>

            <Input
              type="text"
              name="teacher"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            <div className="main_table-modal-active-block">
              {showActive && (
                <ClassNamesModal
                  setText={setText}
                  setShowActive={setShowActive}
                  setId={setId}
                  timeArr={(clasname as any[])?.map((item, index) => ({
                    id: item.id,
                    type: item.class_name,
                  }))}
                />
              )}
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
      </div>
    </div>
  );
};

export default PrideSchoolTableBlock3;
