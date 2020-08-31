import React from 'react';
import { makeStyles, Paper, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from '../../Store/Provider';
import { AddProductOnBag } from '../../Actions/Actions';
import CheckIcon from '@material-ui/icons/Check';
import { ISelectedMovie } from '../../Store/Interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
    width: 200
  },
  media: {
    height: 300,
  },
  addToBagButton: {
    marginLeft: 'auto',
  }
}));

const IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_API_ENDPOINT


const ProcuctCard: React.FC<any> = (props) => {
  const dispatch = useDispatch()
  const movie: ISelectedMovie = props.movie
  const classes = useStyles();
  const BagList = useSelector(({ bag }) => bag)

  const checkBag = (movie) => {
    return movie && BagList.some(product => product.id === movie.id)
  }
  
  const handleAddProduct = (movie) => {
    if (movie && !checkBag(movie)) dispatch(AddProductOnBag(movie))
  }

  if (!movie) return <></>

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${IMAGE_ENDPOINT}t/p/w200/${movie.poster_path}`}
          title={movie.title || movie.original_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6" noWrap>
            {movie.title || movie.original_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {movie.overview}
          </Typography>
        </CardContent>
      <CardActions disableSpacing>
        <Link to={"/products/" + movie.id}>
          <Button size="small" color="primary">
            Saiba mais
          </Button>
        </Link>
        <IconButton
          size="small"
          color="primary"
          className={classes.addToBagButton}
          onClick={()=>{ handleAddProduct(movie)} }
        >
          { checkBag(movie) ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProcuctCard