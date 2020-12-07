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
import Select from 'react-select'
import moment from 'moment';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {PlusOutlined} from '@ant-design/icons';
import SelectUSState from 'react-select-us-states';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Rating from "@material-ui/lab/Rating";

const GOOGLE_API_KEY = 'AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y'

const {Option} = AntSelect;
const PostRequest = () => {
    const {user} = useSelector((state) => ({...state}))
    const profile = useSelector(state => state.userProfile)
    const requestDetail = useSelector((state) => state.requestDetail)
    const addressList = useSelector((state) => state.address)
    const [tags, setTags] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyle()


    const options = [
        {value: 'Chore', label: 'Chore'},
        {value: 'Grocery', label: 'Grocery'},
        {value: 'Technology', label: 'Technology'},
        {value: 'Cloth Donation', label: 'Cloth Donation'},
        {value: 'Medicine', label: 'Medicine'},
        {value: 'Easy to do', label: 'Easy to do'},
        {value: 'Need a Ride', label: 'Need a Ride'},
        {value: 'Time-consuming', label: 'Time-consuming'},
        {value: 'Remote', label: 'Remote'},
        {value: 'With Tips', label: 'With Tips'},
        {value: 'Babysitting', label: 'Babysitting'},
        {value: 'Emergency', label: 'Emergency'},
        {value: 'Consulting', label: 'Consulting'},
        {value: 'In-home Care', label: 'In-home Care'},
    ]


    const openPostWindow = () => {
        setModalIsOpen(true)
    }


    const [flag, setFlag] = useState(true);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [addressId, setAddressId] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [past, setPast] = useState('Ongoing Requests');
    const [addList, setAddList] = useState([]);
    const [addressModal, setAddressModal] = useState(false);
    const [questionnaireModal, setQuestionnaireModal] = useState(false);

    // add address bean
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    // delete request bean
    const [deleteTarget, setDeleteTarget] = useState({})

    const handleCheckBox = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (user == null) {
            return;
        }
        let requestBean = {
            requestContent: text,
            title: title,
            addressID: addressId,
            // address: address,
            phoneNumber: phoneNumber,
            neededPhysicalContact: checked,
            tags: tags,
            seniorId: user.uid,
        }

        if (text !== "" && title !== "" && address !== "" && phoneNumber !== "" && tags.length > 0) {
            await RequestService.request(user.uid, requestBean).then(res => {
                toast.success("save request to backend success")
            }).catch(res => {
                toast.error("save failed")
            })

            window.location.reload();
            // dispatch({
            //     type: 'ADD_REQUEST',
            //     payload: requestBean
            // })
        } else {
            toast.error("please fill all required information or select valid address!")
        }

    }


    const handleRequestMange = (key) => {
        dispatch({
            type: 'OREQBYID',
            payload: requestDetail.ongoingRequest[key],
        });
        history.push('/requestmangement');
    }

    const handlePastRequestMange = (key) => {
        dispatch({
            type: 'OREQBYID',
            payload: requestDetail.pastRequest[key],
        });
        history.push('/requestmangement');
    }

    const handleClose = () => {
        setQuestionnaireModal(false);
        setModalIsOpen(true)

    };

    const handleQuestionnaire = () => {
        setQuestionnaireModal(true)
    }


    const handleChange = (e) => {
        if (e.target.value === "past") {
            setPast('Past Requests')
            localStorage.setItem('state', 'past');
        } else {
            localStorage.removeItem('state')
            setPast('Ongoing Requests')
        }

    }


    if (localStorage.getItem('state') === 'past' && past === 'Ongoing Requests'){
        setPast('Past Requests')
        localStorage.removeItem('state')
    }


    const addTags = (e) => {
        if (e != null) {
            const result = e.map(res => (res.value))
            setTags(result)
        }
    }

    const selectAddress = (e) => {
        setAddress(e[0])
        setAddressId(e[1])
    }

    const handleDelete = (key) => {
        setDeleteModal(true)
        setDeleteTarget({content: requestDetail.pastRequest[key], key: key})

    }

    const handleConfirm = async () => {
        await RequestService.deleteRequest(deleteTarget.content.id).then(res => {
            console.log(res)
            dispatch({
                type: 'DELETE_ITEM',
                payload: deleteTarget.key
            })
            setDeleteModal(false)
        }).catch(error => {
            console.log(error.message)
        })

    }

    if (!profile || !requestDetail || !addressList || !requestDetail.ongoingRequest || !requestDetail.pastRequest || !addressList.userAddrList) {
        return <h1>Loading...</h1>
    }

    let {fullName} = profile
    let addrList = addressList.userAddrList
    if (addrList.length !== 0 && flag) {
        let addressDetail = addrList.map(res => ({
                add: res.streetAddressL2 === "" ? res.streetAddressL1 +
                    ", " + res.city + ", " + res.state + " " + res.zipCode :
                    res.streetAddressL1 + ", " + res.streetAddressL2 + ", " +
                    res.city + ", " + res.state + " " + res.zipCode,
                id: res.addressId
            }

        ));
        setAddList(addressDetail);
        setFlag(false)
    }

    function parseISOString(s) {
        let b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    let {ongoingRequest} = requestDetail
    const onGoingData = profile.userType === 0 ? ongoingRequest.map((res, index) => ({
        key: index,
        status: res.status === 2 ? "Volunteer on the way" : "request sent",
        tags: res.tags === null ? [] : res.tags,
        requestTitle: res.title,
        user: res.volunteer === null ? "Pending" : res.volunteer,
        requestTime: moment(parseISOString(res.createTime)).format('HH:mm MM/DD/YYYY')
    })) : ongoingRequest.map((res, index) => ({
        key: index,
        status: res.status === 2 ? "Volunteer on the way" : "request sent",
        tags: res.tags === null ? [] : res.tags,
        requestTitle: res.title,
        // user: res.Senior === null ? "Pending" : res.Senior,
        requestTime: moment(parseISOString(res.createTime)).format('HH:mm MM/DD/YYYY')
    }));


    const pastData = profile.userType === 0 ? requestDetail.pastRequest.map((res, index) => ({
        key: index,
        tags: res.tags === null ? [] : res.tags,
        requestTitle: res.title === null ? "" : res.title,
        user: res.volunteer === null ? "Pending" : res.volunteer,
        requestTime: moment(parseISOString(res.createTime)).format('HH:mm MM/DD/YYYY'),
        rating: <Rating name="read-only" value={res.rating} precision={0.5} readOnly />
    })) : requestDetail.pastRequest.map((res, index) => ({
        key: index,
        tags: res.tags === null ? [] : res.tags,
        requestTitle: res.title === null ? "" : res.title,
        // user: res.Senior === null ? "Pending" : res.Senior,
        requestTime: moment(parseISOString(res.createTime)).format('HH:mm MM/DD/YYYY'),
        rating: <Rating name="read-only" value={res.rating} precision={0.5} readOnly />
    }));

    // react select of address list
    // const addressOptions = addressList.length !== 0? addressList.map(address=>({
    //      value: address, label:address
    //   })) : [{value:"default", label:"no address recorded in database"}];

    // ant select of add address
    let newAdd = "";

    const handleAdd = async () => {
        let geolocation = ""
        Axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${street1.replace(/ /g, '+') + street2.replace(/ /g, '+') +
        city.replace(/ /g, '+') + state}&key=${GOOGLE_API_KEY}`)
            .then(async response => {
                console.log(response.data);
                geolocation = response.data.results[0].geometry.location.lat + "," + response.data.results[0].geometry.location.lng

                const addressBean = {
                    streetAddressL1: street1,
                    streetAddressL2: street2,
                    city: city,
                    state: state,
                    zipCode: zipCode,
                    userId: user.uid,
                    geolocation: geolocation
                }

                if (street1 !== "" && city !== "" && state !== "" && zipCode !== "") {
                    newAdd = (street2.trim() === "" ? street1 + ", " + city + ", " + state + " " + zipCode : street1 + ", " + street2 + ", " + city + ", " + state + " " + zipCode);
                    let result = addList.filter(names=>names.add.includes(newAdd))
                    if (result.length !== 0) {
                        toast.error("This address has already in your account, please enter another one")
                    }else{
                        let id = "";
                        await RequestService.insertAddress(user.uid, addressBean).then(res => {
                            toast.success("insert address to backend success")
                            id = res.data.data;
                        }).catch(error => {
                            toast.error("insert failed")
                            console.log(error.message)
                        });
                        setAddList([...addList, {add: newAdd, id: id}])
                        setStreet1("")
                        setStreet2("")
                        setCity("")
                        setState("")
                        setZipCode("")
                        setAddressModal(false);
                    }

                } else {
                    toast.error("please fill all the information")
                }
            })
            .catch(error => {
                console.log(error.message)
            });

    }


    const ongoingColumns = profile.userType === 0 ? [

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
            width: '35%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';
                        return (
                            <Tag style={{color: '#004D40', width:'120px', textAlign:'center', fontSize: '16px'}} color={color} key={tag}>
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
            render: (text, record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <Button type="primary" style={{background: '#00897B', fontSize: '16px', textAlign: 'center'}}
                            shape="round"><a style={{textDecoration: 'none'}}
                                             onClick={() => handleRequestMange(record.key)}>request
                        management</a></Button>
                </Space>
            ),
        },
    ] : [
        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '25%'
        },
        // {
        //     title: 'Senior',
        //     dataIndex: 'user',
        //     key: 'user',
        //     width: '20%'
        // },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: '30%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';
                        return (
                            <Tag style={{color: '#004D40', width:'120px', textAlign:'center', fontSize: '16px'}} color={color} key={tag}>
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
            width: '30%'
        },

        {
            key: 'action',
            render: (text, record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <Button type="primary" style={{background: '#00897B', fontSize: '16px', textAlign: 'center'}}
                            shape="round"><a style={{textDecoration: 'none'}}
                                             onClick={() => handleRequestMange(record.key)}>request
                        management</a></Button>
                </Space>
            ),
        },
    ];


    const pastColumns = profile.userType === 0 ? [

        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '18%'
        },
        {
            title:  'Volunteer',
            dataIndex: 'user',
            key: 'user',
            width: '15%'

        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: '30%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';

                        return (
                            <Tag style={{color: '#004D40', width:'120px', textAlign:'center', fontSize: '16px'}} color={color} key={tag}>
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
            render: (text, record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <div className="-vertical">
                        <div className="m-2">
                            <Button type="primary" style={{
                                background: '#00897B',
                                width: '100px',
                                fontSize: '16px',
                                textAlign: 'center'
                            }} shape="round"><a style={{textDecoration: 'none'}}
                                                onClick={() => handlePastRequestMange(record.key)}>Detail</a></Button>
                        </div>
                        <div className="m-2">
                            <Button type="primary" style={{
                                background: '#00897B',
                                width: '100px',
                                fontSize: '16px',
                                textAlign: 'center'
                            }} shape="round" onClick={()=>handleDelete(record.key)}>Delete</Button>
                        </div>
                    </div>
                </Space>
            ),
        },
    ]:[

        {
            title: 'Request title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            width: '18%'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width: '30%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';

                        return (
                            <Tag style={{color: '#004D40', width:'120px', textAlign:'center', fontSize: '16px'}} color={color} key={tag}>
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
            render: (text, record) => (

                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <div className="-vertical">
                        <div className="m-2">
                            <Button type="primary" style={{
                                background: '#00897B',
                                width: '100px',
                                fontSize: '16px',
                                textAlign: 'center'
                            }} shape="round"><a style={{textDecoration: 'none'}}
                                                onClick={() => handlePastRequestMange(record.key)}>Detail</a></Button>
                        </div>
                        <div className="m-2">
                            <Button type="primary" style={{
                                background: '#00897B',
                                width: '100px',
                                fontSize: '16px',
                                textAlign: 'center'
                            }} shape="round" onClick={() => handleDelete(record.key)}>Delete</Button>
                        </div>
                    </div>
                </Space>
            ),
        },
    ];


    return (
        <div style={customStyle} className="main">
            <h1 style={{
                marginTop: '-50px',
                marginBottom: '70px',
                float: 'left'
            }}>Welcome{user == null ? "" : ", " + fullName}</h1>

            <div className="col-sm-1">
                <select id="optionState" className="ml-3" style={{border: 'none', color: '#004D40', outline: 'none'}}
                        defaultValue="none" onChange={handleChange}>
                    <option  value="none" disabled hidden>{past}</option>
                        <option value="onGoing">Ongoing Requests</option>
                    <option value="past">Past Requests</option>
                </select>
            </div>


            {past === 'Past Requests' ?
                <Table columns={pastColumns} dataSource={pastData} pagination={{defaultPageSize: 5}}/> :
                <Table columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}}/>}

            <div className="mt-3">
                {past === 'Past Requests' ?
                    (pastData.length === 0 ? <h2>Currently no data record</h2> : null) :
                    (onGoingData.length === 0 ? <h2>Currently no data record</h2> : null)}
            </div>

            {profile.userType === 0 &&
            <Button type="primary"
                    style={{background: '#00897B', width: '250px', height: '40px', fontSize: '18px', marginTop: '10px'}}
                    shape="round"  onClick={handleQuestionnaire}>Post New Request</Button>
            }


            <MuiThemeProvider>
                <Modal style={modalStyle} isOpen={ModalIsOpen} appElement={document.getElementById('root')}>
                    <h1 className="text-center">Post Request</h1>
                    <form>
                        <div>
                            <label className="form-inline" style={{height: '50px'}}>Title
                                <TextField style={{marginTop: '5px', marginLeft: '10px'}} required id="standard-basic"
                                           onChange={e => setTitle(e.target.value)}/>
                            </label>
                            <div>
                                <div className="tags-input">
                                    <Select isMulti={true} maxMenuHeight={200} options={options} onChange={addTags}
                                            placeholder={<div>Select tags</div>} closeMenuOnSelect={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="validationTextarea"/>
                            <textarea className="form-control"
                                      placeholder="Required request detail" required
                                      onChange={e => setText(e.target.value)}>
                    </textarea>
                        </div>
                        <div className="form-inline mt-3">
                            <label>Phone Number </label>
                            <ReactPhoneInput
                                style={{width: '50%', marginLeft: '10px'}}
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
                                onChange={e => (setPhoneNumber(e))}
                            />

                        </div>

                        <div className="form-group mt-3">
                            <AntSelect
                                style={{width: '100%', fontSize: '16px'}}
                                placeholder="Select your address"
                                onChange={selectAddress}
                                dropdownRender={(menu) => (
                                    <div>
                                        {menu}
                                        <Divider style={{margin: "4px 0"}}/>
                                        <div style={{display: "flex", flexWrap: "nowrap"}}>
                                            <a
                                                style={{
                                                    flex: "none",
                                                    padding: "8px",
                                                    display: "block",
                                                    cursor: "pointer"
                                                }}
                                                onClick={e => (setAddressModal(true))}
                                            >
                                                <PlusOutlined/> Add address
                                            </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {addList.length !== 0 ? addList.map((address, index) => (
                                        <Option value={[address.add, address.id]} style={{fontSize: '18px'}}
                                                data-set={address.add} key={index}>{address.add}</Option>
                                    )) :
                                    <Option style={{fontSize: '18px'}} value="default">No address found in your account,
                                        please add one</Option>}
                            </AntSelect>
                        </div>

                        <div>
                            <Modal style={addressModalStyle} isOpen={addressModal}
                                   appElement={document.getElementById('root')}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Address</label>
                                        <input type="text" className="form-control" id="inputAddress"
                                               placeholder="Enter your street"
                                               onChange={e => (setStreet1(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress2">Address 2</label>
                                        <input type="text" className="form-control" id="inputAddress2"
                                               placeholder="Apartment, unit, or floor"
                                               onChange={e => (setStreet2(e.target.value))}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputCity">City</label>
                                            <input type="text" className="form-control" id="inputCity"
                                                   onChange={e => setCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputState">State</label>
                                            <SelectUSState id="inputState" className="form-control"
                                                           onChange={e => setState(e)}/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="inputZip">Zip</label>
                                            <input type="text" className="form-control" id="inputZip"
                                                   onChange={e => setZipCode(e.target.value)}/>
                                        </div>
                                    </div>
                                    <Button type="primary" style={{background: '#00897B', width: '80px'}} shape="round"
                                            className="float-right" onClick={handleAdd}>add</Button>
                                    <label style={{color: '#00897B', cursor: 'pointer'}} className="float-right m-2"
                                           onClick={() => setAddressModal(false)}>Cancel</label>
                                </form>
                            </Modal>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked={checked}
                                   onChange={handleCheckBox}/>
                            <label className="form-check-label">Physical contact needed</label>
                        </div>
                        <Button type="primary" style={{background: '#00897B', width: '80px'}} shape="round"
                                className="float-right" onClick={handleSubmit}>Post</Button>
                        <label style={{color: '#00897B', cursor: 'pointer'}} className="float-right m-2"
                               onClick={() => setModalIsOpen(false)}>Cancel</label>
                    </form>
                </Modal>
            </MuiThemeProvider>

            <Modal style={deleteModalStyle} isOpen={deleteModal} appElement={document.getElementById('root')}>
                <h2>Delete Request</h2>
                <p>Are you sure to cancel this appointment? you will not be able to undo this action once it is
                    completed</p>
                <Button type="primary" style={{background: '#00897B', width: '80px'}} shape="round"
                        className="float-right" onClick={handleConfirm}>Confirm</Button>
                <label style={{color: '#00897B', cursor: 'pointer'}} className="float-right m-2"
                       onClick={() => setDeleteModal(false)}>Cancel</label>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                style={questionnaireStyle}
                appElement={document.getElementById('root')}
                isOpen={questionnaireModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <Fade in={questionnaireModal}>
                    <div className={classes.paper}>
                        <div style={{
                            width: "100%",
                            height: "100%",
                            overflowY: "scroll",
                            paddingRight: "17px",
                            boxSizing: "content-box",

                        }}>
                            <h2 id="transition-modal-title" className="text-center">COVID-19 Self Health Check</h2>
                            <h6>Are you currently experiencing any of the following symptoms that started within the
                                last 14 days?</h6>
                            <ul>
                                <li>Fever or chills</li>
                                <li>Cough</li>
                                <li>Shortness of breath or difficulty breathing</li>
                                <li>Fatigue</li>
                                <li>Muscle or body aches</li>
                                <li>Headache</li>
                                <li>Loss of taste or smell</li>
                                <li>Sore throat</li>
                                <li>Congestion or runny nose</li>
                                <li>Nausea or vomiting</li>
                                <li>Diarrhea</li>
                            </ul>
                            <h6>Over the past 14 days, have you been informed by a public health agency or a healthcare
                                system that you have been exposed to COVID-19?</h6>
                            <br></br>
                            <h6>Over the past 14 days, has a person in your household been diagnosed with COVID-19
                                infection?</h6>
                            <br></br>
                            <h4>If your answer is YES for any of the questions above, we advice you to stay home and
                                avoid physical contacts.</h4>
                            {/* <TextField
                  className={classes.textfield}
                  label={`Enter new ${modalTitle}`}
                  onChange={handleModalChange}
                  defaultValue={modalContent}
                  multiline
                  rows={modalTitle === "Description" ? 6 : 1}
              /> */}
                            <div>
                                {/* <Button onClick={submitChange} style={{float:"right", color:"white",backgroundColor:"#00897B"}}>Save</Button> */}
                                <Button onClick={handleClose}
                                        style={{float: "right", color: "white", backgroundColor: "#00897B"}}>I
                                    acknowledge</Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

        </div>
    );
}

const customStyle = {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%'
}

const modalStyle = {
    overlay: {
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
        borderRadius: '30px',
        transform: 'translate(-40%, -10%)',
    },

}

const addressModalStyle = {
    overlay: {
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
        borderRadius: '30px',
        transform: 'translate(-40%, 5%)',
    },
}

const deleteModalStyle = {
    overlay: {
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
        width: '20%',
        borderRadius: '30px',
        transform: 'translate(-40%, 40%)',
    },
}
const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: "#e3e8e7",
        height: "100vh"
    },
    info: {
        backgroundColor: "white",
        borderRadius: "30px",
        width: "80%",
        margin: 'auto',
        textAlign: 'left',
        padding: '25px',
        marginTop: "5vh",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate(0%, 10%)',

    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "30px",
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2, 4, 3),
        width: "50%",
        height: "70vh",

},
    textfield: {
        width: "100%",
    }

}));

const questionnaireStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(116, 130, 128, 0.6)'
    },
}

export default PostRequest;