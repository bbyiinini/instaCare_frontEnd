import React, {useState} from "react";
import { Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    UserAddOutlined, LogoutOutlined, SettingOutlined
} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import db from "../../base";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";


const { SubMenu, Item } = Menu;


const NavHeader = () => {
    const [currState, setCurrState] = useState('home')
    let dispatch = useDispatch();
    let history = useHistory();
    let {user} = useSelector((state)=>(state))
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


            {!user && (
                <Item key="signup" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/signup">Sign Up</Link>
                </Item>

            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            )}

            {user && (
                <SubMenu key="SubMenu" icon={<SettingOutlined />} className="float-right" title={user.displayName==null?"user":user.displayName}>
                    <Menu.ItemGroup title="Profile">
                        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
                    </Menu.ItemGroup>
                </SubMenu>
            )}

        </Menu>
    );
}


export default NavHeader;