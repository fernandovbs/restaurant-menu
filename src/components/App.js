import React, { Component } from 'react';
import logo from './../images/logo.png';
import './../App.css';
import Header from './Header'
import apis from './../Apis'

import Categories from './Categories'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'categorias': []
    }
    this.getCategories = this.getCategories.bind(this)
  }

  componentDidMount(){
    this.getCategories()
  }

  getCategories = () => {
    apis.getCategorias()
    .then(resp => {
      this.setState({categorias: resp.data})
    })
  }

  render() {
    return (
      <div className='container fixed-width'>
        <Header logo={logo} />
        <div className='content'>
          <Categories data={this.state.categorias} />
        </div>
      </div>
    )
  }
}

export default App;
