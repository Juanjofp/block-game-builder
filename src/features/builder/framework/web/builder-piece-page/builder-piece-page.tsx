import * as React from 'react';
import { MatrixColorCell } from './matrix-color-cell';

export type BuilderPiecePageProps = {
    title: string;
    pieceSchema: string[][];
    updatePieceSchema: (color: string, position: [number, number]) => void;
    paletteSchema: string[][];
    onColorSelected: (color: string, position: [number, number]) => void;
    saveButtonTitle: string;
    saveImage: () => void;
    imageData?: string;
};
export function BuilderPiecePage({
    title,
    pieceSchema,
    updatePieceSchema,
    paletteSchema,
    onColorSelected,
    saveButtonTitle,
    imageData,
    saveImage
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
                onCellSelected={updatePieceSchema}
            />
            <hr />
            <MatrixColorCell
                testId={'builder-piece-palette'}
                colorScheme={paletteSchema}
                onCellSelected={onColorSelected}
                cellSize={32}
            />
            <hr />
            <div>
                <button
                    data-testid={'builder-piece-page-save-image-button'}
                    onClick={saveImage}
                >
                    {saveButtonTitle}
                </button>
            </div>
            <hr />
            {imageData && (
                <img
                    src={imageData}
                    alt={'piece'}
                    data-testid={'builder-piece-page-image'}
                />
            )}
        </div>
    );
}
