export const addressReducer = (state = null, action) =>{
    switch (action.type) {
        case "SET_ADDRESS":
            return {...state, userAddrList: action.payload};
        case "ADD_ADDRESS_LIST":
            return {...state, addressList: action.payload};
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};


