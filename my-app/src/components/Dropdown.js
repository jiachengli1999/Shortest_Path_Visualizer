import React, {Component} from 'react'
import '../styles/Dropdown.css'
import BfsCode from '../data/BfsCode.js'

class Dropdown extends Component{
    constructor(){
        super()
        this.state = {
            content: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // toggle display between none and flex
    handleClick(index){
        console.log('clicked')
        let node = document.getElementById('dropdown'+index)
        if (node.style.display !=='none' && node.style.display){
            node.style.display ='none'
        }
        else{
            node.style.display = 'flex'
        }

    }
    render(){
        return(
            <div className='dropdown-container'>
                <div className='dropdown-box1'
                onClick={() => this.handleClick(this.props.index)}>
                    <div className='dropdown-name'>
                        {this.props.name}
                    </div>
                </div>
                <div className='dropdown-box2' id={'dropdown'+this.props.index}>
                    <div className='dropdown-para'>
                        {this.props.para}    
                    </div>
                    <div className='dropdown-code'>
                        {this.props.name === 'Beadth-First Search (BFS)' ? 
                            <BfsCode />
                            : 
                            <p></p>
                        }
                    </div>
                    <div className='dropdown-images'>
                        {this.props.images.map((img, index) => {
                            return(
                                <img key={'img'+index} src={img.default} className='img'/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default Dropdown