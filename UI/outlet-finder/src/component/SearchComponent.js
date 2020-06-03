import React from 'react'
import './searechComponent.css'

class SearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            nearestOutlet:''
        }

    }

    // getDeliveryOutlet=()={
    //     fetch("")
    // .then()
    //     .then()
    // }

    handleClick=()=> {
        // this.setState({
        //     nearestOutlet:e.target.value
        // })

    }
    handleChange=(e)=> {
        this.setState({
            nearestOutlet:e.target.value
        })

    }
    render() {

        return (
            <div className='main-container'>
                <div>
            <input onChange={ this.handleChange }/>
                <button style={{marginLeft: '10px'}} onClick={this.handleClick}>Find</button>
                </div>
                <div className="result-container">{this.state.nearestOutlet}this is my delivery data</div>

            </div>
        )
    }
}

export default SearchComponent
