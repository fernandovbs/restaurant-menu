import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LoadReady from './LoadReady'
import Products from './Products'
import Product from './Product'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import { RichText } from 'prismic-reactjs'

const styles = theme => ({
    grid: {
        paddingTop: 2,
    },
    media: {
        height: 140,
    },
})

const CategoriesList = ({categories, history}) => 
    <Fragment>
        {categories.map(category => 
            !('uid' in category.data.pai) &&
            <Grid item xs={12} sm={6} key={category.uid}>
                <Category category={category.data} catId={category.uid} history={history}/>
            </Grid>  
        )}
    </Fragment>

const ChildCategories = ({categories, match}) => {
    const childCategories = categories.filter(category => 
            ('uid' in category.data.pai && category.data.pai.uid === match.params.catId)
        )

    return (
        <Fragment>
            {childCategories.map(category =>
            <Grid item xs={12} sm={6}  key={category.uid}>
                <Category category={category.data}  catId={category.uid}/>
            </Grid>  
            )}
        </Fragment> )
}

class CategoryComponent extends Component {
    constructor(props){
        super(props)
        this.renderBaseCategory = this.renderBaseCategory.bind(this);
        this.renderChildCategory = this.renderChildCategory.bind(this);        
        this.handleRedirect = this.handleRedirect.bind(this);        
        
        this.category = this.props.category
        this.catId = this.props.catId
        this.classes = this.props.classes
        this.history = this.props.history
        this.link = `/categorias/${this.catId}`
    }

    renderBaseCategory(){
        this.link = `/categorias/${this.catId}/sub`
        return <Card color="secondary" className={this.classes.card}>
            <CardActionArea onClick={this.handleRedirect}>
                <CardMedia
                className={this.classes.media}
                image={this.category.imagem.url}
                title={RichText.asText(this.category.titulo)}
                />            
                <CardContent>   
                    <Typography variant="h4">{RichText.asText(this.category.titulo)}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }

    renderChildCategory(){
        return <Card color="secondary" className={this.classes.card}>
            <CardActionArea onClick={this.handleRedirect}>
                <CardMedia
                className={this.classes.media}
                image={this.category.imagem.url}
                title={RichText.asText(this.category.titulo)}
                />                
                <CardContent>
                    <Typography variant="h4">{RichText.asText(this.category.titulo)}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    }    

    handleRedirect(){
        this.history.push(this.link)
    }

    render(){
        return (this.category.sub_categorias === 'Sim' && this.renderBaseCategory()) ||            
        this.renderChildCategory()
    }

}

const Category = withRouter(withStyles(styles)(CategoryComponent))

class Categories extends Component {

    render(){
        const { data, 
                getProducts,
                getProduct, 
                products, 
                product,
                classes } = this.props

        return (
            <Grid container spacing={16} className={classes.grid}>
                <Route path='/' exact render={ props => 
                    <CategoriesList {...props} categories={data} /> } />

                <Route path='/categorias/:catId' exact render={ props =>
                    <Products {...props} products={products} getProducts={getProducts} />
                } />

                <Route path='/categorias/:catId/sub' render={ props =>
                    <ChildCategories {...props} categories={data} />
                } />                

                <Route path='/produtos/:prodId' render={ props => 
                    <Product {...props} product={product} getProduct={getProduct} /> } />
            </Grid> )
    }
}

export default LoadReady(withStyles(styles)(Categories))