import React from 'react'

 function Index() {
    return (
        <div>
            Article
        </div>
    )
}

const Article = React.memo(Index)
export default Article