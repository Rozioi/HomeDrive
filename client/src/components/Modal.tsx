import React from "react";
import ReactDOM from "react-dom";
import styles from '../assets/Model.module.scss';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles['overlayStyles']}>
      <div className={styles['modalStyles']}>
        <button className={styles['closeButtonStyles']} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
      document.getElementById("modal-root")!
  );
};


export default Modal;