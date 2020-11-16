import {combineReducers} from "redux";
import {userReducer} from "./UserReducer"
import {userProfileReducer} from "./UserProfileReducer";
import {postRequestReducer} from "./PostRequestReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userProfile:userProfileReducer,
    requestDetail: postRequestReducer
});


export default rootReducer;

