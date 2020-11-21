import {Button, Pagination, Space, Tag} from "antd";
import React, {useState} from "react";
import {Link} from "react-router-dom";



export const modalStyle = {
    overlay:{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
        top: '15%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '30%',
        borderRadius:'30px',
        transform: 'translate(-40%, -10%)',
    },

}


//
// export const ongoingColumns = [
//
//     {
//         title: 'Status',
//         dataIndex: 'status',
//         key: 'status',
//         width: '15%'
//     },
//     {
//         title: 'Request title',
//         dataIndex: 'requestTitle',
//         key: 'requestTitle',
//         width: '15%'
//     },
//     {
//         title: 'Volunteer',
//         dataIndex: 'volunteer',
//         key: 'volunteer',
//         width: '10%'
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         width:'5%',
//         render: tags => (
//             <>
//                 {tags.map(tag => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'Grocery') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Request Time',
//         dataIndex: 'requestTime',
//         key: 'requestTime',
//         width: '20%'
//     },
//
//     {
//         key: 'action',
//         render: () => (
//
//             <Space size="middle">
//                 {/*<a>Invite {record.name}</a>*/}
//                 {/*<a>Delete</a>*/}
//                 <Button type="primary" style={{background:'green'}} shape="round" ><Link to="/requestmangement" style={{textDecoration:'none'}}>request management</Link></Button>
//             </Space>
//         ),
//     },
// ];
//


// export const pastColumns = [
//
//     {
//         title: 'Request title',
//         dataIndex: 'requestTitle',
//         key: 'requestTitle',
//         width: '15%'
//     },
//     {
//         title: 'Volunteer',
//         dataIndex: 'volunteer',
//         key: 'volunteer',
//         width: '10%'
//     },
//     {
//         title: 'Tags',
//         key: 'tags',
//         dataIndex: 'tags',
//         width:'5%',
//         render: tags => (
//             <>
//                 {tags.map(tag => {
//                     let color = tag.length > 5 ? 'geekblue' : 'green';
//                     if (tag === 'Grocery') {
//                         color = 'volcano';
//                     }
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Request Time',
//         dataIndex: 'requestTime',
//         key: 'requestTime',
//         width: '20%'
//     },
//     {
//         title: 'Rating',
//         dataIndex: 'rating',
//         key: 'rating',
//         width: '10%'
//     },
//
//     {
//         key: 'action',
//         render: () => (
//
//             <Space size="middle">
//                 {/*<a>Invite {record.name}</a>*/}
//                 {/*<a>Delete</a>*/}
//                 <Button type="primary" style={{background:'green'}} shape="round" ><Link to="/requestmangement" style={{textDecoration:'none'}}>Detail</Link></Button>
//             </Space>
//         ),
//     },
// ];


// const data = [
//         {
//             key: '1',
//             name: 'John Brown',
//             age: 32,
//             address: 'New York No. 1 Lake Park',
//             tags: ['nice', 'developer'],
//         },
//         {
//             key: '2',
//             name: 'Jim Green',
//             age: 42,
//             address: 'London No. 1 Lake Park',
//             tags: ['loser'],
//         },
//         {
//             key: '3',
//             name: 'Joe Black',
//             age: 32,
//             address: 'Sidney No. 1 Lake Park',
//             tags: ['cool', 'teacher'],
//         },
//     ];

