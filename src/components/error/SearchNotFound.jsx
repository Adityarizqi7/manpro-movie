import React from 'react'

import gif from '@/assets/images/gif/search-not-found.gif'

export default React.memo(function SearchNotFound({ classGif }) {
    return (
        <div className='empty-search-wrap'>
            <img className={classGif} src={gif} alt='Search Not Found' />
        </div>
    )
})