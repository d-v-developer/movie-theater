import { useLoaderData, useNavigate } from "react-router-dom"
import { movieDetailsProps } from "../../interfaces/movieDetails.props";
import styles from './Movie.module.css';
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { favoriteActions } from "../../store/favorite.slice";
import { movieProps } from "../../interfaces/movie.interface";
import cn from "classnames";


export function Movie() {
    const data = useLoaderData() as movieDetailsProps;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const favoriteMovies = useSelector((s: RootState) => s.favorite.movies);
    const loginedUser = useSelector((s: RootState) => s.user.loginedUser);
    const isFavorite = favoriteMovies.some(m => m.user === loginedUser && m["#IMDB_ID"] === data.imdbId);

    const getDurationMinute = (duration: string): string => {
        const hoursMatch = duration.match(/(\d+)H/);
        const minutesMatch = duration.match(/(\d+)M/);

        const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? Number(minutesMatch[1]) : 0;

        return `${hours * 60 + minutes} мин` ;
        }

    const clickFavorite = () => {
        if (!isFavorite) {
        const movie: movieProps = {
            "#TITLE": data.short.name,
            "#IMDB_ID": data.imdbId,
            "#RANK": data.short.aggregateRating.ratingValue,
            "#IMG_POSTER": data.short.image,
            "saved": true,
            "user": loginedUser
        }
        dispatch(favoriteActions.addToFavorite(movie));
        } else {
        dispatch(favoriteActions.deleteFavorite({ id: data.imdbId, user: loginedUser }));
        }
    }

    const favoriteMovie = (      
            <>
                <img src='/favorite-small-icon.svg' alt='удалить из избранного'></img>
                <div className={cn(styles['not-favorite-text'], styles.isFavorite)}>В избранном</div>
            </>     
    )

    const notFavoriteMovie = (      
            <>
                <img src='/add-to-favorite-icon.svg' alt='добавить в избранное'></img>
                <div className={styles['not-favorite-text']}>В избранное</div>
            </>     
    )

    return(
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <a href="#" onClick={() => navigate(-1)}className={styles['text-header']}>Назад</a>
                <Header>{data.short.name}</Header>
            </div>
            <div className={styles.body}>
                <div className={styles.image} style={{backgroundImage: `url(${data.short.image})`}}></div>
                <div className={styles.main}>
                    <div className={styles['main-text']}>{data.short.description}</div>
                    <div className={styles['rating-wrapper']}>
                        <div className={styles.rating}>
                            <img src="/star-icon.svg" alt="изображение рейтинга" />
                            &nbsp;
                            <div className={styles['rating-text']}>{data.short.aggregateRating.ratingValue}</div>
                        </div>
                        <div className={styles.favorite} onClick={clickFavorite}>
                            {isFavorite && favoriteMovie}
                            {!isFavorite && notFavoriteMovie}
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.text}>Тип</div>
                        <div className={styles['main-text']}>{data.short["@type"]}</div>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.text}>Дата выхода</div>
                        <div className={styles['main-text']}>{data.short.datePublished}</div>
                    </div>
                    {data.short.duration && 
                        <div className={styles.detail}>
                            <div className={styles.text}>Длительность</div>
                            <div className={styles['main-text']}>{getDurationMinute(data.short.duration)}</div>
                        </div>
                    }
                    <div className={styles.detail}>
                        <div className={styles.text}>Жанр</div>
                        <div className={styles['main-text']}>{data.short.genre.join(', ')}</div>
                    </div>
                </div>
            </div>
            <div className={styles.reviews}>
                <div className={styles.text}>Отзывы</div>
                <div className={styles.review}>
                    <div className={styles['review-header']}>
                        <div className={styles['review-header-text']}>{data.short.review.name}</div>
                        <div className={styles['review-date']}>{data.short.review.dateCreated}</div>
                    </div>
                    <div className={styles['review-text']}>{data.short.review.reviewBody}</div>
                </div>    
            </div>
        </div>
    )
}