import React from 'react'
import { Card, Input, Table, Button } from 'antd';
import './index.css'
import request, { baseURL } from '../../../util/request';
import { NavLink } from 'react-router-dom'
const { Search } = Input;

let sorterType: any = {}
let filtersType: any = {}
function Index() {
  const [pagination] = React.useState({ pagesize: 10, current: 1 })
  const [loading, setloading] = React.useState(false)
  const [filters, setfilters] = React.useState(filtersType)
  const [sorter, setsorter] = React.useState(sorterType)
  const [data, setdata] = React.useState([])
  let onSearch = (value: any) => {
    const dataList = data.filter((v: any) => {
      return v.telphone.includes(value)
    })
    setdata(dataList)
  }
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setfilters(filters)
    setsorter(sorter)
  };
  React.useEffect(() => {
    getUserList()
  }, [])
  let setStatus = async (user:any) => {
    if (window.confirm(`确认${user.usable===true?'可用':'禁用'}用户吗?`)) {
      const res = await request.put('/users', { usable:user.usable?'0':'1',uid:user.uid })
      res.status === 200 && getUserList()
    }
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      width: '10%',
      render: (avatar: any) => (
        <div className='avatarBox'>
          <img src={baseURL + avatar} alt="" />
        </div>
      )
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机',
      dataIndex: 'telphone',
      key: 'telphone',
      render: (telphone: any) => `${telphone}`,
      sorter: (a: any, b: any) => a.telphone - b.telphone,
      sortOrder: sorter.columnKey === 'telphone' && sorter.order,
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      filters: [
        { text: '男', value: '1' },
        { text: '女', value: '0' },
      ],
      render: (gender: any) => `${gender === '1' ? '男' : gender === '0' ? '女' : '未设置'}`,
      key: 'gender',
      filteredValue: filters.gender || null,
      onFilter: (value: any, record: any) => record.gender.includes(value),
      ellipsis: true,
    },

    {
      title: '状态',
      dataIndex: 'usable',
      // filters: [
      //   { text: '可用', value: 1 },
      //   { text: '禁用', value: 0 },
      // ],
      render: (usable: any) => `${usable === 1 ? '可用' : '禁用'}`,
      key: 'usable',
      // filteredValue: filters.usable || null,
      // onFilter: (value:any, record:any) => record.usable.includes(value),
      // ellipsis: true,
    },
    {
      title: '权限',
      dataIndex: 'role',
      filters: [
        { text: '违规用户', value: '2' },
        { text: '普通用户', value: '1' },
        { text: '管理员', value: '0' },
      ],
      render: (role: any) => `${role === '0' ? '管理员' : role === '1' ? '普通用户' : role === '2' ? '违规用户' : '未设置'}`,
      key: 'role',
      filteredValue: filters.role || null,
      onFilter: (value: any, record: any) => record.role.includes(value),
      ellipsis: true,
    },
    {
      title: '操作',
      width: '25%',
      // dataIndex: 'uid',
      render: (user: any) => (
        <div className='copyreader'>
          <Button type="primary"><NavLink to={`/admin/user/modifyUser/${user.uid}`}>编辑</NavLink></Button>
          
          {
            user.usable?
            <Button onClick={() => setStatus(user)} type="primary" danger>禁用</Button>:
            <Button onClick={() => setStatus(user)}  style={{backgroundColor:"#FFD700",color:"#fff" }}>可用</Button>
          }
        </div>
      )
    },
  ];
  async function getUserList() {
    setloading(true)
    const res = await request.get('/users')
    if (res.status === 200) {
      setdata(res.data)
    }
    setloading(false)
  }
  return (
    <div>
      <Card title="用户列表" extra={<Search placeholder="筛选用户" onSearch={onSearch} enterButton />} style={{ width: '100%' }}>
        <Table
          columns={columns}
          bordered
          rowKey={(record: any) => record.uid}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  )
}

const User = React.memo(Index)
export default User

