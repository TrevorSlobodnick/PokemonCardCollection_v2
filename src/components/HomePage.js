import React from 'react'
import qs from "query-string";

const HomePage = () => {

    let searchQuery = qs.parse(location.search)
    console.log(searchQuery)

    return (
        <div>
            {searchQuery}
        </div>
    )
}

export default HomePage
