export const ratingReducer = (state = null, action) =>{
    switch (action.type) {
        case "RATING":
            return action.payload;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};


