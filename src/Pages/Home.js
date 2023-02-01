import React from 'react'
import Quicksearch from '../Components/Home/Quicksearch'
import Wallpaper from '../Components/Home/Wallpaper'

function home() {
    return (
        <div>
            <Wallpaper />
            <Quicksearch/>
        </div>
    )
}

export default home