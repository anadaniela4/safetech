import React from 'react';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar, Typography, Toolbar, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavBag from './NavBag';
import Search from './Search'
import {
  NavLink
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  linkText: {
    color: '#FFFFFF',
  },
  linkComponent: {
    textDecoration: 'none'
  }
}));

const Menu = function (props) {
  const { window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  const classes = useStyles();

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Catalogo de produtos
            </Typography>
              <NavLink to="/" className={classes.linkComponent} exact activeStyle={{ fontWeight: "bold", color: "white" }}>
                <Button className={classes.linkText}>
                  Home
                </Button>
              </NavLink>
            <Search />
            <NavBag />
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
}

export default Menu