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
import { getSchoolThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";
import { ISchoolInfo } from "@/types/assets.type";

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
  getId?: number;
  schoolid?: ISchoolInfo;
  onEdit?: any;
}

interface IUpdateInputProps {
  kz?: string;
  ru?: string;
  eng?: string;
  city?: string;
  url?: string;
  timezone?: string;
}

const SuperAdminTableBlock: FC<IProps> = ({
  onReject,
  getId,
  schoolid,
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const [updateInput, setUpdateInput] = useState<IUpdateInputProps>({
    kz: "",
    ru: "",
    eng: "",
    city: "",
    url: "",
    timezone: "",
  });

  useEffect(() => {
    if (schoolid) {
      setUpdateInput({
        kz: schoolid?.school_kz_name || "",
        ru: schoolid?.school_ru_name || "",
        eng: schoolid?.school_eng_name || "",
        city: schoolid?.city || "",
        url: schoolid?.url || "",
        timezone: schoolid?.timezone || "",
      });
    }
  }, [schoolid]);

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    if (
      updateInput.kz &&
      updateInput.ru &&
      updateInput.eng &&
      updateInput.city &&
      updateInput.url &&
      updateInput.timezone
    ) {
      if (!getId) {
        await instance
          .post(
            `/api/school/`,
            {
              school_kz_name: updateInput.kz,
              school_ru_name: updateInput.ru,
              school_eng_name: updateInput.eng,
              url: updateInput.url,
              city: updateInput.city,
              timezone: updateInput.timezone,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res && onReject) {
              dispatch(getSchoolThunk());
              onReject(false);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await instance
          .put(
            `/api/school/${getId}/`,
            {
              school_kz_name: updateInput.kz,
              school_ru_name: updateInput.ru,
              school_eng_name: updateInput.eng,
              url: updateInput.url,
              city: updateInput.city,
              timezone: updateInput.timezone,
            },
            {
              headers: {
                Authorization: `Token ${getTokenInLocalStorage()}`,
              },
            }
          )
          .then((res) => {
            if (res && onEdit) {
              dispatch(getSchoolThunk());
              onEdit(false);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_title">Школы</div>

      <div className="main_table-modal_flex">
        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">
              Наименование школы (KZ)*
            </div>

            <Input
              type="text"
              placeholder="наименование"
              name="kz"
              value={updateInput.kz}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">
              Наименование школы (RU)*
            </div>

            <Input
              type="text"
              placeholder="наименование"
              name="ru"
              value={updateInput.ru}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">
              Наименование школы (ENG)*
            </div>

            <Input
              type="text"
              placeholder="наименование"
              name="eng"
              value={updateInput.eng}
              onChange={(e) => onChangeUpdateInput(e)}
            />
          </div>

          <div className="forms flex">
            <div>
              <div className="login_forms-label_pink">Город</div>

              <Input
                type="text"
                placeholder="город"
                name="city"
                value={updateInput.city}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div>
              <div className="login_forms-label_pink">URL</div>

              <Input
                type="text"
                placeholder="автоматом"
                name="url"
                value={updateInput.url}
                onChange={(e) => onChangeUpdateInput(e)}
              />
            </div>

            <div>
              <div className="login_forms-label_pink">Тайм-зона</div>

              <Input
                type="text"
                placeholder="тайм зона"
                name="timezone"
                value={updateInput.timezone}
                onChange={(e) => onChangeUpdateInput(e)}
              />
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
        <Button background="#27AE60" style={{ width: "auto" }} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminTableBlock;
