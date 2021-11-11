import React from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import './index.css'
import {Route} from 'react-router-dom'
const { Header, Sider, Content } = Layout;
export default function Index() {
    const [collapsed, setcollapsed] = React.useState(false)
    const toggle = () => {
        setcollapsed(!collapsed)
    }
    return (
        <div className='home'>
            <Layout className='layout'>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">{!collapsed?<div>后台管理系统</div>:<div>菜单</div>}</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item  key="1" style={{height:50}} icon={<UserSwitchOutlined />}>
                            用户管理
                        </Menu.Item>
                        <Menu.Item key="2" style={{height:50}} icon={<VideoCameraOutlined />}>
                            nav 2
                        </Menu.Item>
                        <Menu.Item key="3" style={{height:50}} icon={<UploadOutlined />}>
                            nav 3
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0,backgroundColor:"#fff",paddingLeft:20 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {/* <Route/> */}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
