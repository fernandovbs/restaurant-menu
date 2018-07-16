import React from 'react'

const Header = ({logo}) => {
    return (<div className="row">
                <header className='header col-sm'>
                    <div className='mx-auto' style={{'width':'200px'}}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </header>
            </div>)
}
export default Header