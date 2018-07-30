import React, { Component } from 'react'

const ProductDetails = ({product}) => 
    <div className='productDetails'>
        <h2 className='productTitle'>{product.title}</h2>
        <p className='product-description'>{product && product.description}</p>        
        <p className='productIngredients'>{product.ingredients && product.ingredients}</p>
        {product.variations && <ProductVariations variations={product.variations} />}
    </div>

const ProductVariations = ({variations}) => <div className='productVariation'> 
        <h5>Opções</h5>
        <ul>
            {variations.map((variation, key) => <li key={key}>{variation.title} R${variation.price}</li>)}
        </ul>
    </div>

class Product extends Component{

    componentDidMount(){
        const {match} = this.props
        this.props.getProduct(match.params.prodId)
    }

    render(){
        const {product} = this.props

        return (
            <div className='row'>
                <div className='col-12'>
                    {product && <ProductDetails product={product} />} 
                </div>
            </div>
        )
    }
}

export default Product