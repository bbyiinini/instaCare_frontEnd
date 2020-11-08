import Axios from "axios";


class RequestService {

    request(uid, requestBean){
        return Axios.post("http://localhost:8080/request/"+uid, requestBean).then(res=>{
            console.log(res)
        }).catch(error => {
            console.log(error.message)
        })
    }

    // getRequest(uid){
    //     return Axios.get("http://localhost:8080/request/"+uid).then(res=>{
    //         console.log(res)
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })
    // }
}

export default new RequestService();

