import actions from "./actions";

const initState = {
  uploads:[]
 };


export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_FILES:
      return {
        ...state,
        uploads: action.files,
      };
    default:
      return state;
  }
};
