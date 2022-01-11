import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { BuilderPiecePage } from './builder-piece-page';
import { buildCanvasImageService } from './canvas-image-service';
import { ImageService } from 'features/builder/image-service';
import {
    thunkUpdatePieceColor,
    thunkSaveImageAsBase64,
    getPiece
} from 'features/builder/framework/reducers';
import { useAppSelector, useAppDispatch } from 'framework/store/hooks';

function useController(imageService: ImageService) {
    const piece = useAppSelector(getPiece);
    const dispatch = useAppDispatch();

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
        piece,
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
    const { piece, updateColorInPieceSchema, saveImage } =
        useController(imageService);

    return (
        <BuilderPiecePage
            title={t('builder_piece_page_title')}
            pieceSchema={piece.colors}
            onClickPieceSchema={updateColorInPieceSchema}
            saveButtonTitle={t('builder_piece_page_save_button_title')}
            onClickSaveButton={saveImage}
            imageURL={piece.image}
        />
    );
}
