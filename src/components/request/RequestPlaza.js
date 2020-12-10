import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import  {Button, Space, Table, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import "../../style/PostRequest.css";
import "../../style/RequestPlaza.css";
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";
import Checkbox from '@material-ui/core/Checkbox';
import 'react-image-picker/dist/index.css'
import babysitting from '../../assets/babysitting.png';
import cloth_donation from '../../assets/cloth_donation.png';
import consulting from '../../assets/consulting.png';
import easy_to_do from '../../assets/easy to do.png';
import emergency from '../../assets/emergency.png';
import grocery from '../../assets/glocery.png';
import in_home_care from '../../assets/in-home care.png';
import medicine from '../../assets/medicine.png';
import remote from '../../assets/remote.png';
import rides from '../../assets/Rides.png';
import technology from '../../assets/technology.png';
import time_consuming from '../../assets/time-consuming.png';
import with_tips from '../../assets/with tips.png';
import chore from '../../assets/chore.png';
import allTags from  '../../assets/all_tags.png'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import {firestore} from "../../base";


const ENTER_KEY = 13;
const PostRequest = () => {

    const {user} = useSelector((state)=>({...state}))
    const requestDetail = useSelector((state)=>state.requestDetail)
    const addrList = useSelector((state)=>state.address)
    let history = useHistory();
    const dispatch = useDispatch();
    const [ongoing, setOngoing] = useState([]);
    const [temp, setTemp] = useState([]);
    const [flag, setFlag] = useState(true);
    const [tag, setTag] = useState(true);
    const [prevState, setPrevState] = useState("");
    const [filterResult, setFilterResult] = useState([]);
    const [tagModal, setTagModal] = useState(false);
    const [tagList, setTagList] = useState(['All tags']);
    const [value, setValue] = useState("");
    const [addrDistance, setAddrDistance] = useState([]);

    const [distanceModal, setDistanceTagModal] = useState(false);
    const [distance, setDistance] = useState("unlimited");
    const [distanceFlag, setDistanceFlag] = useState(true);
    const [distanceText, setDistanceText] = useState("All Distance");
    const [distanceLoading, setDistanceLoading] = useState(false);

    const handleRequestMange = (key) =>{
        dispatch({
            type: 'OREQBYID',
            payload: requestDetail.allOnGoingRequest[key],
        });
        history.push('/requestmangement');
    }


    if(!requestDetail || !requestDetail.allOnGoingRequest || !addrList || !addrList.addressList){
        return <h1>Loading...</h1>
    }

    let {allOnGoingRequest} = requestDetail
    if (flag === true && allOnGoingRequest.length !== 0 ){
        setOngoing(allOnGoingRequest);
        setFlag(false)
    }

    const onGoingData = ongoing.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        // address: addrList.addressList.filter(addr => addr.id===index).length===0?"":addrList.addressList.filter(addr => addr.id===index)[0].addr,
        address: addrList.addressList.filter(addr => addr.id===index).length===0?"":addrList.addressList.filter(addr => addr.id===index)[0].addr,
        requestContent: res.requestContent,
    }));


    const handleFilter = () => {
        if (tagList.length === 0) {
            setOngoing(allOnGoingRequest)
            setTagModal(false)
            document.getElementById("allTag").innerHTML = "All tags"
            return;
        }
        setTag(false)
        let result=[];
        for (let i = 0; i < tagList.length; i++){
            result = [...result, ...allOnGoingRequest.filter(name=>name.tags.map(res=>res).includes(tagList[i]))]
        }

        if (tagList.length !== 0) {
            document.getElementById("allTag").innerHTML = tagList.join(", ")
        }

        setFilterResult(result);
        if (result.length === 0 ){
            setFlag(false)
            setOngoing([])
        }else {
            setOngoing(result)
        }

        setTagModal(false)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
        if (e.target.value === "" && tag === true){
            setOngoing(allOnGoingRequest)
            document.getElementById("allTag").innerHTML = "All tags"
        }else if (e.target.value === "") {
            setOngoing(filterResult)
        }
    }
    const keyPress = (e) => {
        if (e.keyCode === ENTER_KEY){
            handleSearch()
        }
    }

    const handleDistanceChange = (e)=>{

        setDistance(e.target.value)

    }

    const handleDistanceApply = (e)=>{
        setDistanceLoading(true)
        switch (distance){
            case "5": setDistanceText("Within 5 miles")
                break
            case "10": setDistanceText("Within 10 miles")
                break
            case "30": setDistanceText("Within 30 miles")
                break
            case "50": setDistanceText("Within 50 miles")
                break
            case "unlimited": setDistanceText(" All Distance")
                break
        }
        if (distance === "unlimited"){
            setOngoing(allOnGoingRequest)
        }
            let distanceArr = [];
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log(pos)
                setDistanceLoading(false)
                setDistanceTagModal(false)

                console.log(allOnGoingRequest)
                let allOnGoingRequestWithAddress = []
                allOnGoingRequest.forEach((element, index)=>{
                    console.log(element)

                    firestore.doc(`/users/${element.seniorId}/address/${element.addressID}`).get()
                        .then((doc) => {
                            if(!doc.exists){
                                console.error(`/users/${element.seniorId}/address/${element.addressID}`)
                                console.error(element)
                                return
                            }
                            let geolocation = doc.data().geolocation
                            console.log('geolocation: ', geolocation)

                            let geolocationArr = geolocation.split(",")


                            let distance = calculateDistance(pos.coords.latitude,pos.coords.longitude,Number(geolocationArr[0]),Number(geolocationArr[1]))
                            console.log(distance)
                            distanceArr = [...distanceArr, distance]
                            if (index === allOnGoingRequest.length-1){
                                setAddrDistance(distanceArr)
                                setDistanceFlag(true)
                            }
                        }).catch(()=>{
                        console.error(`/users/${element.seniorId}/address/${element.addressID}`)
                        console.error(element)
                    })
                })





            },
            (err) => {
                console.log(err)
            },
            {
                enableHighAccuracy: true,
            })


    }


    const handleDistanceFilter = (distance) => {
        let filterResult = [];
        allOnGoingRequest.map((element, index)=>{
            if (addrDistance[index]<=distance){
                filterResult = [...filterResult, element]
            }
            if (index === addrDistance.length-1){
                console.log(filterResult)
                setOngoing(filterResult)
            }
        })
        setDistanceFlag(false)
    }

    if (distanceText !== "All Distance" && distanceFlag){
        switch (distanceText) {
            case 'Within 5 miles':
                    handleDistanceFilter(5)
                break
            case 'Within 10 miles':
                    handleDistanceFilter(10)
                break
            case 'Within 30 miles':
                handleDistanceFilter(30)
                break
            case 'Within 50 miles':
                handleDistanceFilter(50)
                break
        }
    }



    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

        return (12742 * Math.asin(Math.sqrt(a)))/ 1.6; // 2 * R; R = 6371 km
    }

    const handleSearch = () => {
        let search = ongoing.map(res=>(JSON.stringify(res))).filter(keyword=>keyword.toLowerCase().includes(value.toLowerCase()))
        let result = search.map(res=>(JSON.parse(res)))
        if (result.length !== 0) {
            setTemp(search)
            setPrevState(value)
        }

        if (value === "" && tagList.includes("All tags")){
            setOngoing(allOnGoingRequest)
        }else if (result.length === 0){
            if (!tagList.includes("All tags")  && value===prevState){
                temp.filter(keyword=>keyword.toLowerCase().includes(value))
                let tempResult = temp.map(res=>(JSON.parse(res)))
                setOngoing(tempResult)
            }else{
                if (tagList.includes("All tags")  && value === prevState){
                    temp.filter(keyword=>keyword.toLowerCase().includes(value))
                    let tempResult = temp.map(res=>(JSON.parse(res)))
                    setOngoing(tempResult)
                    return;
                }
                setFlag(false)
                setOngoing([])
            }
        }else if (value === "" && !tagList.includes("All tags")){
            setOngoing(filterResult)
        }else{
            setOngoing(result)
        }
    }

    const handleTagOpen = () => {
        setTagModal(true);
        setTagList([]);
    }

    const handleDefault = () => {
        setOngoing(allOnGoingRequest)
        setTagList(['All tags'])
        setTagModal(false)
        setTag(true)
        document.getElementById("allTag").innerHTML = "All tags"
    }

    const tagOnchange = (e) => {
        let value = e.target.value;
        if (e.target.checked){
            setTagList([...tagList, value])
        }else {
            setTagList(tagList.filter(item=>item !== value ))
        }

    }

    const ongoingColumns = [

        {
            title: 'Request',
            dataIndex: 'requestContent',
            key: 'requestContent',
            width: '30%'
        },

        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width:'35%',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = '#B2DFDB';

                        return (
                            <Tag style={{color:'#004D40', width:'120px', textAlign:'center', fontSize:'16px'}} color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '30%'
        },

        {
            key: 'action',
            render: (text,record) => (
                <Space size="middle">
                    {/*<a>Invite {record.name}</a>*/}
                    {/*<a>Delete</a>*/}
                    <Button type="primary" style={{background:'#00897B', width:'180px', fontSize:'16px'}} shape="round" ><a style={{textDecoration:'none'}} onClick={()=>handleRequestMange(record.key)}>See Detail</a></Button>
                </Space>
            ),
        },
    ];


    return (
        <div style={customStyle}>
                <div style={customSelect}>
                    <label style={{color:'rgba(0, 0, 0, 0.3)', marginRight: '5px'}}>show: </label>
                    {/*<select style={{border:'none', outline:'none'}} id='foo' defaultValue="selected" onChange={handleFilter}>*/}
                    {/*<select style={{border:'none', outline:'none'}} id='foo' onClick={()=>{setTagModal(true)}}>*/}
                    {/*    <option value='All tags'>All tags</option>*/}
                    {/*    /!*<option value='Shopping'>Shopping</option>*!/*/}
                    {/*    /!*<option value='Cleaning'>Cleaning</option>*!/*/}
                    {/*    /!*<option value='Tool needed'>Tool needed</option>*!/*/}
                    {/*    /!*<option value='Easy to do'>Easy to do</option>*!/*/}
                    {/*</select>*/}
                    <label id="allTag" style={{cursor:'pointer'}} onClick={handleTagOpen}>All tags</label> <DownOutlined onClick={handleTagOpen} style={{fontSize:'12px', color:'rgba(0, 0, 0, 0.5)', transform:'translate(-10%, -25%)'}}/>

                </div>
                <div style={customSelect}>
                    <label  style={{color:'rgba(0, 0, 0, 0.3)',marginRight: '5px'}}>Distance:</label>
                    {/*<select style={{border:'none', outline:'none'}} id='foo'>*/}
                    {/*    <option value='1'>Within 100 miles</option>*/}
                    {/*    <option value='2'>Within 5 miles</option>*/}
                    {/*    <option value='3'>Within 10 miles</option>*/}
                    {/*    <option value='4'>Within 20 miles</option>*/}
                    {/*    <option value='4'>Within 30 miles</option>*/}
                    {/*</select>*/}
                    <label id="distance" style={{cursor:'pointer'}} onClick={e=>setDistanceTagModal(true)}>{distanceText
                    }</label> <DownOutlined onClick={e=>setDistanceTagModal(true)} style={{fontSize:'12px', color:'rgba(0, 0, 0, 0.5)', transform:'translate(-10%, -25%)'}}/>

                </div>
                <div style={customSelect}>
                    <label  style={{color:'rgba(0, 0, 0, 0.3)', marginLeft:'-25px'}}>{<SearchOutlined />}</label>
                    <MuiThemeProvider>
                        <TextField style={searchInput} InputProps={{ disableUnderline: true }} placeholder="Enter keyword here"
                         onChange={handleChange} onKeyDown={keyPress}/>
                    </MuiThemeProvider>
                </div>

            <Table  columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}} />
            <div className="mt-3">
                {ongoing.length === 0 || allOnGoingRequest.length === 0?<h2>Currently no data record</h2>:null}
            </div>

            <Modal style={tagModalStyle} isOpen={tagModal}  onRequestClose={handleDefault} appElement={document.getElementById('root')}>
               <div className="parent">
                   <div className="child">
                       <img src={chore} alt="chore"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Chore"
                               />
                           }
                           label="Chore"/>
                   </div>
                   <div className="child">
                       <img src={grocery} alt="grocery"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Grocery"
                               />
                           }
                           label="Grocery"/>
                   </div>
                   <div className="child">
                       <img src={technology} alt="technology"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Technology"
                               />
                           }
                           label="Technology"/>
                   </div>
                   <div className="child">
                       <img src={cloth_donation} alt="cloth_donation"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Cloth Donation"
                               />
                           }
                           label="Cloth Donation"/>
                   </div>
                   <div className="child">
                       <img src={medicine} alt="medicine"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Medicine"
                               />
                           }
                           label="Medicine"/>
                   </div>
                   <div className="child">
                       <img src={easy_to_do}  alt="easy_to_do"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Easy to do"
                               />
                           }
                           label="Easy to do"/>
                   </div>
                   <div className="child">
                       <img src={rides} alt="rides"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Rides"
                               />
                           }
                           label="Need a Ride"/>
                   </div>
                   <div className="child">
                       <img src={time_consuming}  alt="time_consuming"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Time Consuming"
                               />
                           }
                           label="Time Consuming"/>
                   </div>
                   <div className="child">
                       <img src={remote} alt="remote"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Remote"
                               />
                           }
                           label="Remote"/>
                   </div>
                   <div className="child">
                       <img src={with_tips}  alt="with_tips"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="With Tips"
                               />
                           }
                           label="With Tips"/>
                   </div>
                   <div className="child">
                       <img src={babysitting} alt="babysitting"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Babysitting"
                               />
                           }
                           label="Babysitting"/>
                   </div>
                   <div className="child">
                       <img src={emergency} alt="emergency"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Emergency"
                               />
                           }
                           label="Emergency"/>
                   </div>
                   <div className="child">
                       <img src={consulting} alt="consulting"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="Consulting"
                               />
                           }
                           label="Consulting"/>
                   </div>
                   <div className="child">
                       <img src={in_home_care} alt="in_home_care"/>
                       <FormControlLabel
                           control={
                               <Checkbox
                                   onChange={tagOnchange}
                                   color="primary"
                                   value="In-home Care"
                               />
                           }
                           label="In-home Care"/>
                   </div>

                   <div className="child">
                       <img src={allTags} style={{cursor:'pointer'}} onClick={handleDefault} alt="all_tags"/>
                       <label style={{cursor:'pointer'}} onClick={handleDefault} defaultValue="All tags">All Tags</label>
                   </div>
                   <Button type="primary" style={{background: '#00897B', width: 'auto', marginTop:'55px'}} shape="round"
                                                   className="child" onClick={handleFilter}>Apply</Button>
               </div>

            </Modal>
            <Modal style={distanceModalStyle} isOpen={distanceModal} onRequestClose={e=>setDistanceTagModal(false)} appElement={document.getElementById('root')}>
                <div className="text-center">
                    <FormControl>
                        <RadioGroup aria-label="distance" name="distance1" value={distance} onChange={handleDistanceChange}>
                            <FormControlLabel value="5" control={<Radio color="primary"/>}   label={<span style={{ fontSize: '20px' }}>Within 5 miles</span>}/>
                            <FormControlLabel value="10" control={<Radio color="primary"/>}  label={<span style={{ fontSize: '20px' }}>Within 10 miles</span>}/>
                            <FormControlLabel value="30" control={<Radio color="primary"/>}  label={<span style={{ fontSize: '20px' }}>Within 30 miles</span>}/>
                            <FormControlLabel value="50" control={<Radio color="primary"/>}  label={<span style={{ fontSize: '20px' }}>Within 50 miles</span>}/>
                            <FormControlLabel value="unlimited" control={<Radio color="primary"/>}  label={<span style={{ fontSize: '20px' }}>All Distance</span>}/>
                        </RadioGroup>
                    </FormControl>

                    <Button type="primary" style={{background: '#00897B', width: '180px', marginTop:'5px'}} shape="round"
                            className="child" onClick={handleDistanceApply} disabled={distanceLoading}>{distanceLoading?"Loading":"Apply"}</Button>
                </div>

            </Modal>
        </div>
    );
}

const customStyle = {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
}


const customSelect = {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'inline',
    paddingLeft: '10px',
    height:'38px',
    float:'left',
    marginLeft:'30px',
    borderRadius: '6px',
    marginBottom: '50px',

}


const searchInput = {
    marginTop: '5px',
    marginLeft: '10px',
    height: '20px',
    width:'75%',
}

// const tagModalStyle = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: '#FFFFFF, 100%'
//     },
//     content: {
//         top: '21.5%',
//         left: '6.5%',
//         right: 'auto',
//         bottom: 'auto',
//         width: '600px',
//         borderRadius: '10px',
//         // transform: 'translate(-50%,10%)',
//     },
// }

const tagModalStyle = {
    overlay:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(116, 130, 128, 0.6)'
    },
    content: {
        top: '20%',
        left: '30%',
        right: 'auto',
        bottom: 'auto',
        width: '600px',
        height:'580px',
        borderRadius:'10px',
        // transform: 'translate(-40%, -10%)',
    },
}

const distanceModalStyle = {
    overlay:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(116, 130, 128, 0.6)'
    },
    content: {
        top: '30%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        width: '280px',
        height: '350px',
        borderRadius: '10px',
        // transform: 'translate(-50%,10%)',
    },
}

export default PostRequest;