import Data from '../data/InstructionData.js'
import '../styles/instructions.css'

export default function Instruction(){
    return(
        <div className='instruction-container'>
            <div className='legend-container'>
                {Data.map((obj, index) => (
                    <div className='legend' key={'legend'+index}>
                        <div style={{background: obj.color}} className='legend-color'/>
                        <div className='legend-text'>{obj.name}</div>
                    </div>
                ))}
            </div>
            <div id='text-container'>
                <p>Click or hold down mouse button to make walls in the grid | 
                Click weight to add random cost | Click Visualize to start!</p>
            </div>
        </div>

    )
}