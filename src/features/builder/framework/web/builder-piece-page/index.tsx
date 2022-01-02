import { useI18nService } from 'services/i18n/framework';
import * as React from 'react';

type ColorCellProps = {
    onClick: (color: string, position: [number, number]) => void;
    indexRow: number;
    indexColumn: number;
    color: string;
    size: number;
};

function ColorCell({
    color,
    indexRow,
    indexColumn,
    onClick,
    size,
    ...rest
}: ColorCellProps) {
    return (
        <button
            className='color-cell'
            style={{ backgroundColor: color, height: size, width: size }}
            onClick={() => onClick(color, [indexRow, indexColumn])}
            {...rest}
        />
    );
}

function MatrixColorCell({
    onCellSelected,
    colorScheme,
    testId,
    cellSize = 32
}: {
    onCellSelected: (color: string, position: [number, number]) => void;
    colorScheme: string[][];
    cellSize?: number;
    testId?: string;
}) {
    const rows = colorScheme.length;
    const columns = colorScheme[0].length;

    return (
        <div
            data-testid={testId}
            style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            {Array.from({ length: rows }).map((_, indexRow) => (
                <div
                    style={{
                        display: 'flex'
                    }}
                    key={`canvas-row-${indexRow}`}
                    data-testid={`${testId}-row`}
                >
                    {Array.from({ length: columns }).map((_, indexColumn) => (
                        <ColorCell
                            onClick={onCellSelected}
                            key={`canvas-cell-${indexRow}_${indexColumn}`}
                            data-testid={`${testId}-cell-${indexRow}-${indexColumn}`}
                            indexRow={indexRow}
                            indexColumn={indexColumn}
                            color={colorScheme[indexRow][indexColumn]}
                            size={cellSize}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

const paletteScheme = [
    ['white', 'black', 'red', 'green', 'blue', 'yellow', 'transparent'],
    ['purple', 'pink', 'cyan', 'brown', 'grey', 'orange', 'coral']
];
const canvasSize = 12;
export function BuilderPiecePage() {
    const { t } = useI18nService();
    const [colorScheme, setColorScheme] = React.useState<string[][]>(
        Array.from({ length: canvasSize }, () =>
            Array.from({ length: canvasSize }, () => 'transparent')
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
            <div>{t('builder_piece_page_title')}</div>
            <MatrixColorCell
                testId={'builder-piece-canvas'}
                colorScheme={colorScheme}
                onCellSelected={updateCanvas}
            />
            <hr />
            <MatrixColorCell
                testId={'builder-piece-palette'}
                colorScheme={paletteScheme}
                onCellSelected={setSelectedColor}
                cellSize={32}
            />
        </div>
    );
}
