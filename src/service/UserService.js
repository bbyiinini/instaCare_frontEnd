import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users/api/save";

class UserService {
    // saveUser(user) {
    //     return Axios.post(USER_API_BASE_URL, user);
    // }

    registed(uid, data){
        return Axios.post("http://localhost:8080/users/"+uid,data).then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    update(uid, data){
        return Axios.put("http://localhost:8080/users/"+uid,data).then(response => {
            console.log(response.data)
        })
            .catch(error => {
                console.log(error.response)
            });
    }
//t6zFmkEG2GTO1EWafXBZxHBm0Dp2
    retrieve(uid){
        return Axios.get("http://localhost:8080/users/" + uid)
    }

}

export default new UserService();

