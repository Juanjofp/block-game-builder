import * as React from 'react';
import { MatrixColorCell } from './matrix-color-cell';
import { PaletteColor } from './palette-color';

export type BuilderPiecePageProps = {
    title: string;
    pieceSchema: string[][];
    onClickPieceSchema: (color: string, position: [number, number]) => void;
    saveButtonTitle: string;
    onClickSaveButton: () => void;
    imageURL?: string;
};
export function BuilderPiecePage({
    title,
    pieceSchema,
    onClickPieceSchema,
    saveButtonTitle,
    imageURL,
    onClickSaveButton
}: BuilderPiecePageProps) {
    return (
        <div
            data-testid={'builder-piece-page-container'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                padding: 12
            }}
        >
            <div>{title}</div>
            <MatrixColorCell
                testId={'builder-piece-canvas'}
                colorScheme={pieceSchema}
                onCellSelected={onClickPieceSchema}
            />
            <hr />
            <PaletteColor />
            <hr />
            <div>
                <button
                    data-testid={'builder-piece-page-save-image-button'}
                    onClick={onClickSaveButton}
                >
                    {saveButtonTitle}
                </button>
            </div>
            <hr />
            {imageURL && (
                <img
                    src={imageURL}
                    alt={'piece'}
                    data-testid={'builder-piece-page-image'}
                />
            )}
        </div>
    );
}
