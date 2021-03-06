export const postRequestReducer = (state = null, action) =>{
  switch (action.type) {
    case "REQUEST":
      return {...state, ongoingRequest:action.payload};
    case "PAST":
      return {...state, pastRequest:action.payload};
    case "ALL_ONGOING_REQUEST":
      return {...state, allOnGoingRequest:action.payload};
    case "ADD_REQUEST":
      return {...state, ongoingRequest: action.payload};
    case 'DELETE_ITEM':
      return {
        ...state,
        pastRequest: state.pastRequest.filter((items) => items.id !== action.payload)
      }
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};


