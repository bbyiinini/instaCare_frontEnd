import React, {useState} from "react";
import { Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    UserAddOutlined, LogoutOutlined
} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import db from "../../base";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";


const { SubMenu, Item } = Menu;


const NavHeader = () => {
    const [currState, setCurrState] = useState('home')
    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (event) => {
        setCurrState(event.key)
    }

    const logout = () => {
        db.auth().signOut().then(r =>{
            toast.success("user logged out!")
        });
        dispatch({
            type: 'LOGOUT',
            payload: null
        });

        history.push("/login");
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[currState]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="logout" icon={<LogoutOutlined />} className="float-right" onClick={logout}>
                Logout
            </Item>

            <Item key="signup" icon={<UserAddOutlined />} className="float-right">
                <Link to="/signup">Sign Up</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>



            {/*<SubMenu key="SubMenu" icon={<SettingOutlined />} title="User">*/}
            {/*    <Menu.ItemGroup title="Item 1">*/}
            {/*        <Item key="setting:1">Option 1</Item>*/}
            {/*        <Item key="setting:2">Option 2</Item>*/}
            {/*    </Menu.ItemGroup>*/}
            {/*</SubMenu>*/}
        </Menu>
    );
}


export default NavHeader;