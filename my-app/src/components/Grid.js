import React, {Component} from 'react'
import '../styles/Grid.css'
import Nav from './Nav.js'
import dijkstra from './Dijkstra.js'
import Instructions from './Instructions.js'

const PATH_COLOR = 'rgb(255, 249, 170)'
const SUCCESS_COLOR = 'rgb(208, 240, 192)'
const WALL_COLOR = 'black'
const START_COLOR = 'rgb(0, 51, 102)'
const END_COLOR = 'rgb(255, 185, 179)'

class Grid extends Component{
    constructor(){
        super()
        this.state = {
            grid: [[]],
            start_pos: [10, 10],
            end_pos: [15, 20],
            mousePressed: false,
            canClick: true,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.visualize = this.visualize.bind(this)
        this.resetGrid = this.resetGrid.bind(this)
        this.addWeights = this.addWeights.bind(this)
    }

    // make grid
    componentDidMount(){
        let initial_grid = makeGrid()
        this.setState({grid: initial_grid})
    }

    visualize(){
        if (!this.state.canClick){return}
        //reset 
        let grid = this.state.grid
        for (let i=0; i< grid.length; i++){
            for (let j=0; j < grid[i].length; j++){
                let node = document.getElementById(""+i+" "+j)
                let color = node.style.background
                if (color !== END_COLOR && color !== START_COLOR && color !== WALL_COLOR){
                    node.style.background = 'white'
                }   
                grid[i][j].isVisited = false
                grid[i][j].previous = null
                grid[i][j].totaldist = 999
                node.classList.remove('visited')
            }
        }

        // calc paths 
        let result = dijkstra(grid)
        let paths = result[0]
        let shortest_path = result[1]
        // animate paths 
        this.setState({canClick: false})
        for(let i=1; i <= paths.length; i++){
            if (i===paths.length){
                setTimeout(()=>{
                    // if no shortest path
                    if (shortest_path.length === 0){
                        this.setState({canClick: true})
                        return 
                    }
                    // animate shortest path
                    for(let j=1; j <= shortest_path.length-1; j++){
                        setTimeout(()=>{
                                if (j === shortest_path.length-1){
                                    this.setState({canClick: true})
                                }
                                else{
                                    let indexes = shortest_path[j]
                                    let node = document.getElementById(""+indexes[0]+" "+indexes[1])
                                    node.style.background = SUCCESS_COLOR                                    
                                }

                        }, 50*j)
                    }
                }, 10*i)
            }
            else{
                setTimeout(()=>{
                    let indexes = paths[i].index
                    let node = document.getElementById(""+indexes[0]+" "+indexes[1])
                    node.classList.add('visited')
                    node.style.background = PATH_COLOR
                }, 10 * i )
            }
        }
    }

    // reset everything 
    resetGrid(){
        if (!this.state.canClick){return}
        let grid = this.state.grid
        for (let i=0; i< grid.length; i++){
            for (let j=0; j < grid[i].length; j++){
                let node = document.getElementById(""+i+" "+j)
                let color = node.style.background
                if (color !== END_COLOR && color !== START_COLOR){
                    node.style.background = 'white'
                }   
                grid[i][j].isVisited = false
                grid[i][j].previous = null
                grid[i][j].totaldist = 999
                grid[i][j].dist = 0
                node.classList.remove('visited')
            }
        }
        this.setState(this.state)
        
    }

    addWeights(){
        if (!this.state.canClick){return}
        addRandomDist(this.state.grid)
        this.setState(this.state)
    }

    handleClick(e){
        if (this.state.canClick){
            let back_color = e.currentTarget.style.background
            console.log('back_color:', back_color)
            if (back_color !== END_COLOR && back_color !== START_COLOR){
                if (back_color !== WALL_COLOR){
                    e.currentTarget.style.background = WALL_COLOR
                    e.currentTarget.classList.add('visited')
                }
                else{
                    e.currentTarget.style.background = 'white' 
                    e.currentTarget.classList.remove('visited')
                }
            }
        }
        
    }

    handleMouseDown(e){
        if (this.state.canClick){
            this.setState({mousePressed: true})
        }
    }
    handleMouseEnter(e){
        if (!this.state.mousePressed){return}
        console.log('in')
        let color = e.currentTarget.style.background
        let mousePressed = this.state.mousePressed
        if (mousePressed && color !== END_COLOR && color !== START_COLOR){
            if (color === 'white') {e.currentTarget.classList.add('visited')}
            else{e.currentTarget.classList.remove('visited')}
            e.currentTarget.style.background = 
                color !==WALL_COLOR ? WALL_COLOR :
                color ===WALL_COLOR ? 'white' : color
        }
    }
    handleMouseUp(){
        this.setState({mousePressed: false})
    }
    
    render(){
        let curr_grid = this.state.grid
        return(
            <div className='flex-container'>
                <Nav handleVisualization={this.visualize} 
                    handleReset={this.resetGrid}
                    handleAddingWeights={this.addWeights}
                />
                <Instructions />
                <div className='grid-container'>
                    {
                        curr_grid.map((row, index1) => (
                            row.map((i, index2) => {
                                return (
                                    <div 
                                        key={''+index1+''+index2} 
                                        index1={index1}
                                        index2={index2}
                                        id={`${index1} ${index2}`}
                                        className='cell'
                                        style={{background: i.color}}
                                        onClick={(e) => this.handleClick(e)}
                                        onMouseDown={(e) => this.handleMouseDown(e)}
                                        onMouseUp={this.handleMouseUp}
                                        onMouseEnter={this.handleMouseEnter}
                                    >
                                        {i.dist > 0 ? i.dist : ''}
                                    </div>
                                )
                            })
                        ))
                    }

                </div>
            </div>
        )
    }
}

function makeGrid(){
    let container = []
    for (let i = 0; i < 25; i++){
        let new_lst = []
        for (let j=0; j < 40; j++){
            let data = {
                totaldist: 999, 
                dist: 0, 
                previous: null,
                index: [i, j],
                isVisited: false,
                color: 'white'
            }
            new_lst.push(data)
        }
        container.push(new_lst)
    }
    container[10][10].color = START_COLOR
    container[20][30].color = END_COLOR
    return container
}

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomDist(grid){
    for (let i=0; i < grid.length; i++){
        for (let j=0; j < grid[i].length; j++){
            if (grid[i][j].color !== END_COLOR && grid[i][j].color !== START_COLOR){
                grid[i][j].dist = getRandomInt(1, 9)
            }
            
        }
    }
}

export default Grid