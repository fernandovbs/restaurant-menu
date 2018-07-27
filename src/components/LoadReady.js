import React from 'react'

const LoadReady = (Component) => {
    const loadReady = (props) => { 
        const {data} = props
        return Object.keys(data).length > 0 ? <Component {...props} /> : <p>Loading...</p>
    } 
    return loadReady
}

export default LoadReady