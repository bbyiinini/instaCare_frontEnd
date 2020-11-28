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

    addToPast(uid, requestBean){
        return Axios.post("http://localhost:8080/request/past/"+uid, requestBean).then(res=>{
            toast.success("Success")
            console.log(res);
        }).catch(error => {
            toast.error("Noooooo");
            console.log(error.message);
        })
    }

    deleRequest(rid){
        return Axios.post("http://localhost:8080/request/"+rid, rid).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message);
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

