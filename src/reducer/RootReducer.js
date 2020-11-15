import {combineReducers} from "redux";
import {userReducer} from "./UserReducer"
import {userProfileReducer} from "./UserProfileReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userProfile:userProfileReducer
});


export default rootReducer;

