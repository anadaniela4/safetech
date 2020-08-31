import React, { useEffect } from 'react';
import ProductCard from '../../Componentes/ProductCard/ProductCard'
import { makeStyles, Grid } from '@material-ui/core';
import { GetMoviesList } from '../../Actions/Actions';
import { useDispatch, useSelector } from '../../Store/Provider';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  }
}));

interface IMovie {
  id: string,
}

const Home: React.FC = function({}) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const MoviesList = useSelector(({ moviesList = [] }) => moviesList)

  useEffect(()=> {
    dispatch(GetMoviesList())
  }, [])

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {MoviesList.map((movie: IMovie) => (
            <Grid key={movie.id} item>
              <ProductCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home