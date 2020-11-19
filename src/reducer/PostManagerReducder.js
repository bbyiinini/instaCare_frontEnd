export const postRequestMangeReducer = (state = null, action) =>{
  switch (action.type) {
    case "OREQBYID":
      return {...state, ongoingRequestId:action.payload};
    case "PREQBYID":
      return {...state, pastRequestId:action.payload};
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};