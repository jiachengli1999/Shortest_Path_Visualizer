import React, {Component} from 'react'
import ContentData from '../data/ContentData.js'
import Dropdown from './Dropdown.js'


class Content extends Component{
    constructor(){
        super()
        this.state={
            data: ContentData,
        }
    }

    render(){
        console.log(this.state.data)
        return(
            <div className='content-container'>
                {this.state.data.map((obj, index) =>(
                    <Dropdown 
                        key={index} 
                        name={obj.name} 
                        para={obj.para}
                        index={index}
                        images={obj.images}
                    />
                ))}
            </div>
        )
    }
    
}

export default Content