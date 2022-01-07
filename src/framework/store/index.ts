import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { reducers as builderReducers } from 'features/builder/framework/reducers';

const reducer = {
    ...builderReducers
};

export type ReduxRootState = StateFromReducersMapObject<typeof reducer>;

export function buildStore(preloadedState?: Partial<ReduxRootState>) {
    return configureStore({
        reducer,
        preloadedState
    });
}

export type ReduxStore = ReturnType<typeof buildStore>;
export type ReduxDispatch = ReduxStore['dispatch'];
