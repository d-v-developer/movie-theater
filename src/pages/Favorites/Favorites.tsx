import { useSelector } from 'react-redux';
import { Header } from '../../components/Header/Header';
import { RootState } from '../../store/store';
import { MoviesList } from '../Movies/MoviesList/MoviesList';
import styles from './Favorites.module.css'

export function Favorites() {
	const loginedUser = useSelector((s: RootState) => s.user.loginedUser);
	const favoriteMovies = useSelector((s: RootState) => s.favorite.movies.filter(movie => movie.user === loginedUser));

	
	return(
		<>
			<Header>Избранное</Header>
			<div className={styles.movies}>
				{!favoriteMovies.length && <div className={styles.error}>Здесь пока пусто... Найдите интересные фильмы и добавьте их в избранное!</div>}
				<MoviesList movies={favoriteMovies} isSearched={false}/>
			</div>
		</>
	);
}