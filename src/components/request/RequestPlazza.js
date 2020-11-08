import React, { useState }  from "react";
import {Button} from "antd";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import RequestService from "../../service/RequestService";



const Request = () => {

    const [text, setText] = useState("");
    const {user} = useSelector((state)=>({...state}))


    const handleClick = () => {
        let requestBean ={requestContent:text}
        RequestService.request(user.uid, requestBean).then(res=>{
            toast.success("save request to backend success")
        }).catch(res=>{
            toast.error("save failed")
        })
    }

    return (
        <div>
            <textarea name="" id="" cols="30" rows="10" onChange={e=>setText(e.target.value)}>

            </textarea>
            <br/>
            <Button type="primary" shape="round" onClick={handleClick}>Post</Button>
        </div>
    );
}



export default Request;