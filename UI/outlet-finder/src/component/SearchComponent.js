import React from 'react'
import './searechComponent.css'

class SearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            nearestOutlet:'',
            place:''
        }
    }
    handleClick=()=> {
        fetch("http://localhost:9898/delivery/outlet?place="+this.state.place,)
            .then((result) => result.json())
            .then(res => {
                console.log(res)
                    this.setState({nearestOutlet: res})
                }
            );
    }
    handleChange=(e)=> {
        this.setState({
            place:e.target.value
        })
    }
    render() {

        return (
            <div className='main-container'>
                <div>
            <input onChange={ this.handleChange }/>
                <button style={{marginLeft: '10px'}} onClick={this.handleClick}>Find</button>
                </div>
                <div className="result-container">{this.state.nearestOutlet}</div>

            </div>
        )
    }
}

export default SearchComponent
