import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';
import { MovieCardProps } from './MovieCard.props';
import cn from 'classnames';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { favoriteActions } from '../../store/favorite.slice';
import { movieProps } from '../../interfaces/movie.interface';

export function MovieCard({ ...props}: MovieCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteMovies = useSelector((s: RootState) => s.favorite.movies);
  const loginedUser = useSelector((s: RootState) => s.user.loginedUser);

  const saved = favoriteMovies.some(m => m.user === loginedUser && m["#IMDB_ID"] === props.id);

  const clickFavorite = (e: MouseEvent) => {
    e.preventDefault();
    if (!saved) {
      const movie: movieProps = {
          "#TITLE": props.title,
          "#IMDB_ID": props.id,
          "#RANK": props.rating,
          "#IMG_POSTER": props.image,
          "saved": true,
          "user": loginedUser
      }
      dispatch(favoriteActions.addToFavorite(movie));
    } else {
      dispatch(favoriteActions.deleteFavorite({ id: props.id, user: loginedUser }));
    }
  }

  return (
    <Link to={`/movie/${props.id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.head} style={
            {
              backgroundImage: `url(${props.image})`,
              backgroundSize: 'cover'
            }
          }>
          <div className={styles.rating}>
            <img src="/star-icon.svg" alt="star icon" />
            &nbsp;
            {props.rating} 
          </div> 
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>
            {props.title}
          </div>
          {saved && 
            <div className={cn(styles.favorite, styles.saved)}>
              <img src='/favorite-small-icon.svg' alt='unliked icon'></img>
              <span onClick={clickFavorite}>В избранном</span>
            </div>
          }
          {!saved && 
            <div className={styles.favorite}>
              <img src='/add-to-favorite-icon.svg' alt='liked icon'></img>
              <span onClick={clickFavorite}>В избранное</span>
            </div>
          }
        </div> 
      </div>
    </Link>
  );
}
