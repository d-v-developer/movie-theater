import { MovieCard } from "../../../components/MovieCard/MovieCard";
import { movieProps } from "../../../interfaces/movie.interface";
import styles from './MoviesList.module.css'

export function MoviesList( { movies, isSearched } : {movies: movieProps[], isSearched: boolean}) {

    return(
        <>
            {!movies.length && isSearched && <div className={styles.error}>Ничего не найдено</div>}
            {movies.length > 0 && movies.map((card) => (                
                <MovieCard key={card['#IMDB_ID']}
                    id={card['#IMDB_ID']}
                    rating={card['#RANK']}
                    image={card['#IMG_POSTER']}
                    title={card['#TITLE']}
                    saved={false}
                />
                ))}
        </>
    )
}