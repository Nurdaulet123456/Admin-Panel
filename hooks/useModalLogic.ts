import { useState } from 'react';

export const useModalLogic = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const onErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const showError = () => {
    setShowErrorModal(true);
  };

  return {
    showSuccessModal,
    showErrorModal,
    onSuccessModalClose,
    onErrorModalClose,
    showSuccess,
    showError,
  };
};
