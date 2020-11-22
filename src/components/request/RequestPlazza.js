import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Table, Pagination, Space, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import "../../style/PostRequest.css";
import {SearchOutlined} from '@ant-design/icons';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField";
const PostRequest = () => {


    const requestDetail = useSelector((state)=>state.requestDetail)
    let history = useHistory();
    const dispatch = useDispatch();
    const [ongoing, setOngoing] = useState([]);
    const [tag, setTag] = useState("All tags");

    const handleRequestMange = (key) =>{
        dispatch({
            type: 'OREQBYID',
            payload: requestDetail.ongoingRequest[key],
        });
        history.push('/requestmangement');
    }




    if(!requestDetail || !requestDetail.allOnGoingRequest){
        return null
    }

    let {allOnGoingRequest} = requestDetail
    if (ongoing.length === 0 && tag === 'All tags'){
        setOngoing(allOnGoingRequest);
    }
    const onGoingData = ongoing.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        address: res.address,
        requestContent: res.requestContent
    }));

    const handleFilter = (e) => {

        let result = allOnGoingRequest.filter(name=>name.tags.includes(e.target.value))

        if (result.length === 0 ){
            if (e.target.value === 'All tags'){
                setOngoing(allOnGoingRequest)
                return;
            }
            setTag("")
            setOngoing([])

        }else {
            setOngoing(result)
        }
    }

    const handleSearch = (e) => {
    }


    const ongoingColumns = [

        {
            title: 'Request',
            dataIndex: 'requestContent',
            key: 'requestContent',
            width: '40%'
        },

        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            width:'15%',
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '40%'
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
                    <label style={{color:'rgba(0, 0, 0, 0.3)'}}>Show:</label>
                    <select style={{border:'none', outline:'none'}} id='foo' defaultValue="selected" onChange={handleFilter}>
                        <option value='All tags'>All tags</option>
                        <option value='Shopping'>Shopping</option>
                        <option value='Cleaning'>Cleaning</option>
                        <option value='Tool needed'>Tool needed</option>
                        <option value='Easy to do'>Easy to do</option>
                    </select>
                </div>
                <div style={customSelect}>
                    <label  style={{color:'rgba(0, 0, 0, 0.3)'}}>Distance:</label>
                    <select style={{border:'none', outline:'none'}} id='foo'>
                        <option value='1'>Within 100 miles</option>
                        <option value='2'>Within 5 miles</option>
                        <option value='3'>Within 10 miles</option>
                        <option value='4'>Within 20 miles</option>
                        <option value='4'>Within 30 miles</option>
                    </select>
                </div>
                <div style={customSelect}>
                    <label  style={{color:'rgba(0, 0, 0, 0.3)', marginLeft:'-25px'}}>{<SearchOutlined />}</label>
                    <MuiThemeProvider>
                        <TextField style={searchInput} InputProps={{ disableUnderline: true }} placeholder="Enter keyword here"
                         onChange={handleSearch}/>
                    </MuiThemeProvider>
                </div>

            <Table  columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}} />

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



export default PostRequest;