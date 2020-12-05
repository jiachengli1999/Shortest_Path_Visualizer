const WALL_COLOR = 'black'
const START_COLOR = 'rgb(0, 51, 102)'
const END_COLOR = 'rgb(255, 185, 179)'

export default function dijkstra(grid){
    let unvisited = []
    console.log('in dijkstra')
    // update colors base on grid 
    // skip if node is wall  
    for (let i=0; i< grid.length; i++){
        for (let j=0; j < grid[i].length; j++){
            let node = document.getElementById(""+i+" "+j)
            grid[i][j].color = node.style.background
            if (grid[i][j].color === START_COLOR){
                grid[i][j].totaldist = 0
            }
            if (grid[i][j].color !== WALL_COLOR){
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
            if (neighbors[k].color === END_COLOR){
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