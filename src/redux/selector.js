// import { createSelector } from "reselect";

const searchValueSelector = (state) => state.filters.search;
const statusValueSelector = (state) => state.filters.status;
const priorValueSelector = (state) => state.filters.priority;
export const todoListSelector = (state) => {
  const data = state.todoList.filter((todo) => {
    return (
      todo.name
        .toLowerCase()
        .includes(searchValueSelector(state).toLowerCase()) &&
      (statusValueSelector(state) === "completed"
        ? todo.completed === true
        : statusValueSelector(state) === "pending"
        ? todo.completed === false
        : true) &&
      (priorValueSelector(state).length
        ? priorValueSelector(state).includes(todo.priority)
        : true)
    );
  });
  return data;
};
