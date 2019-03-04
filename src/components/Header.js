import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import BaseMenu from './Menu'
import { NavLink } from 'react-router-dom'

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      fontSize: 18,
    },
    appBar: {
      marginBottom: 10,
    }
  };


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = (props) => {
    const { classes, categories, location } = props;
    return (
        <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <BaseMenu categories={categories} location={location} />  
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Vianna's Sandubaria
          </Typography>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>
          <HomeIcon className={classes.icon} />
          </NavLink>
        </Toolbar>
      </AppBar>        
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)