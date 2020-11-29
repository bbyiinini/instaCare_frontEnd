import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import {Button, Table, Select as AntSelect, Space, Tag, Divider, Input} from "antd";
import Axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import RequestService from "../../service/RequestService";
import {toast} from "react-toastify";
import "../../style/PostRequest.css";
import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {modalStyle} from "../../style/PostRequestTable";
import Select from 'react-select'
import moment from 'moment';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {PlusOutlined} from '@ant-design/icons';
import SelectUSState from 'react-select-us-states';


const {Option} =  AntSelect;
const PostRequest = () => {
    const {user} = useSelector((state)=>({...state}))
    const profile = useSelector(state=>state.userProfile)
    const requestDetail = useSelector((state)=>state.requestDetail)
    const addressList = useSelector((state)=>state.address)
    const [tags, setTags] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();


    const options = [
        { value: 'Easy to do', label: 'Easy to do' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Cleaning', label: 'Cleaning' },
        { value: 'Tool needed', label: 'Tool needed' },
        { value: 'Chore', label: 'Chore' },
        { value: 'Remote', label: 'Remote' },
        { value: 'Consulting', label: 'Consulting' },
        { value: 'In-home Care', label: 'In-home Care' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Need a Ride', label: 'Need a Ride' },
        { value: 'Cloth Donation', label: 'Cloth Donation' },
        { value: 'Babysitting', label: 'Babysitting' },
        { value: 'Time-consuming', label: 'Time-consuming' },
        { value: 'Medicine', label: 'Medicine' },
    ]



    const openPostWindow = () => {
        setModalIsOpen(true)
    }

    const [flag, setFlag] = useState(true);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [addressId, setAddressId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [past, setPast] = useState(false);
    const [addList, setAddList] = useState([]);
    const [addressModal, setAddressModal] = useState(false);

    // add address bean
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");



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
            addressID: addressId,
            phoneNumber: phoneNumber,
            neededPhysicalContact: checked,
            createTime: date,
            tags: tags,
            seniorId: user.uid,
        }

        if (text!=="" && title!=="" && addressId!=="" && phoneNumber!=="" && tags.length > 0){
            await RequestService.request(user.uid, requestBean).then(res=>{
                toast.success("save request to backend success")
            }).catch(res=>{
                toast.error("save failed")
            })
            window.location.reload();
        }else {
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
        }
    }

    const selectAddress = (e) => {
        setAddressId(e)
    }



    const handleDelete = () => {
    }

    if(!profile || !requestDetail || !addressList || !requestDetail.ongoingRequest || !requestDetail.pastRequest){
        return null
    }

    let {fullName} = profile

    if (addressList.length !== 0 && flag){
        let addressDetail = addressList.map(res=>({
            add:  res.streetAddressL2 === ""? res.streetAddressL1 +
                ", " + res.city + ", " + res.state + " " + res.zipCode :
                res.streetAddressL1 + ", " + res.streetAddressL2 + ", " +
                res.city + ", " + res.state + " " + res.zipCode,
            id: res.addressId
        }

        ));
        setAddList(addressDetail);
        setFlag(false)
    }

    let {ongoingRequest} = requestDetail
    const onGoingData = profile.userType===0? ongoingRequest.map((res,index)=>({
        key: index,
        status: res.status===2?"Volunteer on the way":"request sent",
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title,
        user: res.volunteer === null? "Pending" : res.volunteer,
        requestTime: moment(res.createTime).format('HH:mm MM/DD/YYYY')
    })) : ongoingRequest.map((res,index)=>({
        key: index,
        status: res.status===2?"Volunteer on the way":"request sent",
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title,
        user: res.Senior === null? "Pending" : res.Senior,
        requestTime: moment(res.createTime).format('HH:mm MM/DD/YYYY')
    }));


    const pastData = profile.userType===0? requestDetail.pastRequest.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title === null? "":res.title,
        user: res.volunteer === null? "Pending" : res.volunteer,
        requestTime: res.createTime === null? "" : moment(res.createTime).format('HH:mm MM/DD/YYYY')
    })):requestDetail.pastRequest.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        requestTitle: res.title === null? "":res.title,
        user: res.Senior === null? "Pending" : res.Senior,
        requestTime: res.createTime === null? "" : moment(res.createTime).format('HH:mm MM/DD/YYYY')
    }));

    // react select of address list
    // const addressOptions = addressList.length !== 0? addressList.map(address=>({
    //      value: address, label:address
    //   })) : [{value:"default", label:"no address recorded in database"}];

    // ant select of add address
    let newAdd = "";
    const handleAdd = async () => {
        const addressBean = {
            streetAddressL1: street1,
            streetAddressL2: street2,
            city: city,
            state: state,
            zipCode: zipCode,
            userId: user.uid,
        }

        if (street1 !==""  && city !=="" && state !=="" && zipCode !==""){
            // console.log(text, title, address, phoneNumber)
            let id = "";
            await RequestService.insertAddress(user.uid, addressBean).then(res=>{
                toast.success("insert address to backend success")
                id = res.data.data;
            }).catch(res=>{
                toast.error("insert failed")
            });
            newAdd = (street2 === ""? street1+", "+city+", "+state+" "+zipCode : street1+", "+street2+", "+city+", "+state+" "+zipCode);
            setAddList([...addList, {add:newAdd, id:id}])
            setStreet1("")
            setStreet2("")
            setCity("")
            setState("")
            setZipCode("")
            setAddressModal(false);
        }else {
            toast.error("please fill all the information")
        }

    }


    const ongoingColumns = profile.userType===0?[

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
            dataIndex: 'user',
            key: 'user',
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
                            <Tag style={{color:'#004D40', fontSize:'16px'}} color={color} key={tag}>
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
    ]:[
        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '20%'
    },
        {
            title: 'Senior',
            dataIndex: 'user',
            key: 'user',
            width: '20%'
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
                            <Tag style={{color:'#004D40', fontSize:'16px'}} color={color} key={tag}>
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
            width: '20%'
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
            title: profile.userType===0?'Volunteer':'Senior',
            dataIndex: 'user',
            key: 'user',
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
                            <Tag style={{color:'#004D40',fontSize:'16px'}} color={color} key={tag}>
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


            {past === true?
            <Table columns={pastColumns} dataSource={pastData} pagination={{defaultPageSize: 5}} /> :
            <Table columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}} />}

            <div className="mt-3">
                {past === true?
                    (pastData.length===0?<h2>Currently no data record</h2>:null):
                    (onGoingData.length===0?<h2>Currently no data record</h2>:null)}
            </div>
            <Button type="primary" style={{background:'#00897B', width:'250px', height:'40px', fontSize:'18px', marginTop:'10px'}} shape="round" onClick={openPostWindow}>Post New Request</Button>


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
                                    <Select isMulti={true} maxMenuHeight={200} options={options} onChange={addTags} placeholder={<div>Select tags</div>}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="validationTextarea"/>
                            <textarea className="form-control"
                                      placeholder="Required request detail" required onChange={e=>setText(e.target.value)}>
                    </textarea>
                        </div>
                        <div className="form-inline mt-3">
                                <label>Phone Number </label>
                                <ReactPhoneInput
                                    style={{width:'50%', marginLeft: '10px'}}
                                    country={'us'}
                                    onlyCountries={['us']}
                                    isValid={(value, country) => {
                                        if (!value.match(/1/)) {
                                            return 'Invalid area code: ' + value + ', ' + country.name;
                                        } else {
                                            return true;
                                        }
                                    }}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                    }}
                                    onChange={e=>(setPhoneNumber(e))}
                                />

                        </div>

                        <div className="form-group mt-3">
                            <AntSelect
                                style={{width:'100%', fontSize:'16px'}}
                                placeholder="Select your address"
                                onChange={selectAddress}
                                dropdownRender={(menu) => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: "4px 0"}} />
                                        <div style={{ display: "flex", flexWrap: "nowrap"}}>
                                            <a
                                                style={{
                                                    flex: "none",
                                                    padding: "8px",
                                                    display: "block",
                                                    cursor: "pointer"
                                                }}
                                                onClick={e=>(setAddressModal(true))}
                                            >
                                                    <PlusOutlined /> Add address
                                            </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {addList.length !== 0? addList.map((address, index)=>(
                                    <Option value={address.id} style={{fontSize:'18px'}} key={index}>{address.add}</Option>
                                )):<Option style={{fontSize:'18px'}}  value="default">No address found in your account, please add one</Option>}
                            </AntSelect>
                        </div>

                        <div>
                            <Modal style={addressModalStyle} isOpen={addressModal} appElement={document.getElementById('root')}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Address</label>
                                        <input type="text" className="form-control" id="inputAddress"
                                               placeholder="Enter your street" onChange={e=>(setStreet1(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress2">Address 2</label>
                                        <input type="text" className="form-control" id="inputAddress2"
                                               placeholder="Apartment, unit, or floor"
                                               onChange={e=>(setStreet2(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">City</label>
                                            <input type="text" className="form-control" id="inputCity"
                                                   onChange={e=>setCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputState">State</label>
                                            <SelectUSState id="inputState" className="form-control" onChange={e=>setState(e)}/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="inputZip">Zip</label>
                                            <input type="text" className="form-control" id="inputZip" onChange={e=>setZipCode(e.target.value)}/>
                                        </div>
                                    </div>
                                    <Button type="primary" style={{background:'#00897B', width:'80px'}} shape="round" className="float-right" onClick={handleAdd} >add</Button>
                                    <label style={{color:'#00897B', cursor:'pointer'}} className="float-right m-2" onClick={()=>setAddressModal(false)}>Cancel</label>
                                </form>
                            </Modal>
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
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%'
}

const addressModalStyle = {
    overlay:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(116, 130, 128, 0.6)'
    },
    content: {
        top: '15%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '30%',
        borderRadius:'30px',
        transform: 'translate(-40%, 5%)',
    },
}


export default PostRequest;