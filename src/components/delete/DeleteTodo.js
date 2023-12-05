import { notification, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux/actions";
import { notiConfig } from "../Notification";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LabelContainer } from "../LabelContainer";

const DeleteTodo = ({ index }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    dispatch(deleteTodo(index));
    notification.success(notiConfig.deleteSuccess);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <LabelContainer text="delete" onClick={showModal}>
        <DeleteOutlined />
      </LabelContainer>
      {open && (
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure to delete this to do?</p>
        </Modal>
      )}
    </>
  );
};

export default DeleteTodo;
