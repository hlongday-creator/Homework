import { Menu, Modal, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/actions";
import { useState } from "react";
import { notiConfig } from "./Notification";
import DeleteTodo from "./delete/DeleteTodo";
import { LabelContainer } from "./LabelContainer";
import UpdateTodo from "./update/UpdateTodo";

export const MenuDropdown = (index, onClick = () => {}) => {
  return (
    <Menu
      items={[
        {
          label: <DeleteTodo index={index} />,
          key: "0",
        },
        {
          label: (
              <UpdateTodo index={index} />
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item (disabled)",
          key: "3",
          disabled: true,
        },
      ]}
    />
  );
};
