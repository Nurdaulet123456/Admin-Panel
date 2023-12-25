import { FC } from "react";
import { Button } from "../atoms/UI/Buttons/Button";
import { Input } from "../atoms/UI/Inputs/Input";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";

interface IProps {
  onReject?: () => void;
  selectedCell?: any;
  classnames?: string;
}

const ScheduleModal: FC<IProps> = ({ onReject, selectedCell, classnames }) => {
  return (
    <>
      <Modal>
        <ModalInner>
          <ModalContent>
            <div className="modal_header">Расписание</div>

            <div className="modal_body">
              <div className="forms flex-grid">
                <div>День недели:</div>
                <span>{selectedCell.day}</span>
              </div>

              <div className="forms flex-grid">
                <div>Класс:</div>
                <span>{classnames?.split("")?.join(" ")}</span>
              </div>

              <div className="forms flex-grid">
                <div>Время:</div>
                <span>
                  {selectedCell.start_time}-{selectedCell.end_time}
                </span>
              </div>

              <div className="forms flex-grid">
                <div>Предмет:</div>
                <div>
                  <Input
                    type="text"
                    name="pred"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                  />
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Преподаватель:</div>
                <div>
                  <Input
                    type="text"
                    name="teacher"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                  />
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Кабинет:</div>
                <div>
                  <Input
                    type="text"
                    name="cabinet"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                  />
                </div>
              </div>

              <div className="forms flex-grid">
                <div>Тип занятия:</div>
                <div>
                  <Input
                    type="text"
                    name="type"
                    readOnly
                    style={{ cursor: "pointer", paddingBlock: ".8rem" }}
                  />
                </div>
              </div>
            </div>

            <div className="modal_footer">
              <Button
                background="#CACACA"
                radius="14px"
                color="#645C5C"
                style={{ width: "auto" }}
                onClick={onReject}
              >
                Удалить
              </Button>
              <Button
                background="#27AE60"
                radius="14px"
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: ".8rem",
                }}
              >
                Сохранить
              </Button>
            </div>
          </ModalContent>
        </ModalInner>
      </Modal>
    </>
  );
};

export default ScheduleModal;
