import React, { Component } from 'react';
import logo from './../images/logo.png';
import './../App.css';
import { BrowserRouter as Router } from "react-router-dom"
import * as firebase from 'firebase'

import Header from './Header'
import Categories from './Categories'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'categorias': []
    }
  }

  componentDidMount(){
    const rootRef = firebase.database().ref().child('categorias')
    rootRef.on('value', snap => {
      this.setState({
        categorias: snap.val()
      })
    })
  }

  render() {
    return (
      <Router>
        <div className='container fixed-width'>
          <Header logo={logo} />
            <Categories data={this.state.categorias}/>
        </div>
      </Router>
    )
  }
}

export default App;
