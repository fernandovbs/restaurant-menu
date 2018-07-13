import React from 'react'

const Header = ({logo}) => {
    return (<header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
    </header>)
}
export default Header