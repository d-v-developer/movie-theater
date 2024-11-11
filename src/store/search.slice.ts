import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieProps } from "../interfaces/movie.interface";

export interface searchState {
    query: string,
    moviesSearched: movieProps[]
}

const initialState: searchState = {
    query: '',
    moviesSearched: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        setMoviesSearched: (state, action: PayloadAction<movieProps[]>) => {
            state.moviesSearched = action.payload
        }
    }
})

export default searchSlice.reducer;
export const searchActions = searchSlice.actions;