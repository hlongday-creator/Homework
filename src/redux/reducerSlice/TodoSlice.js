const initState = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function setDataLocalStorage(result) {
  localStorage.setItem("todos", JSON.stringify(result));
}
export const TodoReducer = (state = initState, action) => {
  switch (action.type) {
    case "add": {
      let result = [...state, action.payload];
      setDataLocalStorage(result);
      return [...result];
    }
    case "delete": {
      let result = [...state];
      result.splice(action.payload, 1);
      setDataLocalStorage(result);
      return [...result];
    }
    case "update": {
      let result = [...state];
      let index = result.findIndex(
        (item) => item.id === action.payload.id
      );
      result[index] = {
        ...action.payload,
      };
      setDataLocalStorage(result);
      return [...result];
    }
    case "completedTodo":
      const dataChangeIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      let result = [...state];
      result[dataChangeIndex].completed = action.payload.completed;
      setDataLocalStorage(result);
      return [...result];
    default: {
      return state;
    }
  }
};
