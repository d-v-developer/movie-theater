import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer, { FAVORITE_PERSISTENT_STATE } from "./favorite.slice";
import userReducer, { USERS_PERSISTENT_STATE } from './user.slice';
import searchReducer  from './search.slice';
import { saveState } from "./storage";

export const store = configureStore({
    reducer: {
        favorite: favoriteReducer,
        user: userReducer,
        search: searchReducer
    }
})

store.subscribe(() => {
    saveState(FAVORITE_PERSISTENT_STATE, store.getState().favorite.movies);
    saveState(USERS_PERSISTENT_STATE, store.getState().user.users)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;