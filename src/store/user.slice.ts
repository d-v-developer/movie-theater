import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocalStorageProps } from "../hooks/localStorage.props";
import { loadState } from "./storage";

export const USERS_PERSISTENT_STATE = 'dataUsers';

export interface userState {
    users: LocalStorageProps[],
    loginedUser: string
}

const initialState: userState = {
    users: loadState<LocalStorageProps[]>(USERS_PERSISTENT_STATE) ?? [],
    loginedUser: loadState<LocalStorageProps[]>(USERS_PERSISTENT_STATE)?.find(u => u.isLogined)?.name ?? ''
}

export const usersSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addLoginedUser: (state, action: PayloadAction<string>) => {
            state.loginedUser = action.payload;
        },
        login: (state, action: PayloadAction<string>) => {
            state.loginedUser = action.payload;
            const userExist = state.users.find(user => user.name === action.payload);
            if (userExist) {
                userExist.isLogined = true;
            } else {
                state.users.push({name: action.payload, isLogined: true});
            }
        },
        logOut: (state) => {
            state.loginedUser = '';
            state.users = state.users.map(user => ({...user, isLogined: false}))    
        }
    }
});

export default usersSlice.reducer;
export const userActions = usersSlice.actions;