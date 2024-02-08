import { FC } from "react";
import { ErrorIcons } from "../atoms/Icons";
import { Button } from "../atoms/UI/Buttons/Button";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";

interface IProps {
  onClose?: () => void;
}

const ErrorModal: FC<IProps> = ({ onClose }) => {
  return (
    <>
      <Modal>
        <ModalInner>
          <ModalContent>
            <div className="modal_header">
              <ErrorIcons />
            </div>

            <div className="modal_body">
              <div className="modal_body-title">Қате</div>
              <div className="modal_body-subtitle">
                Толтырылған ақпарат көзінде қателік бар. Қайталап толтыруды
                сұраймыз.
              </div>
            </div>

            <div className="modal_footer">
              <Button
                background="#4F4F4F"
                radius="8px"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".8rem",
                }}
                onClick={onClose}
              >
                ОК
              </Button>
            </div>
          </ModalContent>
        </ModalInner>
      </Modal>
    </>
  );
};

export default ErrorModal;
