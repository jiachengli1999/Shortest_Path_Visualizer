import React from 'react'
import visualize_gif from '../assets/visualize.gif'
import wall_gif from '../assets/wall.gif'
import '../styles/Intro.css'

function Intro(){
    return(
        <div className='intro-container'>
            <h1>Find the Shortest Path</h1>
            <h2>Click to make WALLS</h2>
            <img src={wall_gif} alt="walls..." />
            <h2>Click VISUALIZE to see shortest path</h2>
            <img src={visualize_gif} alt="walls..." />
            <h2>Click WEIGHTS to add a cost for each box</h2>
            <h3>We will find the path to the target with the least cost</h3>
        </div>
    )
}

export default Intro