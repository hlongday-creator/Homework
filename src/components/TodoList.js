import { Col, Row, Divider, notification } from "antd";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { todoListSelector } from "../redux/selector";
import useDebounce from "../hooks/useDebounce";
import { notiConfig } from "./Notification";
export default function TodoList() {
  const todoList = useDebounce(useSelector(todoListSelector));
  useEffect(() => {
    notification.success(notiConfig.loadSuccess);
  }, []);
  return (
    <Row className="flex-1">
      <Col span={24}>
        {todoList.length > 0 && (
          <>
            <h4 className="opacity-60">
              <span>- {todoList.length}</span> todos founded
            </h4>
            <Divider></Divider>
          </>
        )}
        {todoList.length ? (
          <div className = 'max-h-[310px] overflow-auto pr-5 todoList'>
            {todoList.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            No result founded!
          </div>
        )}
      </Col>
    </Row>
  );
}
