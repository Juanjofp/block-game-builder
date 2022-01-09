import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { reducers as builderReducers } from 'features/builder/framework/reducers';
import { CombinedState, PreloadedState } from 'redux';
import { NoInfer } from '@reduxjs/toolkit/src/tsHelpers';

const reducer = {
    ...builderReducers
};

export type ReduxRootState = StateFromReducersMapObject<typeof reducer>;
export type ReduxPreloadState = PreloadedState<
    CombinedState<NoInfer<ReduxRootState>>
>;
export function buildStore(preloadedState?: ReduxPreloadState) {
    return configureStore({
        reducer,
        preloadedState
    });
}

export type ReduxStore = ReturnType<typeof buildStore>;
export type ReduxDispatch = ReduxStore['dispatch'];
