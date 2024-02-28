import { useState } from "react";

export const useModalLogic = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const onSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const onErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const onDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const showError = () => {
    setShowErrorModal(true);
  };

  const showDelete = () => {
    setShowDeleteModal(true);
  };

  return {
    showSuccessModal,
    showErrorModal,
    showDeleteModal,
    onSuccessModalClose,
    onErrorModalClose,
    onDeleteModalClose,
    showSuccess,
    showError,
    showDelete
  };
};
