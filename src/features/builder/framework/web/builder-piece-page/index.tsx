import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxRootState } from 'framework/store';
import { selectColor } from '../../reducers/palette';
import { updatePiece } from '../../reducers/piece';
import { BuilderPiecePage } from './builder-piece-page';

function useBuilderPiece() {
    const palette = useSelector((state: ReduxRootState) => state.palette);
    const pieceSchema = useSelector(
        (state: ReduxRootState) => state.piece.colors
    );
    const dispatch = useDispatch();
    const onColorSelected = (color: string, position: [number, number]) => {
        dispatch(selectColor(position));
    };
    const updatePieceSchema = (color: string, position: [number, number]) => {
        dispatch(updatePiece({ color: palette.selectedColor, position }));
    };

    return {
        palette,
        pieceSchema,
        onColorSelected,
        updatePieceSchema
    };
}

export function BuilderPiecePageContainer() {
    const { t } = useI18nService();
    const { pieceSchema, updatePieceSchema, palette, onColorSelected } =
        useBuilderPiece();

    return (
        <BuilderPiecePage
            title={t('builder_piece_page_title')}
            pieceSchema={pieceSchema}
            updatePieceSchema={updatePieceSchema}
            paletteSchema={palette.colors}
            onColorSelected={onColorSelected}
        />
    );
}
