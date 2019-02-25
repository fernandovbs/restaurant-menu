import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import { RichText } from 'prismic-reactjs'
import { withRouter } from 'react-router-dom'

const styles = {
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      fontSize: 18,
    },
  };


class BaseMenu extends React.Component {
  constructor(props){
    super(props)
    this.history = this.props.history
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose ({target}) {
    this.setState({ anchorEl: null });
    this.history.push(target.attributes.link)
  };

  render() {
    const { anchorEl } = this.state
    const { classes, categories } = this.props

    return  ( categories.length > 0  && 
      <div>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" 
        aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
            <MenuIcon />
        </IconButton>      
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            categories.map( category => {
              if (!('uid' in category.data.pai)) {
                const link = category.data.sub_categorias === 'Sim' ? `/categorias/${category.uid}/sub` :  `/categorias/${category.uid}`
                return <MenuItem onClick={this.handleClose} link={link} key={category.uid}>{RichText.asText(category.data.titulo)}</MenuItem>
              }
              return ''
             })          
          }
        </Menu>
      </div> )
  }
}

export default withRouter(withStyles(styles)(BaseMenu));