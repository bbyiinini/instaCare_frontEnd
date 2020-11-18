import {combineReducers} from "redux";
import {userReducer} from "./UserReducer"
import {userProfileReducer} from "./UserProfileReducer";
import {postRequestReducer} from "./PostRequestReducer";
import {postRequestMangeReducer} from "./PostManager";

const rootReducer = combineReducers({
    user: userReducer,
    userProfile:userProfileReducer,
    requestDetail: postRequestReducer,
    requestMange: postRequestMangeReducer
});


export default rootReducer;

