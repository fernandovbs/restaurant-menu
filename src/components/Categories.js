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

const styles = theme => ({
    grid: {
        paddingTop: theme.spacing.unit * 2,
    },
    media: {
        height: 140,
    },
})

const CategoriesList = ({categories, history}) => 
    <Fragment>
        {Object.keys(categories).map(categoryId => 
            categories[categoryId].father === 0 &&
            <Grid item xs={12} sm={6} key={categories[categoryId].id}>
                <Category category={categories[categoryId]} catId={categoryId} history={history}/>
            </Grid>  
        )}
    </Fragment>

const ChildCategories = ({categories, match}) => {
    const childCategories = categories[match.params.catId].child

    return (
        <Fragment>
            {Object.keys(childCategories).map(categoryId =>
            <Grid item xs={12} sm={6}  key={childCategories[categoryId].id}>
                <Category category={childCategories[categoryId]}  catId={categoryId}/>
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
    }

    renderBaseCategory(){
        return <Card color="secondary" elevation={5} className={this.classes.card}>
            <CardActionArea onClick={this.handleRedirect} link={`/categorias/${this.catId}/sub`}>
                <CardMedia
                className={this.classes.media}
                image={'/'+this.category.image}
                title={this.category.title}
                />            
                <CardContent>   
                    <Typography variant="h4">{this.category.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }

    renderChildCategory(){
        return <Card color="secondary" elevation={5} className={this.classes.card}>
            <CardActionArea onClick={this.handleRedirect} link={`/categorias/${this.catId}`}>
                <CardMedia
                className={this.classes.media}
                image={'/'+this.category.image}
                title={this.category.title}
                />                
                <CardContent>
                    <Typography variant="h4">{this.category.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    }    

    handleRedirect({target}){
        this.history.push(target.attributes.link.value)
    }

    render(){
        return (this.category.child !== undefined && this.renderBaseCategory()) ||            
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