import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users/api/save";

class UserService {
    // saveUser(user) {
    //     return Axios.post(USER_API_BASE_URL, user);
    // }

    registed(uid, type){
        return Axios.post("http://localhost:8080/users/"+uid,type).then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    retrieve(uid){
        return Axios.get("http://localhost:8080/users/" + "t6zFmkEG2GTO1EWafXBZxHBm0Dp2")
    }

}

export default new UserService();

