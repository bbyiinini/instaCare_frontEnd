import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import RequestService from "../../service/RequestService";
import Axios from "axios";



const Request = () => {

    const [text, setText] = useState("");
    const [contents, setContent] = useState([]);
    const {user} = useSelector((state)=>({...state}))

    const handleClick = () => {
        if (user == null){
            return;
        }
        let requestBean ={requestContent:text}
        RequestService.request(user.uid, requestBean).then(res=>{
            toast.success("save request to backend success")
        }).catch(res=>{
            toast.error("save failed")
        })

    }

    const fetchData = async () => {
        if (user != null){
            const result = await Axios(
                "http://localhost:8080/request/"+user.uid,
            );

            setContent(result.data);
        }

    };


    return (
        <div>
            <textarea name="" id="" cols="30" rows="10" onChange={e=>setText(e.target.value)}/>

            <br/>
            <Button type="primary" shape="round" onClick={handleClick}>Post</Button>
            <Button type="primary" className="m-3" shape="round" onClick={fetchData}>Fetch</Button>

            <br/>
            <ul>
                {contents.map(content=>
                    <p key={content.requestContent}>
                        {content.requestContent}
                    </p>
                )}
            </ul>

        </div>
    );
}



export default Request;