import axios from "axios";
import Urls from "../_utils/urls";
// import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { RootReducer, whitelistReducers } from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const client = axios.create({
    baseURL: Urls.baseUrl,
    responseType: "json",
});

const persistConfig = {
    key: "workflow",
    storage,
    whitelist: whitelistReducers,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    axios: {
                        ...client,
                        interceptors: {
                            request: axios.interceptors.request.use(
                                config => {
                                    const tokenLessApis = ["/login", "/signup"];
                                    const token = localStorage.getItem("token");
                                    if (
                                        token &&
                                        config.url &&
                                        !tokenLessApis.includes(config.url)
                                    ) {
                                        config.headers[
                                            "Authorization"
                                        ] = `Bearer ${token}`;
                                    }
                                    return config;
                                },
                                error => Promise.reject(error)
                            ),
                        },
                    },
                },
            },
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { persistor, client };

export default store;
