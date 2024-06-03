// AsyncModal.js
import React from "react";
import { Modal } from "antd";

const AsyncModal = ({
  show,
  title,
  onConfirm,
  onHide,
  children,
  okText,
  footer,
}) => {
  if (footer) {
    return (
      <>
        <Modal
          title={title}
          open={show}
          onOk={onConfirm}
          okText={okText ? okText : "Yes"}
          onCancel={onHide}
        >
          {children}
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          title={title}
          open={show}
          onOk={onConfirm}
          okText={okText ? okText : "Yes"}
          onCancel={onHide}
          footer={null}
        >
          {children}
        </Modal>
      </>
    );
  }
};

export default AsyncModal;
