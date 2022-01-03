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

export function MatrixColorCell({
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
