import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { RichText } from 'prismic-reactjs'

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 14,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
    grid: {
        paddingTop: theme.spacing.unit * 2,
    },
    table: {
        marginTop: 10,
    },
    media: {
        height: 140,
    },
    chip: {
      margin: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0px`,
    },
})

const ProductDetails = withStyles(styles)(({product, classes}) => 
    <Card color="secondary" elevation={5} className={classes.card}>
        <CardContent> 
            <Typography variant="h5" className='productTitle'>{RichText.asText(product.data.titulo)}</Typography>
            <Typography variant="subtitle1" className='product-description'>{product && RichText.asText(product.data.descricao)}</Typography>        

            <Divider variant="middle" className={classes.divider}/>

            {product.data.ingredientes && 
                <ProductIngredients ingredientes={product.data.ingredientes}/>}

            <Divider variant="middle" className={classes.divider}/>    

            {(product.data.variacoes.length === 1 && 
                <Typography variant="h5" color="primary" className="price">R$ {product.data.variacoes[0].preco}</Typography>) ||
            <ProductVariations variations={product.data.variacoes} />}
        
        </CardContent>
    </Card>)

const ProductIngredients = withStyles(styles)(({ingredientes, classes}) => 
<Fragment> 
    <Typography variant="h6">Ingredientes</Typography>
    {ingredientes.map((ingrediente, key) => 
        <Chip key={key}
            avatar={<Avatar>VS</Avatar>}
            label={ingrediente.ingrediente}
            clickable
            className={classes.chip}
            color="primary"
            onDelete={()=> true}
            deleteIcon={<DoneIcon />}
        />
    )}
</Fragment>)


const ProductVariations = withStyles(styles)(({variations, classes}) => 
    <Fragment> 
        <Typography variant="h6">Opções</Typography>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Tamanho</CustomTableCell>
            <CustomTableCell>Preço</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {variations.map((variation, key) => 
                <TableRow key={key}>
                    <CustomTableCell component="th" scope="row">
                        {RichText.asText(variation.variacao)}
                    </CustomTableCell>
                    <CustomTableCell component="th" scope="row">
                    R${variation.preco}
                    </CustomTableCell>
                </TableRow>
            )}
        </TableBody>
        </Table>
        <ul>
        </ul>
    </Fragment>)

class Product extends Component{

    componentDidMount(){
        const {match} = this.props
        this.props.getProduct(match.params.prodId)
    }

    render(){
        const {product} = this.props

        return ('uid' in product) &&
            <Grid item xs={12}>
                {<ProductDetails product={product} />} 
            </Grid>
    }
}

export default Product