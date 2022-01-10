import palette, { selectColor, enableBucket } from './palette';
import piece, { updatePieceImage, updatePieceSchema } from './piece';
import menu, { selectMenu } from './menu';
import { ReduxDispatch, ReduxRootState } from 'framework/store';
import { ImageService } from 'features/builder/image-service';
import { buildBuilderInteractor } from 'features/builder/interactor';
import { combineReducers } from '@reduxjs/toolkit';

export const reducers = combineReducers({ palette, piece, menu });

export function thunkUpdateSelectedColorInPalette(position: [number, number]) {
    return (dispatch: ReduxDispatch) => {
        dispatch(selectColor(position));
    };
}

export function thunkToggleBucketInPalette() {
    return (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
        const isBuketEnabled = getPalette(getState()).isBucketEnabled;
        dispatch(enableBucket(!isBuketEnabled));
    };
}

export function thunkUpdatePieceColor(position: [number, number]) {
    return (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
        const interactor = buildBuilderInteractor();
        const schema = getPiece(getState()).colors;
        const selectedColor = getPalette(getState()).selectedColor;
        const isBucketEnabled = getPalette(getState()).isBucketEnabled;
        dispatch(
            updatePieceSchema(
                interactor.updatePieceColorScheme(
                    position,
                    selectedColor,
                    schema,
                    isBucketEnabled
                )
            )
        );
        /*if (!isBuketEnabled)
            dispatch(
                
            );
        else {
            const schema = getPiece(getState()).colors;
            const newSchema = schema.map((row, rowIndex) => {
                return row.map((color, columnIndex) => {
                    return selectedColor;
                });
            });
            dispatch(updatePieceSchema(newSchema));
        }*/
    };
}

export function thunkSaveImageAsBase64(imageService: ImageService) {
    return async (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
        const pieceSchema = getPiece(getState()).colors;
        const image = await imageService.generateImageBase64FromSchema(
            pieceSchema
        );
        dispatch(updatePieceImage(image));
    };
}

export function thunkSelectMenuOptionFromPath(currentPath: string) {
    return (dispatch: ReduxDispatch) => {
        const interactor = buildBuilderInteractor();
        const menuKey = interactor.buildMenuFromPath(currentPath);
        dispatch(selectMenu(menuKey));
    };
}

export function getPiece(state: ReduxRootState) {
    return state.builder.piece;
}

export function getPalette(state: ReduxRootState) {
    return state.builder.palette;
}

export function getMenu(state: ReduxRootState) {
    return state.builder.menu;
}
