import React from 'react'
import logo from './../images/logo.png';

const LoadReady = (Component) => {
    const loadReady = (props) => { 
        const {data} = props
        return Object.keys(data).length > 0 ? <Component {...props} /> : 
        <div className='loader'><img src={logo} style={{width: 200, margin:"auto"}} alt="logo" /></div>
    } 
    return loadReady
}

export default LoadReady