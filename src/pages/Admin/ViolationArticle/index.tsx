import React from 'react'
import { Button, Card, Input, Table, } from 'antd';
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
	const deleteViolationArticle = async(article_id:string)=>{
		if(window.confirm('确认批准此文章吗？')){
			const res = await request.delete(`/violation_article?article_id=${article_id}`)
			if(res.status === 200){
				alert('批准此文章成功')
				getArticleList()
			}
		}


	}
	const deleteArticle = async(article_id:string)=>{
		if(window.confirm('确认删除此文章吗？')){
			const res = await request.delete(`/article?article_id=${article_id}`)
			if(res.status === 200){
				alert('删除此文章成功')
				getArticleList()
			}
		}
	}
	const columns = [
		{
			title: '文章id',
			dataIndex: 'article_id',
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
		{
      title: '操作',
      width: '25%',
      render: (article: any) => (
        <div className='copyreader'>
          <Button type="primary" onClick={()=>deleteViolationArticle(article.article_id)}>批准文章</Button>
          <Button type="primary" onClick={()=>deleteArticle(article.article_id)} danger>删除文章</Button>
        </div>
      )
    },
	];
	async function getArticleList() {
		setloading(true)
		const res = await request.get('/violation_article')
		if (res.status === 200) {
			setdata(res.data)
			console.log(res.data);

		}
		setloading(false)
	}
	return (
		<div>
			<Card title="违规文章" >
				<Table
					columns={columns}
					bordered
					rowKey={(record: any) => record.id}
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

