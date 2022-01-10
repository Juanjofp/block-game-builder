import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { BuilderPiecePage } from './builder-piece-page';
import { buildCanvasImageService } from './canvas-image-service';
import { ImageService } from 'features/builder/image-service';
import {
    thunkToggleBucketInPalette,
    thunkUpdateSelectedColorInPalette,
    thunkUpdatePieceColor,
    thunkSaveImageAsBase64,
    getPalette,
    getPiece
} from 'features/builder/framework/reducers';
import { useAppSelector, useAppDispatch } from 'framework/store/hooks';

function useController(imageService: ImageService) {
    const palette = useAppSelector(getPalette);
    const piece = useAppSelector(getPiece);
    const dispatch = useAppDispatch();

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

    const toggleBucketInPalette = () => {
        dispatch(thunkToggleBucketInPalette());
    };

    return {
        palette,
        piece,
        selectColorFromPalette,
        updateColorInPieceSchema,
        saveImage,
        toggleBucketInPalette
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
        saveImage,
        toggleBucketInPalette
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
            bucketButtonTitle={t('builder_piece_page_bucket_button_title')}
            onBucketClick={toggleBucketInPalette}
        />
    );
}
