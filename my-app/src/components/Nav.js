import '../styles/Nav.css'

export default function Nav(props){
    return(
        <div className='nav-container'>
            <div className='algo'>Dijkstra's Algorithm</div>
            <div onClick={props.handleAddingWeights}>Weights</div>
            <div className='visualize-btn' onClick={props.handleVisualization}>Visualize</div>
            <div className='reset-btn' onClick={props.handleReset}>Reset</div>
        </div>
    )
}