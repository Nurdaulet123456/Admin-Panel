import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../../atoms/UI/Buttons/Button";
import { Input } from "../../atoms/UI/Inputs/Input";
import TypeModal from "../../modals/TypeModal";
import { instance } from "@/api/axios.instance";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getSchoolSocialThunk } from "@/store/thunks/schoolnfo.thunk";
import { getTokenInLocalStorage } from "@/utils/assets.utils";

interface UpdateInputProps {
  url?: string;
  name?: string;
}

interface IProps {
  onReject?: Dispatch<SetStateAction<boolean>>;
}

const SchoolTableBlock4: FC<IProps> = ({ onReject }) => {
  const dispatch = useAppDispatch();
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [updateInput, setUpdateInput] = useState<UpdateInputProps>({
    url: "",
    name: "",
  });

  const onChangeUpdateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateInput({
      ...updateInput,
      [name]: value,
    });
  };

  const onSave = async () => {
    if (updateInput.name && updateInput.url) {
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
          }
        )
        .then((res) => {
          if (res) {
            dispatch(getSchoolSocialThunk());

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
  };

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div className="login_forms-label_pink">Тип</div>
          <Input
            type="text"
            name="eat"
            readOnly={true}
            style={{ cursor: "pointer" }}
            onClick={() => setShowActive(!showActive)}
            value={text}
          />

          <div className="main_table-modal-active-block">
            {showActive && (
              <TypeModal
                setText={setText}
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
              onClick={() => onReject && onReject(false)}
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

export default SchoolTableBlock4;
