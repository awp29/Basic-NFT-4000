import { useState } from 'react';

export const useModal = (onClose) => {
  const [modalState, setModalState] = useState('opening');

  const handleClose = () => {
    setModalState('closing');

    setTimeout(() => {
      onClose();
    }, 200);
  };

  return {
    modalState,
    handleClose,
  };
};
