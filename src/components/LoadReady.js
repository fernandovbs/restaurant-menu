import React from 'react'
import logo from './../images/logo.png';

const LoadReady = (Component) => {
    const loadReady = (props) => { 
        const {data} = props
        return Object.keys(data).length > 0 ? <Component {...props} /> : 
        <div className='loader'><img src={logo} className="App-logo" alt="logo" /><h2>Carregando...</h2></div>
    } 
    return loadReady
}

export default LoadReady