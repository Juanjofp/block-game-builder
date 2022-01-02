import {
    configureStore,
    StateFromReducersMapObject,
    DeepPartial,
    ReducersMapObject
} from '@reduxjs/toolkit';

const reducer: ReducersMapObject = {
    test: (state: string = '') => state
};

export type ReduxRootState = StateFromReducersMapObject<typeof reducer>;

export function buildStore(preloadedState?: DeepPartial<ReduxRootState>) {
    return configureStore({
        reducer,
        preloadedState
    });
}

export type ReduxStore = ReturnType<typeof buildStore>;
export type ReduxDispatch = ReduxStore['dispatch'];
