import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <button style={closeButtonStyles} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")! // Указываем контейнер из HTML
  );
};

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "5px",
  position: "relative",
  width: "500px",
  maxWidth: "90%",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  color: "black",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};
export default Modal;