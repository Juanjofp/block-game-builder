import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch, ReduxRootState } from 'framework/store';
import { selectColor } from '../../reducers/palette';
import { updatePieceColor, updatePieceImage } from '../../reducers/piece';
import { BuilderPiecePage } from './builder-piece-page';
import { buildCanvasImageService } from './canvas-image-service';
import { ImageService } from '../../../image-service';

function useController(imageService: ImageService) {
    function thunkUpdateSelectedColorInPalette(position: [number, number]) {
        return (dispatch: ReduxDispatch) => {
            dispatch(selectColor(position));
        };
    }
    function thunkUpdatePieceColor(position: [number, number]) {
        return (dispatch: ReduxDispatch, getState: () => ReduxRootState) => {
            const selectedColor = getState().palette.selectedColor;
            dispatch(updatePieceColor({ color: selectedColor, position }));
        };
    }

    function thunkSaveImageAsBase64() {
        return async (
            dispatch: ReduxDispatch,
            getState: () => ReduxRootState
        ) => {
            const pieceSchema = getState().piece.colors;
            const image = await imageService.generateImageBase64FromSchema(
                pieceSchema
            );
            dispatch(updatePieceImage(image));
        };
    }

    const palette = useSelector((state: ReduxRootState) => state.palette);
    const piece = useSelector((state: ReduxRootState) => state.piece);
    const dispatch = useDispatch();

    const onColorSelected = (color: string, position: [number, number]) => {
        dispatch(thunkUpdateSelectedColorInPalette(position));
    };
    const updatePieceSchema = (color: string, position: [number, number]) => {
        dispatch(thunkUpdatePieceColor(position));
    };
    const saveImage = () => {
        dispatch(thunkSaveImageAsBase64());
    };

    return {
        palette,
        piece,
        onColorSelected,
        updatePieceSchema,
        saveImage
    };
}

export type BuilderPiecePageProps = {
    imageService?: ImageService;
};
export function BuilderPiecePageContainer({
    imageService = buildCanvasImageService()
}: BuilderPiecePageProps) {
    const { t } = useI18nService();
    const { piece, updatePieceSchema, palette, onColorSelected, saveImage } =
        useController(imageService);

    return (
        <BuilderPiecePage
            title={t('builder_piece_page_title')}
            pieceSchema={piece.colors}
            updatePieceSchema={updatePieceSchema}
            paletteSchema={palette.colors}
            onColorSelected={onColorSelected}
            saveButtonTitle={t('builder_piece_page_save_button_title')}
            saveImage={saveImage}
            imageData={piece.image}
        />
    );
}
