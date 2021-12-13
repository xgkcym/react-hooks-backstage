import React from 'react'
import { Form, Input, Button, Radio, Switch } from 'antd';
import './index.css'
import request, { baseURL } from '../../../../util/request';
let userDetailType: any = {}
export default function Index(props: any) {
    const [userDetail, setuserDetail] = React.useState(userDetailType)
    const [avatar, setAvatar] = React.useState('')
    const [telphonedisabled, settelphonedisabled] = React.useState(true)
    const [showtelphonehint, setshowtelphonehint] = React.useState(false)
    const onFinish = async (values: any) => {
        const res = await request.put('/users', {...values,usable:values.usable===true?'1':'0',avatar})
        if (res.status === 200) {
            alert('修改用户成功')
            props.history.goBack()
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    React.useEffect(() => {
        getUserDetail()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    async function getUserDetail() {
        const res = await request.get('/users?uid=' + props.match.params.uid)
        if (res.status === 200) {
            res.data[0].usable = Boolean(res.data[0].usable)
            setuserDetail(res.data[0])
            setAvatar(res.data[0].avatar)
        }
    }

    const postAvatar = async (e: any) => {
        const formdata = new FormData()
        formdata.append('avatar',e.target.files[0])
        const res:any = await request.post('/users/avatar',formdata,{headers:{'Content-Type': 'multipart/form-data;'}})
        res.status === 200 && setAvatar(res.file.path)
    }

    return (
        <div className='modifyUserBox'>
            <div className='avatarBox'>
                <img className='avatar' src={avatar?baseURL+avatar:baseURL+userDetail.avatar} alt="" />
                <input onChange={postAvatar} type="file" name="" id="" />
                <div>更换头像</div>
            </div>

            {
                userDetail.uid ?
                    <Form
                        initialValues={userDetail}
                        className='modifyUserForm'
                        name="uid"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="uid"
                            style={{ height: 20 }}
                        >
                            <Input type='hidden' />
                        </Form.Item>
                        {/* <Form.Item
                            name="avatar"
                            style={{ height: 20 }}
                        >
                            <Input type='hidden' />
                        </Form.Item> */}

                        <Form.Item
                            label="用户昵称"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: '昵称长度应1~20',
                                    type: 'string',
                                    max: 20,
                                    min: 1
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                            name="telphone"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号码不符合规范',
                                    pattern: new RegExp(/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/)
                                },
                            ]}
                        >
                            <div
                                className='telphoneBox'
                                onMouseLeave={() => setshowtelphonehint(false)}
                                onMouseOver={() => setshowtelphonehint(true)}
                                onDoubleClick={() => settelphonedisabled(false)}>
                                <Input disabled={telphonedisabled} defaultValue={userDetail.telphone} />
                                {showtelphonehint && telphonedisabled ? <div>双击设置手机号码</div> : <></>}
                            </div>
                        </Form.Item>
                        <Form.Item
                            style={{ textAlign: 'left' }}
                            label="&nbsp;&nbsp;&nbsp;用户性别"
                            // initialValue={userDetail.gender}
                            name="gender"
                            rules={[
                                {
                                    enum: ['0', '1', ''],
                                    message: '性别只能为1或0',
                                },
                            ]}>
                            <Radio.Group >
                                <Radio value="1">男</Radio>
                                <Radio value="0">女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            style={{ textAlign: 'left' }}
                            name="usable" label="&nbsp;&nbsp;&nbsp;用户状态"
                            valuePropName="checked">
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            style={{ textAlign: 'left' }}
                            label="&nbsp;&nbsp;&nbsp;用户权限"
                            name="role"
                            rules={[
                                {
                                    enum: ['0', '1', '2'],
                                    message: '权限只能为2或1或0',
                                },
                            ]}>
                            <Radio.Group>
                                <Radio value="0">管理员</Radio>
                                <Radio value="1">普通用户</Radio>
                                <Radio value="2">违规用户</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='individuality' label="&nbsp;&nbsp;&nbsp;个性动态">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                            <Button type="primary" style={{ marginLeft: 40 }} >
                                返回
                            </Button>
                        </Form.Item>
                    </Form> : <></>
            }
        </div>
    )
}
