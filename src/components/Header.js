import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({logo}) => {
    return (<Link to='/'><div className="row">
                <header className='header col-sm'>
                    <div className='mx-auto' style={{'width':'200px'}}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </header>
            </div></Link>)
}
export default Header