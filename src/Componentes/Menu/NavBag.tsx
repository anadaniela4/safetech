import React, { useState, useRef, useEffect, useCallback } from 'react';
import { makeStyles, IconButton, Badge, Popper, Grow, Paper, ClickAwayListener, Card, CardMedia, CardContent, Typography, CardActions, Button, Grid, Avatar } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useSelector, useDispatch } from '../../Store/Provider';
import { ISelectedMovie } from '../../Store/Interfaces';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetBag, RemoveProductOnBag } from '../../Actions/Actions';

const useStyles = makeStyles(() => ({
  shopIconButton: {
    marginLeft: '15px'
  },
  shopIcon: {
    color: "#FFFFFF",
  },
  root: {
    maxWidth: 350,
    width: 350,
    flexGrow: 1,
    overflow: 'hidden',
  },
  media: {
    height: 68,
    width: 45
  },
  addToBagButton: {
    marginLeft: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
  },
  cover: {
    width: 151,
  },
  controls: {
    paddingLeft: 5,
    paddingBottom: 5,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  paper: {
    maxWidth: 400,
    margin: `5px auto`,
    padding: 20,
  },
  titleContainer: {
    display: 'flex'
  },
  title: {
    width: '100%'
  }
}));

const NavBag: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const BagList = useSelector<ISelectedMovie[]>(({ bag }) => bag)
  const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_API_ENDPOINT

  useEffect(() => {
    if (sessionStorage.getItem("bag")) {
      dispatch(GetBag())
    }
  }, [])


  if (!BagList) return <></>

  const handleClose = (event) => {
    if (anchorRef && anchorRef.current) {
      if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleRemoveFromBag = (product) => {
    dispatch(RemoveProductOnBag(product))
  }

  return (
    <>
      <IconButton
        className={classes.shopIconButton}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={BagList.length} color="secondary">
          <LocalMallIcon className={classes.shopIcon} />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card className={classes.root}>
                  <CardContent>
                    {BagList.length < 1
                      ? <span>Sem produtos na sacola</span>
                      : BagList.map(product => {
                        return (
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid item className={classes.details}>
                              <CardMedia
                                className={classes.media}
                                image={`${IMAGE_ENDPOINT}t/p/w45/${product.poster_path}`}
                                title={product.title || product.original_title}
                              />
                            </Grid>
                            <Grid item xs zeroMinWidth className={classes.titleContainer}>
                              <Typography gutterBottom variant="h6" component="h6" noWrap className={classes.title}>
                                {product.title || product.original_title}
                              </Typography>
                              <Button className={classes.controls} onClick={() => handleRemoveFromBag(product)}>
                                <DeleteIcon fontSize={'small'} />
                              </Button>
                            </Grid>
                          </Grid>
                        )
                      })
                    }
                  </CardContent>
                  <CardActions disableSpacing>
                    <Link to={"/bag"}>
                      <Button size="small" color="primary">
                        Ir para Sacola
                      </Button>
                    </Link>
                  </CardActions>
                </Card>

              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default NavBag