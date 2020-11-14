import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import Axios from "axios";
import RequestService from "../../service/RequestService";
import "./homepage.css"
//import Pagination from '@material-ui/lab/Pagination';


const Homepage = () => {

    {/*ongoing=0; past=1*/}
    const [displayState, setDisplayState] = useState(0);
    const [contents, setContent] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const volunteerNum = 12321;

    const handleDisplayChange = (e) => {
        if(displayState == 0){
            setDisplayState(1);
        }
        else{
            setDisplayState(0);
        }
    }

    const {user} = useSelector((state)=>({...state}));


    const getRequest = async () => {
        if (user != null){
            const result = await Axios(
                "http://localhost:8080/request/"+user.uid,
            );
            setContent(result.data);
        }
    };

    const getUserInfo = async () => {
        if (user != null){
            const result = await Axios(
                "http://localhost:8080/users/"+user.uid,
            );
            console.log(result)
            setUserInfo(result.data);
        }
    };

    useEffect(() =>{
        getRequest();
        getUserInfo();
    });

    {/*暂时senior的page*/}
    return (
        <div className="column">

            {/*标题、在线volunteer数量*/}
            <div>
                <h1 style={{float:"left", marginLeft:'8%', marginTop: '3%'}}>Good Morning {user==null?".":", "+ user.displayName}</h1>
                
                <h5 style={{float:"right", marginRight:'10%', marginTop: '4%'}}>{volunteerNum} volunteers are currently online</h5>
            </div>

            {/*选择ongoing 或者 past*/}
            <div align="left" style={{marginLeft:'10%', marginTop: '1%'}}>
                <select onChange={e => handleDisplayChange(e)}>
                    <option selected>Ongoing Requests</option>
                    <option>Past Requests</option>
                </select>
            </div>

            <div style={{display:displayState==0?true:'none', marginTop: '2%'}}>
                <div id="homeDiv">
                    <table id="t01">
                        <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Volunteer</th>
                            <th>Tags</th>
                            <th>Request Time</th>
                            <th>{userInfo.userType}</th>
                        </tr>
                        
                        {contents.map(content=>{
                            return(
                            <tr>
                                
                                <td key={content.status}>{content.status}</td>
                                <td key={content.requestContent}>{content.requestContent}</td>
                                <td key={content.volunteerId}>{content.volunteerId}</td>
                                <td key={content.tagsId}>{content.tagsId}</td>
                                <td key={content.createTime}>{content.createTime}</td>
                                <td> <Button type="primary" shape="round" id="requestManagementButton">Request Management</Button></td>
                            </tr>)
                        }
                        )}
                    </table>
                </div>
            </div>

            <div style={{display:displayState==1?true:'none', marginTop: '2%'}}>
                <div id="homeDiv">
                    <table id="t01">
                        <tr>
                            <th>Request title</th>
                            <th>Volunteer</th>
                            <th>Tags</th>
                            <th>Request Time</th>
                            <th>Rating</th>
                            <th> </th>
                        </tr>
                        
                        {contents.map(content=>{
                            return(
                            <tr>
                                <td key={content.requestContent}>{content.requestContent}</td>
                                <td key={content.volunteerId}>{content.volunteerId}</td>
                                <td key={content.tagsId}>{content.tagsId}</td>
                                <td key={content.createTime}>{content.createTime}</td>
                                <td key={content.ratingId}>{content.ratingId}</td>
                                <td> <Button type="primary" shape="round" id="detailButton">Detail</Button> <Button type="primary" shape="round" id="deleteButton">Delete</Button></td>
                            </tr>)
                        }
                        )}
                    </table>
                </div>
            
            </div>

            {/*POST BUTTON*/}
            <div>
                <Button type="primary" shape="round" >&nbsp;&nbsp;Post New Request&nbsp;&nbsp;</Button>
            </div>


        </div>
    );
}

export default Homepage;