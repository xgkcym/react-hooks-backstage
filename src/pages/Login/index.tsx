import React from 'react'
import logo from '../../logo.svg'
import './index.css'
import { Form, Input, Button, Checkbox } from 'antd';
import request from '../../util/request';
import PubSub from 'pubsub-js'
function Index(props: any) {
    const onFinish = async (values: any) => {
        // console.log('Success:', values);
        if (!values.remember) {
            return alert('请勾选同意协议')
        }
        const { telphone, password } = values
        const res = await request.post('/login',{telphone,password})  
        if(res.status === 200){
            // store.dispatch({
            //     type:"setUserInfo",
            //     data:res.data
            // })
            
        // props.history.replace('/admin')

        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <header className="App-header">
            <div style={{color:'#fff'}}>{}</div>
            <div className='login'>
                <img src={logo} className="App-logo" alt="logo" />
                <Form
                    className='loginForm'
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}

                    initialValues={{
                        telphone:'13512712408',
                        password:'123456'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className='loginItem'
                        label="Username"
                        name="telphone"
                        // style={{backgroundColor:'#f00',width:300}}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='loginItem'
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"

                    >
                        <Checkbox>同意协议</Checkbox>
                    </Form.Item>

                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                );
            </div>
        </header>
    )
}

const Login = React.memo(Index)
export default Login