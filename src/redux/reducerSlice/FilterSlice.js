const initState = {
  search: "",
  status: "all",
  priority: [],
};
export const FilterReducer = (state = initState, action) => {
  switch (action.type) {
    case "filterSearch": {
      return {
        ...state,
        search:  action.payload,
      };
    }
    case "filterStatus": {
      return {
        ...state,
        status: action.payload
      }
    }
    case "filterPrior": {
      return {
        ...state,
        priority: action.payload
      }
    }

    default: {
      return state;
    }
  }
};
