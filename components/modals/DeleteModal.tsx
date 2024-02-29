import { FC } from "react";
import { SuccesIcons } from "../atoms/Icons";
import { Button } from "../atoms/UI/Buttons/Button";
import { Modal, ModalContent, ModalInner } from "../atoms/UI/Modal/Modal";

interface IProps {
    onClose?: () => void;
    handleDelete?: any;
}

const Delete: FC<IProps> = ({ onClose, handleDelete }) => {
    return (
        <>
            <Modal style={{zIndex: "5000"}}>
                <ModalInner>
                    <ModalContent>
                        <div className="modal_header">
                            <SuccesIcons />
                        </div>

                        <div className="modal_body">
                            <div className="modal_body-title">Уверены?</div>
                            <div className="modal_body-subtitle">
                                Вы собираетесь удалить эти данные
                            </div>
                        </div>

                        <div className="modal_footer">
                            <Button
                                background="#aaa"
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
                                Нет
                            </Button>
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
                                onClick={handleDelete}
                            >
                                Да
                            </Button>
                        </div>
                    </ModalContent>
                </ModalInner>
            </Modal>
        </>
    );
};

export default Delete;
