import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { initApp } from "modules/app/actions";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./RootReducer";
import rootSaga from "./RootSaga";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [
        "userState",
        "notificationState",
        "brazeState",
        "deepLinkState",
        "profileState",
        "appState",
    ],
    timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    let persistor = persistStore(store, null, () => {
        store.dispatch(initApp());
    });
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
};
