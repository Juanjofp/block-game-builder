import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';

type ColorCellProps = {
    onClick: (color: string, position: [number, number]) => void;
    indexRow: number;
    indexColumn: number;
    color: string;
};

function ColorCell({
    color,
    indexRow,
    indexColumn,
    onClick,
    ...rest
}: ColorCellProps) {
    return (
        <button
            className='color-cell'
            style={{ backgroundColor: color }}
            onClick={() => onClick(color, [indexRow, indexColumn])}
            {...rest}
        >
            {color}
        </button>
    );
}

function PieceCanvas({
    onCellSelected,
    colorScheme
}: {
    onCellSelected: (color: string, position: [number, number]) => void;
    colorScheme: string[][];
}) {
    const rows = colorScheme.length;
    const columns = colorScheme[0].length;

    return (
        <div data-testid={'builder-piece-canvas'}>
            {Array.from({ length: rows }).map((_, indexRow) => (
                <div
                    key={`canvas-row-${indexRow}`}
                    data-testid={'builder-piece-canvas-row'}
                >
                    {Array.from({ length: columns }).map((_, indexColumn) => (
                        <ColorCell
                            onClick={onCellSelected}
                            key={`canvas-cell-${indexRow}_${indexColumn}`}
                            data-testid={`builder-piece-canvas-cell-${indexRow}-${indexColumn}`}
                            indexRow={indexRow}
                            indexColumn={indexColumn}
                            color={colorScheme[indexRow][indexColumn]}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function ColorPalette({
    onColorSelected
}: {
    onColorSelected: (color: string | null) => void;
}) {
    return (
        <div data-testid={'builder-piece-palette'}>
            {Array.from({ length: 8 }).map((_, indexRow) => (
                <div
                    key={`palette-row-${indexRow}`}
                    data-testid={'builder-piece-palette-row'}
                >
                    {Array.from({ length: 2 }).map((_, indexColumn) => (
                        <ColorCell
                            onClick={color => onColorSelected(color)}
                            key={`palette-cell-${indexRow}_${indexColumn}`}
                            data-testid={`builder-piece-palette-cell-${indexRow}-${indexColumn}`}
                            indexRow={indexRow}
                            indexColumn={indexColumn}
                            color={`#${indexRow}${indexColumn}0`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function Index() {
    const { t } = useI18nService();
    const [colorScheme, setColorScheme] = React.useState<string[][]>(
        Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => 'transparent')
        )
    );

    const [selectedColor, setSelectedColor] = React.useState<string | null>(
        null
    );

    function updateCanvas(color: string, position: [number, number]) {
        const [rowSelected, columnSelected] = position;
        setColorScheme(
            colorScheme.map((row, indexRow) =>
                row.map((color, indexColumn) => {
                    if (
                        indexRow === rowSelected &&
                        indexColumn === columnSelected
                    ) {
                        return selectedColor || 'transparent';
                    }
                    return colorScheme[indexRow][indexColumn];
                })
            )
        );
    }

    return (
        <div data-testid={'builder-piece-page-container'}>
            <div>{t('builder_piece_page_title')}</div>
            <PieceCanvas
                colorScheme={colorScheme}
                onCellSelected={updateCanvas}
            />
            <ColorPalette onColorSelected={setSelectedColor} />
        </div>
    );
}
