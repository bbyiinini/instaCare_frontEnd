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
    case "Avatar":
      return {...state,avatar:action.payload};
    case "New Address":
      if(!state.addressList){
        return {...state,addressList: [action.payload]}
      }else{
        let newAddr = [...state.addressList,action.payload]
        return {...state,addressList: newAddr}
      }
    case "Address":
      let oldAddressList = [...state.addressList]
      oldAddressList[action.payload.index] = action.payload.content
      return {...state,addressList:oldAddressList}
    default:
      return state;
  }
};


