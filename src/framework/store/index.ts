import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import paletteReducer from 'features/builder/framework/web/builder-piece-page/palette-reducer';
import pieceReducer from 'features/builder/framework/web/builder-piece-page/piece-reducer';

const reducer = {
    palette: paletteReducer,
    piece: pieceReducer
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
