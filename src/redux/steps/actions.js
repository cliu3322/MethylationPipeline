const actions = {
  GET_FILES: 'GET_FILES',

  getFiles: files => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.GET_FILES,
        files:files,
      });
    };
  },
};
export default actions;
