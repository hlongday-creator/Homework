import { FilterReducer } from "./reducerSlice/FilterSlice";
import { TodoReducer } from "./reducerSlice/TodoSlice";

export const rootReducer = (state = {}, action) => {
  return {
    filters: FilterReducer(state.filters, action),
    todoList: TodoReducer(state.todoList, action),
  };
};
