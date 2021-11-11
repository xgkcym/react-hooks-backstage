import React from 'react'
import { Card } from 'antd';
function index() {
    return (
        <div>
            <Card title="用户列表"  style={{ width: '100%' }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    )
}

const User = React.memo(index)
export default User