export const userProfileReducer = (state = null, action) =>{
  switch (action.type) {
    case "SET_PROFILE":
      return action.payload;
    case "LOGOUT":
      return null;
    case "Description":
      return {...state,description:action.payload};
    case "Phone":
      return {...state,phone:action.payload};
    case "Address":
      let oldAddressList = [...state.addressList]
      oldAddressList[action.payload.index] = action.payload.content
      return {...state,addressList:oldAddressList}
    default:
      return state;
  }
};


