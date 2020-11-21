import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Modal from "react-modal";
import {Button, Table, Pagination, Space, Tag} from "antd";
import Axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import RequestService from "../../service/RequestService";
import {toast} from "react-toastify";
import "../../style/PostRequest.css";
import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {modalStyle, pastColumns} from "../../style/PostRequestTable";
import Select from 'react-select'
import moment from 'moment';

const PostRequest = () => {
    const {user} = useSelector((state)=>({...state}))
    const profile = useSelector(state=>state.userProfile)
    const requestDetail = useSelector((state)=>state.requestDetail)
    const [tags, setTags] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    let history = useHistory();
    const dispatch = useDispatch();


    const options = [
        { value: 'Easy to do', label: 'Easy to do' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Cleaning', label: 'Cleaning' },
        { value: 'Tool needed', label: 'Tool needed' },
        { value: 'Grocery', label: 'Grocery' },
    ]



    const openPostWindow = () => {
        setModalIsOpen(true)
    }

    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false)
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [past, setPast] = useState(false)


    const handleCheckBox = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (user == null){
            return;
        }
        let date = new Date()
        let requestBean ={
            requestContent:text,
            title: title,
            address: address,
            phoneNumber: phoneNumber,
            neededPhysicalContact: checked,
            createTime: date,
            tags: tags,
        }

        if (text!=="" && title!=="" && address!=="" && phoneNumber!=="" && tags.length > 0){
            // console.log(text, title, address, phoneNumber)
            await RequestService.request(user.uid, requestBean).then(res=>{
                toast.success("save request to backend success")
            }).catch(res=>{
                toast.error("save failed")
            })
            window.location.reload();
        }else {
            console.log(text, title, address, phoneNumber)
            toast.error("please fill all required information")
        }

    }

    const handleRequestMange = (key) =>{
        dispatch({
            type: 'OREQBYID',
            payload:requestDetail.ongoingRequest[key],
        });
        history.push('/requestmangement');
    }

    const handlePastRequestMange = (key) =>{
        dispatch({
            type: 'OREQBYID',
            payload:requestDetail.pastRequest[key],
        });
        history.push('/requestmangement');
    }



    const handleChange = (e) => {
        if (e.target.value === "past"){
            setPast(true)
        }else {
            setPast(false)
        }

    }

    const addTags = (e) => {
        if (e != null){
            const result = e.map(res=>(res.value))
            setTags(result)
            console.log(result)
        }
    }

    const addAddress = (e) => {
        setAddress(e.value)
    }

    const handleDelete = () => {
    }

    if(!profile || !requestDetail || !requestDetail.ongoingRequest || !requestDetail.pastRequest){
        return null
    }

    let {fullName, addressList} = profile
    let {ongoingRequest} = requestDetail
    const onGoingData = ongoingRequest.map((res,index)=>({
        key: index,
        status: res.status===1?"Volunteer on the way":"request sent",
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title,
        volunteer: res.volunteer === null? "Pending" : res.volunteer,
        requestTime: moment(res.createTime).format('HH:mm MM/DD/YYYY')
    }));


    const pastData = requestDetail.pastRequest.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title === null? "":res.title,
        volunteer: res.volunteer === null? "Pending" : res.volunteer,
        requestTime: res.createTime === null? "" : moment(res.createTime).format('HH:mm MM/DD/YYYY')
    }));

    // react select of address list
    const addressOptions = addressList.length !== 0? addressList.map(address=>({
        value: address, label:address
    })) : [{value:"default", label:"no address recorded in database"}];

    const ongoingColumns = [

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '18%'
        },
        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '18%'
        },
        {
            title: 'Volunteer',
            dataIndex: 'volunteer',
            key: 'volunteer',
            width: '15%'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width:'12%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';
                        return (
                            <Tag style={{color:'black', fontSize:'16px'}} color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Request Time',
            dataIndex: 'requestTime',
            key: 'requestTime',
            width: '18%'
        },

        {
            key: 'action',
            render: (text,record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <Button type="primary" style={{background:'#00897B', fontSize:'16px', textAlign:'center'}} shape="round" ><a style={{textDecoration:'none'}} onClick={()=>handleRequestMange(record.key)}>request management</a></Button>
                </Space>
            ),
        },
    ];

    const pastColumns = [

        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '18%'
        },
        {
            title: 'Volunteer',
            dataIndex: 'volunteer',
            key: 'volunteer',
            width: '15%'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width:'10%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';

                        return (
                            <Tag style={{color:'black',fontSize:'16px'}} color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Request Time',
            dataIndex: 'requestTime',
            key: 'requestTime',
            width: '18%'
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: '18%'
        },

        {
            key: 'action',
            render: (text,record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <div className="-vertical">
                        <div className="m-2">
                            <Button type="primary" style={{background:'#00897B', width:'100px',fontSize:'16px', textAlign:'center'}} shape="round" ><a style={{textDecoration:'none'}} onClick={()=>handlePastRequestMange(record.key)}>Detail</a></Button>
                        </div>
                        <div className="m-2">
                            <Button type="primary" style={{background:'#00897B',  width:'100px',fontSize:'16px', textAlign:'center'}} shape="round" onClick={()=>handleDelete} >Delete</Button>
                        </div>
                    </div>

                </Space>
            ),
        },
    ];

    return (
        <div style={customStyle}>
            <h1 style={{marginTop:'-50px', marginBottom: '70px', float:'left'}}>Welcome{user==null?"":", "+fullName}</h1>
            <div className="col-sm-1">
                <select className="ml-3" style={{border:'none', color:'#004D40', outline:'none'}} onChange={handleChange}>
                    <option value="onGoing">Ongoing Requests</option>
                    <option value="past">Past Requests</option>
                </select>
            </div>


            {past === true? <Table columns={pastColumns} dataSource={pastData} pagination={{defaultPageSize: 5}} /> :
                <Table columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}}  />
            }

            <Button type="primary" style={{background:'#00897B', width:'250px', height:'40px', fontSize:'18px'}} shape="round" onClick={openPostWindow}>Post New Request</Button>


            <MuiThemeProvider>
                <Modal style={modalStyle} isOpen={ModalIsOpen} appElement={document.getElementById('root')}>
                    <h1 className="text-center">Post Request</h1>
                    <form >
                        <div>
                            <label className="form-inline" style={{height:'50px'}}>Title
                                <TextField style={{marginTop:'5px', marginLeft:'10px'}} required id="standard-basic"
                                           onChange={e=>setTitle(e.target.value)}/>
                            </label>
                            <div >
                                <div className="tags-input">
                                    <Select isMulti={true} options={options} onChange={addTags} placeholder={<div>Select tags</div>}/>
                                </div>
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
                            <Select options={addressOptions} placeholder={<div>Select your address</div>} onChange={addAddress}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked={checked} onChange={handleCheckBox}/>
                            <label className="form-check-label" >Physical contact needed</label>
                        </div>
                        <Button type="primary" style={{background:'#00897B', width:'80px'}} shape="round" className="float-right" onClick={handleSubmit}>Post</Button>
                        <label style={{color:'#00897B', cursor:'pointer'}} className="float-right m-2" onClick={()=>setModalIsOpen(false)}>Cancel</label>
                    </form>
                </Modal>
            </MuiThemeProvider>

        </div>
    );
}

const customStyle = {
    // top: '15%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    // width: '80%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%'
    // transform: 'translate(10%, 10%)',
}



export default PostRequest;