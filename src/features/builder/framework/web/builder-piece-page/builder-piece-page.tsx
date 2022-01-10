import * as React from 'react';
import { MatrixColorCell } from './matrix-color-cell';

export type BuilderPiecePageProps = {
    title: string;
    pieceSchema: string[][];
    onClickPieceSchema: (color: string, position: [number, number]) => void;
    paletteSchema: string[][];
    onClickPaletteSchema: (color: string, position: [number, number]) => void;
    saveButtonTitle: string;
    onClickSaveButton: () => void;
    imageURL?: string;
    bucketButtonTitle: string;
    onBucketClick: () => void;
};
export function BuilderPiecePage({
    title,
    pieceSchema,
    onClickPieceSchema,
    paletteSchema,
    onClickPaletteSchema,
    saveButtonTitle,
    imageURL,
    onClickSaveButton,
    bucketButtonTitle,
    onBucketClick
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
            <div>
                <div>Palette</div>
                <MatrixColorCell
                    testId={'builder-piece-palette'}
                    colorScheme={paletteSchema}
                    onCellSelected={onClickPaletteSchema}
                    cellSize={32}
                />
                <div>
                    <button
                        data-testid={'builder-piece-palette-bucket-button'}
                        onClick={onBucketClick}
                    >
                        {bucketButtonTitle}
                    </button>
                </div>
            </div>
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
