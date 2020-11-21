import React from "react";
import {useHistory} from "react-router-dom";
import {Button, Table, Pagination, Space, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import "../../style/PostRequest.css";

const PostRequest = () => {


    const requestDetail = useSelector((state)=>state.requestDetail)
    let history = useHistory();
    const dispatch = useDispatch();


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
    const onGoingData = allOnGoingRequest.map((res,index)=>({
        key: index,
        tags: res.tags===null?[]:res.tags,
        address: res.address,
        requestContent: res.requestContent
    }));



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

            <Table  columns={ongoingColumns} dataSource={onGoingData} pagination={{defaultPageSize: 5}} />

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