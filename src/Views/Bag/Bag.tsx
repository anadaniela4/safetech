import React, { useEffect } from 'react';
import ProductCard from '../../Componentes/ProductCard/ProductCard'
import { makeStyles, Grid, Card, CardContent, CardMedia, Typography, Button, CardActions } from '@material-ui/core';
import { GetMoviesList, GetBag, RemoveProductOnBag } from '../../Actions/Actions';
import { useDispatch, useSelector } from '../../Store/Provider';
import DeleteIcon from '@material-ui/icons/Delete';
import { ISelectedMovie } from '../../Store/Interfaces';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  shopIconButton: {
    marginLeft: '15px'
  },
  shopIcon: {
    color: "#FFFFFF",
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

interface IMovie {
  id: string,
}

const Bag: React.FC = function({}) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const BagList = useSelector<ISelectedMovie[]>(({ bag }) => bag)
  const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_API_ENDPOINT

  useEffect(() => {
    if (sessionStorage.getItem("bag")) {
      dispatch(GetBag())
    }
  }, [])

  if (!BagList) return <></>


  const handleRemoveFromBag = (product) => {
    dispatch(RemoveProductOnBag(product))
  }


  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
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
              <Link to={"/"}>
                <Button size="small" color="primary">
                  Ir para tela inicial
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Bag