import { notification, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../../redux/actions";
import { notiConfig } from "../Notification";
import { EditOutlined } from "@ant-design/icons";
import { LabelContainer } from "../LabelContainer";
import InputTodo from "../InputTodo";
import { todoListSelector } from "../../redux/selector";

const UpdateTodo = ({ index }) => {
  const todoList = useSelector(todoListSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    dispatch(updateTodo(index));
    notification.success(notiConfig.updateSuccess);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <LabelContainer text="update" onClick={showModal}>
        <EditOutlined />
      </LabelContainer>
      {open && (
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <InputTodo
            update
            dataUpdate={todoList[index]}
            openModal={setOpen}
          ></InputTodo>
        </Modal>
      )}
    </>
  );
};

export default UpdateTodo;
