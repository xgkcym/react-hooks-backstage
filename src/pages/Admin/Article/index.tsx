import React from 'react'
import { Card, Input, Table,  } from 'antd';
import './index.css'
import request from '../../../util/request';
// import { NavLink } from 'react-router-dom'
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
    getArticleList()
  }, [])
  const columns = [
    {
      title: '文章id',
      dataIndex: 'article_id',
      width: '10%',
      render: (article_id: any) => `${article_id}`,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      render: (title: any) => `${title}`,
    },
    {
			title: '文章类型',
			dataIndex: 'article_type',
			render: (article_type: any) => `${article_type}`,
		},
    {
      title: '文章作者',
      dataIndex: 'nickname',
      render: (nickname: any) => `${nickname}`,
    },
    {
      title: '作者手机',
      dataIndex: 'telphone',
      render: (telphone: any) => `${telphone}`,
    },
  ];
  async function getArticleList() {
    setloading(true)
    const res = await request.get('/article')
    if (res.status === 200) {
      setdata(res.data)
      console.log(res.data);
      
    }
    setloading(false)
  }
  return (
    <div>
      <Card title="文章列表" extra={<Search placeholder="筛选用户" onSearch={onSearch} enterButton />} style={{ width: '100%' }}>
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

