import Axios from "axios";
import {toast} from "react-toastify";

class RequestService {

    request(rid, requestBean){
        return Axios.post("http://localhost:8080/request/"+rid, requestBean).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message)
        })
    };

    deleRequest(rid){
        return Axios.post("http://localhost:8080/request/"+rid, rid).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message);
        })
    }

    deleteRequest(rid){
        return Axios.delete("http://localhost:8080/request/"+rid)
    }

    // getRequest(uid){
    //     return Axios.get("http://localhost:8080/request/"+uid).then(res=>{
    //         console.log(res)
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })
    // }
    insertAddress(uid, addressBean) {
        return Axios.post("http://localhost:8080/address/"+uid, addressBean)
    }
}

export default new RequestService();

