import palette, { selectColor } from './palette';
import piece, { updatePieceColor, updatePieceImage } from './piece';
import menu, { selectMenu } from './menu';
import { ReduxDispatch, ReduxRootState } from 'framework/store';
import { ImageService } from 'features/builder/image-service';
import { buildBuilderInteractor } from '../../interactor';

export const reducers = { palette, piece, menu };

export function thunkUpdateSelectedColorInPalette(position: [number, number]) {
    return (dispatch: ReduxDispatch) => {
        dispatch(selectColor(position));
    };
}

export function thunkUpdatePieceColor(position: [number, number]) {
    return (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
        const selectedColor = getState().palette.selectedColor;
        dispatch(updatePieceColor({ color: selectedColor, position }));
    };
}

export function thunkSaveImageAsBase64(imageService: ImageService) {
    return async (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
        const pieceSchema = getState().piece.colors;
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
