import React, { Component } from 'react'
import logo from './../images/logo.png';
import LoadReady from './LoadReady'

const CategoriesList = ({categories}) => 
    <div className='row'>
        {categories.map(category => 
          <div className='col-6' key={category.id}>
            <Category category={category} />
          </div>  
        )}
    </div>

const Category = ({category}) => {

    return (<div className='Category-item'>
        {category.image && <img src={category.image} alt={category.title} />}
        <div className='Category-title'>
            <h1>{category.title}</h1>         
        </div>
    </div>)
}

class Categories extends Component {
    render(){
        const { data } = this.props
        console.log(data)
        return <CategoriesList categories={data} />
    }
}

export default LoadReady(Categories)