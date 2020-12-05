import React, {Component} from 'react'
import '../styles/Grid.css'
import Nav from './Nav.js'

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
    container[10][10].color = 'blue'
    container[20][30].color = 'red'
    return container
}

let initial_grid = makeGrid()

function dijkstra(grid){
    let unvisited = []
    console.log('in dijkstra')
    // update colors base on grid 
    // skip if node is wall  
    for (let i=0; i< grid.length; i++){
        for (let j=0; j < grid[i].length; j++){
            let node = document.getElementById(""+i+" "+j)
            grid[i][j].color = node.style.background
            if (grid[i][j].color === 'blue'){
                grid[i][j].totaldist = 0
            }
            if (grid[i][j].color !== 'black'){
                unvisited.push(grid[i][j])
            }
        }
    }

    let path_node = null 
    let visited = []
    while(unvisited){
        // find node with least total distance
        let min_index = get_min_index(unvisited)
        if(unvisited[min_index].totaldist === 999){
            break
        }
        let i = unvisited[min_index].index[0]
        let j = unvisited[min_index].index[1]
        let node = document.getElementById(""+i+" "+j)
        // if (node.style.background === 'white'){
        //     node.style.background='yellow'
        // }
        
        let curr_dist = unvisited[min_index].totaldist
        // Get its neighbors 
        let neighbors = []
        if(i-1 >= 0){ neighbors.push(grid[i-1][j]) }
        if(i+1 < grid.length){ neighbors.push(grid[i+1][j]) }
        if(j-1 >= 0){ neighbors.push(grid[i][j-1]) }
        if(j+1 < grid[0].length){ neighbors.push(grid[i][j+1]) }
        // assign neighbors
        for (let k=0; k < neighbors.length; k++){
            if (!neighbors[k].isVisited && neighbors[k].totaldist > curr_dist+neighbors[k].dist+1){
                neighbors[k].totaldist = curr_dist + neighbors[k].dist + 1
                neighbors[k].previous = grid[i][j]
            }
            if (neighbors[k].color === 'red'){
                visited.push(unvisited[min_index])
                path_node = neighbors[k]
                break
            }
        }
        if (path_node !== null){ break }
        // mark curr node as visited
        unvisited[min_index].isVisited = true;
        // swap and pop
        [unvisited[min_index], unvisited[unvisited.length-1]] = [unvisited[unvisited.length-1], unvisited[min_index]]
        visited.push(unvisited[unvisited.length-1])
        unvisited.pop()
    }
    console.log(visited)
    let shortest_path = get_path(path_node).reverse()
    console.log(shortest_path)
    return [visited, shortest_path]
}
function get_min_index(nodes){
    let min_index = 0
    let min_dist = nodes[0].totaldist
    for (let i=0; i < nodes.length; i++){
        if (!nodes[i].isVisited && nodes[i].totaldist < min_dist){
            min_dist = nodes[i].totaldist
            min_index = i
        }
    }
    return min_index
}
function get_path(node){
    let path = []
    let curr = node
    while (curr !== null){
        path.push(curr.index)
        curr = curr.previous
    }
    return path
}

class Grid extends Component{
    constructor(){
        super()
        this.state = {
            grid: initial_grid,
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
    // componentDidMount(){
    //     let container = []
    //     for (let i = 0; i < 20; i++){
    //         let new_lst = []
    //         for (let j=0; j < 30; j++){
    //             let data = {
    //                 totaldist: 999, 
    //                 dist: 0, 
    //                 previous: null,
    //                 index: null,
    //                 isVisited: false,
    //                 val: '',
    //             }
    //             new_lst.push(data)
    //         }
    //         container.push(new_lst)
    //     }
    //     // set start and end node pos
    //     container[10][10].val = 's'
    //     container[15][20].val = 'e'
    //     this.setState({grid: container})
    // }

    visualize(){
        if (!this.state.canClick){return}
        //reset 
        let grid = this.state.grid
        for (let i=0; i< grid.length; i++){
            for (let j=0; j < grid[i].length; j++){
                let node = document.getElementById(""+i+" "+j)
                let color = node.style.background
                if (color !== 'red' && color !== 'blue' && color !== 'black'){
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
                    if (shortest_path.length === 0){
                        this.setState({canClick: true})
                        return 
                    }
                    for(let j=1; j <= shortest_path.length-1; j++){
                        setTimeout(()=>{
                                if (j === shortest_path.length-1){
                                    this.setState({canClick: true})
                                }
                                else{
                                    let indexes = shortest_path[j]
                                    let node = document.getElementById(""+indexes[0]+" "+indexes[1])
                                    node.style.background = 'green'                                    
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
                    node.style.background = 'yellow'
                }, 10 * i )
            }
        }
        this.setState({visualized: true})
    }

    // reset everything 
    resetGrid(){
        if (!this.state.canClick){return}
        let grid = this.state.grid
        for (let i=0; i< grid.length; i++){
            for (let j=0; j < grid[i].length; j++){
                let node = document.getElementById(""+i+" "+j)
                let color = node.style.background
                if (color !== 'red' && color !== 'blue'){
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

    handleClick(e, index1, index2){
        if (this.state.canClick){
            let back_color = e.currentTarget.style.background
            if (back_color !== 'red' && back_color !== 'blue'){
                if (back_color !== 'black'){
                    e.currentTarget.style.background = 'black'
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
        if (mousePressed && color !== 'red' && color !== 'blue'){
            if (color === 'white') {e.currentTarget.classList.add('visited')}
            else{e.currentTarget.classList.remove('visited')}
            e.currentTarget.style.background = 
                color !=='black' ? 'black' :
                color ==='black' ? 'white' : color
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
                                        onClick={(e) => this.handleClick(e, index1, index2)}
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

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomDist(grid){
    for (let i=0; i < grid.length; i++){
        for (let j=0; j < grid[i].length; j++){
            if (grid[i][j].color !== 'red' && grid[i][j].color !== 'blue'){
                grid[i][j].dist = getRandomInt(1, 9)
            }
            
        }
    }
}

export default Grid