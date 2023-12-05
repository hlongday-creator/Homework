import { Typography, Divider } from "antd";
import "./App.css";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import InputTodo from "./components/InputTodo";

const { Title } = Typography;

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
      <div className="overflow-hidden max-w-[800px] bg-white  xs:rounded-md h-screen xs:h-auto p-5 pr-0  shadow-lg gap-x-10 w-full s:flex ">
        <div className="flex flex-col flex-1 mt-5 xs:mt-0 ">
          <Title className="text-center">TODO APP </Title>
          <InputTodo />
          <Filters />
          <Divider />
        </div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
