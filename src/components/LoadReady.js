import React from 'react'

const LoadReady = (Component) => {
    const loadReady = ({...data}) => { 
        return data.data.length > 0 ? <Component data={data.data} /> : <p>Loading...</p>
    } 
    return loadReady
}

export default LoadReady