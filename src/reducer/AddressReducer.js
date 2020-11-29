export const addressReducer = (state = null, action) =>{
    switch (action.type) {
        case "SET_ADDRESS":
            return action.payload;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};


