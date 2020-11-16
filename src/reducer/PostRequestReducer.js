export const postRequestReducer = (state = null, action) =>{
  switch (action.type) {
    case "REQUEST":
      return {...state, ongoingRequest:action.payload};
    case "PAST":
      return {...state, pastRequest:action.payload};
    default:
      return state;
  }
};


