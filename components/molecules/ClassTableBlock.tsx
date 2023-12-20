import { useState } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input, TextArea } from "../atoms/UI/Inputs/Input";
import TypeModal from "../modals/TypeModal";

const ClassTableBlock = () => {
  const [showActive, setShowActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  return (
    <div className="main_table-modal">
      <div className="main_table-modal_forms">
        <div className="forms">
          <div className="login_forms-label_pink">Класс</div>

          <Input type="text" placeholder="смена начало" name="start" />
        </div>

        <div className="forms">
          <div>
            <div className="login_forms-label_pink">Классный руководитель</div>
            <Input
              type="text"
              name="end"
              placeholder="смена конец"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>
        </div>
        <div className="forms flex" style={{ alignItems: "flex-start", justifyContent: 'flex-start', gap: '5.2rem' }}>
          <div>
            <div className="login_forms-label_pink">Кабинет</div>
            <Input
              type="text"
              name="cabinet"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>

          <div>
            <div className="login_forms-label_pink">Оқыту тілі</div>
            <Input
              type="text"
              name="lang"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>
        </div>

        <div className="label_title">Основной урок</div>
        <div className="forms flex" style={{ alignItems: "flex-start", justifyContent: 'flex-start', gap: '5.2rem' }}>
          <div>
            <div className="login_forms-label_pink">План звонков</div>
            <Input
              type="text"
              name="plans"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>
          <div>
            <div className="login_forms-label_pink">Смена</div>
            <Input
              type="text"
              name="smena"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>
        </div>
        <div className="label_title">Доп. урок</div>
        <div className="forms flex" style={{ alignItems: "flex-start", justifyContent: 'flex-start', gap: '5.2rem' }}>
          <div>
            <div className="login_forms-label_pink">План звонков</div>
            <Input
              type="text"
              name="plans2"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>

          <div>
            <div className="login_forms-label_pink">Смена</div>
            <Input
              type="text"
              name="smena2"
              readOnly={true}
              style={{ cursor: "pointer" }}
              onClick={() => setShowActive(!showActive)}
              value={text}
            />

            {/* <div className="main_table-modal-active-block">
                {showActive && (
                  <TypeModal setText={setText} setShowActive={setShowActive} />
                )}
              </div> */}
          </div>
        </div>
      </div>

      <div
        className="flex"
        style={{ justifyContent: "flex-end", gap: "1.6rem" }}
      >
        <Button background="#CACACA" color="#645C5C" style={{ width: "auto" }}>
          Удалить
        </Button>
        <Button background="#27AE60" style={{ width: "auto" }}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default ClassTableBlock;
