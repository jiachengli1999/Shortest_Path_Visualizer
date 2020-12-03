import React, {Component} from 'react'
import '../styles/Grid.css'

function makeGrid(){
    let container = []
    for (let i = 0; i < 20; i++){
        let new_lst = []
        for (let j=0; j < 30; j++){
            new_lst.push('white')
        }
        container.push(new_lst)
    }
    return container
    // return [
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    //     ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    // ]
}

let initial = makeGrid()

class Grid extends Component{
    constructor(){
        super()
        this.state = {
            grid: initial,
            start_pos: [0, 0],
            end_pos: [10, 10],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e, index1, index2){
        let color = e.currentTarget.style.background
        let start_pos = this.state.start_pos
        let end_pos = this.state.end_pos
        if ((index1 !== start_pos[0] || index2 !== start_pos[1])
        && (index1 !== end_pos[0] || index2 !== end_pos[1])){
            if (color === 'white'){
                e.currentTarget.style.background = 'black'
            }
            else{
                e.currentTarget.style.background = 'white'
            }
        }
    }
    
    render(){
        let curr_grid = this.state.grid
        let start_pos = this.state.start_pos
        let end_pos = this.state.end_pos

        return(
            <div className='flex-container'>
                <div className='grid-container'>
                    {
                        curr_grid.map((row, index1) => (
                            row.map((i, index2) => {
                                let item = (index1 === start_pos[0] && index2 === start_pos[1]) ? 'red' : 
                                        (index1 === end_pos[0] && index2 === end_pos[1]) ? 'blue' : 'white'

                                return (
                                    <div 
                                        key={''+index1+''+index2} 
                                        className='cell' 
                                        style={{background: item}}
                                        onClick={(e) => this.handleClick(e, index1, index2)}
                                    />
                                )
                            })
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default Grid