import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch, ReduxRootState } from 'framework/store';
import { BuilderPiecePage } from './builder-piece-page';
import { buildCanvasImageService } from './canvas-image-service';
import { ImageService } from 'features/builder/image-service';
import {
    thunkUpdateSelectedColorInPalette,
    thunkUpdatePieceColor,
    thunkSaveImageAsBase64
} from 'features/builder/framework/reducers';

function useController(imageService: ImageService) {
    const palette = useSelector((state: ReduxRootState) => state.palette);
    const piece = useSelector((state: ReduxRootState) => state.piece);
    const dispatch = useDispatch<ReduxDispatch>();

    const selectColorFromPalette = (
        color: string,
        position: [number, number]
    ) => {
        dispatch(thunkUpdateSelectedColorInPalette(position));
    };
    const updateColorInPieceSchema = (
        color: string,
        position: [number, number]
    ) => {
        dispatch(thunkUpdatePieceColor(position));
    };
    const saveImage = () => {
        dispatch(thunkSaveImageAsBase64(imageService));
    };

    return {
        palette,
        piece,
        selectColorFromPalette,
        updateColorInPieceSchema,
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
    const {
        piece,
        updateColorInPieceSchema,
        palette,
        selectColorFromPalette,
        saveImage
    } = useController(imageService);

    return (
        <BuilderPiecePage
            title={t('builder_piece_page_title')}
            pieceSchema={piece.colors}
            onClickPieceSchema={updateColorInPieceSchema}
            paletteSchema={palette.colors}
            onClickPaletteSchema={selectColorFromPalette}
            saveButtonTitle={t('builder_piece_page_save_button_title')}
            onClickSaveButton={saveImage}
            imageURL={piece.image}
        />
    );
}
