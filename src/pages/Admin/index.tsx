import React, { lazy, Suspense } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserSwitchOutlined,
    FileDoneOutlined,
    AlertOutlined
} from '@ant-design/icons';
import './index.css'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
const User = lazy(() => import('./User'))
const Article = lazy(() => import('./Article'))
const ViolationArticle = lazy(() => import('./ViolationArticle'))
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
                    <div className="logo">{!collapsed ? <div>后台管理系统</div> : <div>菜单</div>}</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" style={{ height:60}} icon={<UserSwitchOutlined style={{ fontSize: 20 }} />}>
                            <NavLink to='/admin/user'> 用户管理  </NavLink>
                        </Menu.Item>

                        <Menu.Item key="2" style={{ height: 60 }} icon={<FileDoneOutlined style={{ fontSize: 20 }} />}>
                            <NavLink to='/admin/article'> 文章管理  </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" style={{ height: 60 }} icon={<AlertOutlined style={{ fontSize: 20 }} />
                        }>
                            <NavLink to='/admin/violationArticle'>违规文章</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#fff", paddingLeft: 20 ,height:90,paddingTop:15}}>
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
                        <Suspense fallback={<h2>Loading...</h2>}>
                            <Switch>
                                {/* <Route path='/admin' component={Home} />
                                <Route path='/about' component={About} />
                                <Redirect to='/about' /> */}
                                <Route path='/admin/user' component={User} />
                                <Route path='/admin/article' component={Article} />
                                <Route path='/admin/violationArticle' component={ViolationArticle} />
                                <Redirect to='/admin/user' />
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
