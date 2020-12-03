# Dijkstra 
matrix = [
    [1, 1, 1, 1, 2, 3],
    [5, 's', 2, 8, 1, 2],
    [2, 4, 6, 8, 1, 2], 
    [0, 1, 1, 2, 'e', 4]
]

class Node:
    def __init__(self, initial_dist):
        self.total_dist = 999
        self.dist = initial_dist
        self.previous = None
        self.val = ''
        self.index = None
        self.isvisited = False


grid = [
    [Node(1), Node(1), Node(0), Node(2)],
    [Node(2), Node(8), Node(1), Node(4)],
    [Node(4), Node(1), Node(9), Node(3)],
    [Node(6), Node(5), Node(1), Node(2)],
    [Node(1), Node(1), Node(2), Node(6)]
]

def dijkstra(grid):
    # keep track of all unvisited nodes 

    grid[0][1].val = 's'
    grid[3][3].val = 'e'

    grid[0][2].val = 'w'
    grid[1][2].val = 'w'
    grid[2][2].val = 'w'
    grid[3][2].val = 'w'
    grid[4][2].val = 'w'
    # asssign 0 to total dist for start node

    unvisited = []
    done = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j].val  == 'w':
                continue 
            if grid[i][j].val == 's':
                grid[i][j].total_dist = 0
            grid[i][j].index = [i, j]
            unvisited.append(grid[i][j])
    
    while unvisited:
        print(done)
        for lst in grid:
            res = []
            for node in lst:
                res.append([node.total_dist, node.val, node.dist, node.isvisited])
            print(res)
        print('====')

        # find node with least total distance 
        index = get_min_index(unvisited)
        if unvisited[index].total_dist == 999:
            return "can't reach"
        # get it's neighbors and assign them the correct distance of prev_node_dist + curr_node dist
        i = unvisited[index].index[0]
        j = unvisited[index].index[1]
        dist = unvisited[index].total_dist
        neighbors = []
        print(i, j)
        if i-1 >= 0: neighbors.append(grid[i-1][j])
        if i+1 < len(grid): neighbors.append(grid[i+1][j])
        if j-1 >= 0: neighbors.append(grid[i][j-1])
        if j+1 < len(grid[0]): neighbors.append(grid[i][j+1])
        # assign previous to the previous node as well 
        for node in neighbors:
            if not node.isvisited and node.total_dist > dist + node.dist:
                node.total_dist = dist + node.dist
                node.previous = grid[i][j]
            if node.val == 'e':
                return node
        unvisited[index].isvisited = True
        # pop curr_node
        unvisited[index], unvisited[-1] = unvisited[-1], unvisited[index]
        unvisited.pop()

    for lst in grid:
        res = []
        for node in lst:
            res.append([node.total_dist, node.val, node.dist])
        print(res)
        
    return 'false'

def get_min_index(nodes):
    min_index = 0
    min_dist = nodes[0].total_dist
    for i in range(len(nodes)):
        if not nodes[i].isvisited and nodes[i].total_dist < min_dist:
            min_dist = nodes[i].total_dist
            min_index = i
    return min_index        

node =dijkstra(grid)
try:
    print([node.total_dist, node.val, node.dist])
    curr = node
    path = []
    indexes = []
    while curr != None:
        path.append(curr.dist)
        indexes.append(curr.index)
        curr = curr.previous

    print(path[::-1])
    print(indexes[::-1])
except:
    print(node)