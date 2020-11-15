import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Button,  Pagination, Table, Tag, Space} from "antd";
import Axios from "axios";
import {useSelector} from "react-redux";
import RequestService from "../../service/RequestService";
import {toast} from "react-toastify";
import "../../style/PostRequest.css";
import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {columns, modalStyle} from "../../style/PostRequestTable";

const PostRequest = () => {

    const {user} = useSelector((state)=>({...state}))
    const [userAddress, setUserAddress] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [requestDetail, setRequestDetail] = useState([])

    useEffect( ()=>{
        const fetchRequestInfo = async () => {
            if (user != null) {
                const result = await Axios.get(
                    "http://localhost:8080/request/" + user.uid,
                );
                // console.log(result)
                setRequestDetail(result.data)
                // setUserAddress(result.data.data.addressList)
            }
        }
        fetchRequestInfo().then(r => console.log("success") )
    },[])



    const fetchAddress = async () => {
        setModalIsOpen(true)
        // console.log(user)
        if (user != null) {
            const result = await Axios.get(
                "http://localhost:8080/users/" + user.uid,
            );
            console.log(result)
            setUserAddress(result.data.data.addressList)
        }

    }

    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false)
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")



    const handleCheckBox = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (user == null){
            return;
        }
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString('en-US', { hour12: false });
        let requestBean ={
            requestContent:text,
            title: title,
            address: address,
            phoneNumber: phoneNumber,
            neededPhysicalContact: checked,
            createTime: time + " " + date
        }

        console.log(requestBean)
        if (text!=="" && title!=="" && address!=="" && phoneNumber!==""){
            // console.log(text, title, address, phoneNumber)
            await RequestService.request(user.uid, requestBean).then(res=>{
                toast.success("save request to backend success")
            }).catch(res=>{
                toast.error("save failed")
            })

        }else {
            toast.error("please fill all required information")
        }




    }

    // const data =  requestDetail.map(res=>({
    //     key: res,
    //     status: res.status===1?"Volunteer on the way":"request sent",
    //     tags: res.tags===null?[]:res.tags,
    //     requestTitle: res.title,
    //     volunteer: res.volunteer === null? "Pending" : res.volunteer,
    //     requestTime: res.createTime
    // }))
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
    ];

    return (
        <div>

            <h1 className="float-left">GoodMorning, Gary</h1>
            <div className="grid">
                <div className="row">
                    <div className="col-sm-1">
                        <select className="ml-3" style={{border:'none', color:'darkgreen'}} defaultValue="default">
                            <option value="default">Ongoing Requests</option>
                            <option >Past Requests</option>
                        </select>
                    </div>
                </div>
            </div>
            {/*<div className="flex-content">*/}

            {/*</div>*/}

            <Table columns={columns} dataSource={data} pagination={{defaultPageSize: 2}} />

            <Button type="primary" style={{background:'green'}} shape="round" onClick={fetchAddress}>Post New Request</Button>


            <MuiThemeProvider>
                <Modal style={modalStyle} isOpen={ModalIsOpen} appElement={document.getElementById('root')}>
                    <h1 className="text-center">Post Request</h1>
                    <form >
                        <div>
                            <label className="form-inline" style={{height:'50px'}}>Title
                            <TextField style={{marginBottom:'30px', marginLeft:'20px'}} required id="standard-basic" label="Enter a title"
                              onChange={e=>setTitle(e.target.value)}/>
                            </label>
                            <div className="form-inline" style={{height:'20px'}}>
                                <p className="pl-2">tag1</p>
                                <p className="pl-2">tag2</p>
                                <p className="pl-2">tag3</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="validationTextarea"/>
                            <textarea className="form-control"
                                      placeholder="Required request detail" required onChange={e=>setText(e.target.value)}>
                    </textarea>

                        </div>
                        <div className="form-inline">
                            <label >Phone Number</label>
                            <input style={{width:'50%'}} required type="phoneNumber" className="form-control ml-3 mt-3"
                                   onChange={e=>setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <select className="form-control" onChange={e=>setAddress(e.target.value)} defaultValue="selected">
                                <option value="selected" disabled hidden>
                                    Select your address
                                </option>
                                {userAddress.length !== 0? userAddress.map((address) =>
                                    <option key={address}>{address}</option>
                                ):  <option key="default">No address record in database</option>}

                            </select>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked={checked} onChange={handleCheckBox}/>
                            <label className="form-check-label" >Physical contact needed</label>
                        </div>
                        <button className="btn btn-primary float-right m-2" onClick={handleSubmit}>Post</button>
                        <button className="btn btn-primary float-right m-2" onClick={()=>setModalIsOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            </MuiThemeProvider>

        </div>
    );
}



export default PostRequest;