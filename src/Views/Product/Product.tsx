import React, { useEffect } from 'react';
import classNames from 'classnames';
import ProductCard from '../../Componentes/ProductCard/ProductCard'
import { useDispatch, useSelector } from '../../Store/Provider';
import { GetMovieById, GetRecomendationsById, AddProductOnBag } from '../../Actions/Actions';
import { makeStyles, Grid, CardMedia, CardContent, Typography, Button, Breadcrumbs, Box } from '@material-ui/core';
import { useParams } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GradeIcon from '@material-ui/icons/Grade';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  poster: {
    marginBottom: 10
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  textIcon: {
    display: 'flex',
    alignItems: 'center'
  },
  aditionalInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  aditionalInfoText: {
    paddingLeft: 10,
  },
  recomendedProductsContainer: {
    marginTop: 20
  }
}));

const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_API_ENDPOINT

interface IMovie {
  id: string,
}

const Product: React.FC = function({}) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [SelectedMovie, RecomendationsList, BagList] = useSelector(({ selectedMovie, recomendationsList, bag }) => {
    return [selectedMovie, recomendationsList, bag]
  })
  const { productId } = useParams()

  const handleAddProduct = () => {
    if (SelectedMovie && !checkBag()) dispatch(AddProductOnBag(SelectedMovie))
  }

  const checkBag = () => {
    return SelectedMovie && BagList.some(product => product.id === SelectedMovie.id)
  }

  useEffect(()=> {
    dispatch(GetMovieById(productId))
    dispatch(GetRecomendationsById(productId))
  }, [productId, BagList])

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} className={classes.container}>
        <Grid item md={4} spacing={2}>
          <CardMedia
            component="img"
            className={classes.poster}
            alt={SelectedMovie?.title}
            image={`${IMAGE_ENDPOINT}t/p/w500${SelectedMovie?.poster_path}`}
            title={SelectedMovie?.title}
          />
                <Button variant="contained" color="primary" fullWidth onClick={handleAddProduct}>
                  {
                    checkBag()
                      ? <>Produto adicionado à Sacola</>
                      : <><AddIcon /> Adicionar à Sacola</>
                  }
                </Button>
        </Grid>
        <Grid item md={8}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {SelectedMovie?.title || SelectedMovie?.original_title}
            </Typography>
            <Box component="div" className={classes.aditionalInfo}>
              <Typography gutterBottom variant="h5" component="h2">
                <Breadcrumbs aria-label="breadcrumb">
                  {SelectedMovie?.genres.map(genre => (
                    <Typography variant="subtitle1">{genre.name}</Typography>
                  ))}
                </Breadcrumbs>
              </Typography>
              <Typography variant="caption" gutterBottom className={classNames([classes.textIcon, classes.aditionalInfoText])}>
                <ScheduleIcon fontSize={'small'} /> {SelectedMovie?.runtime} min
              </Typography>
              <Typography variant="caption" gutterBottom className={classNames([classes.textIcon, classes.aditionalInfoText])}>
                <GradeIcon fontSize={'small'} /> {SelectedMovie?.vote_average} / 10
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {SelectedMovie?.overview}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Grid item justify="flex-start" spacing={2} className={classes.recomendedProductsContainer} md={12}>
        <Typography variant="h4" gutterBottom>
          Produtos Recomendados
        </Typography>
        <Grid container justify="flex-start" spacing={2}>
          {RecomendationsList && RecomendationsList.map((movie: IMovie) => (
            <Grid key={movie.id} item>
              <ProductCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}

export default Product