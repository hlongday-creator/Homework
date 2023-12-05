import { Row, Tag, Checkbox } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { completedTodo } from "../redux/actions";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import "antd/dist/antd.css";
import { MenuDropdown } from "./MenuDropdown";
const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};
export default function Todo({ todo = '', index }) {
  const {name, priority, completed, id} = todo
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(
      completedTodo({
        id: id,
        completed: !checked,
      })
    );
  };
  return (
    <Row
      justify="space-between"
      className={`mb-4 ${checked && "opacity-50 line-through"}`}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <div className="flex justify-end gap-x-5">
        <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
          {priority}
        </Tag>
        <Dropdown
          overlay={MenuDropdown(index)}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Row>
  );
}
