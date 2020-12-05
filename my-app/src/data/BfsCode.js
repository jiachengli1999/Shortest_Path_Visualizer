import './BfsCode.css'

export default function bfsCode(){
    return(
        <p>
            - queue = [] <br/>
            - queue.append(RootNode) <br/>
            - while(queue): <br/>
            -    curr = queue.dequeue() <br/>
            -    # add it's neighbors <br/>
            -    for i in curr.neighbors: <br/>
            -        # check if neighbor is target and br/eak if found <br/>
            -        if i == target: br/eak out of for loop and while loop  <br/>
            -        # if not then add to queue <br/>
            -        queue.append(i) <br/>
        </p>
    )
}
