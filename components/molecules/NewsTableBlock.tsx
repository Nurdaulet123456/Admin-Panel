import { useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import TypeModal from "../modals/TypeModal";

const NewsTableBlock = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_flex" style={{ gap: "1.6rem" }}>
        <div className="main_table-modal_upload">
          <div style={{ marginBottom: "2.4rem" }}>
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
          <div className="login_forms-label_pink">Фото *</div>
        </div>

        <div className="main_table-modal_forms">
          <div className="forms">
            <div className="login_forms-label_pink">Уақыты</div>

            <Input type="text" placeholder="курс атауы" name="name" />
          </div>

          <div className="forms">
            <div className="login_forms-label_pink">Текст</div>

            <TextArea rows={10} name="goal" />

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
            >
              Удалить
            </Button>
            <Button background="#27AE60" style={{ width: "auto" }}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTableBlock;
