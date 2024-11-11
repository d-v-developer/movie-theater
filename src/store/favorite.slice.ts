import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieProps } from "../interfaces/movie.interface";
import { loadState } from "./storage";

export const FAVORITE_PERSISTENT_STATE = 'favoriteState';

export interface FavoriteState {
    movies: movieProps[]
}

export interface deleteFavoriteProps {
    id: string,
    user: string
}

const initialState: FavoriteState = {
    movies: loadState<movieProps[]>(FAVORITE_PERSISTENT_STATE) ?? []
}

export const favoriteSlice = createSlice(
    {
        name: 'favorite',
        initialState,
        reducers: {
            addToFavorite: (state, action: PayloadAction<movieProps>) => {
                state.movies.push(action.payload);
            },
            deleteFavorite: (state, action: PayloadAction<deleteFavoriteProps>) => {
                state.movies = state.movies.filter((movie) => movie["#IMDB_ID"] !== action.payload.id || movie["user"] !== action.payload.user)
            }
        }
    }
)

export default favoriteSlice.reducer;
export const favoriteActions = favoriteSlice.actions;
   
export const selectFavoriteCount = (state: {favorite: FavoriteState}, loginedUser: string) => state.favorite.movies.filter(movie => movie.user === loginedUser).length