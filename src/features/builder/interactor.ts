import { ValidMenuKeys, MenuSection, containsValidPath } from './menu-models';

function removeFinalSlash(path: string): string {
    let endPath = path;
    while (endPath.endsWith('/')) {
        endPath = endPath.slice(0, -1);
    }
    return endPath;
}

export function buildBuilderInteractor() {
    function loadMenuFromPath(path: string): ValidMenuKeys {
        const endPath = removeFinalSlash(path);
        const segments = endPath.split('/');
        const lastPath = segments.pop() || '';
        const section = segments.pop();

        if (segments.length > 1) return undefined;

        if (lastPath === MenuSection) {
            return 'scene';
        }

        if (section !== MenuSection) {
            return undefined;
        }

        return containsValidPath(lastPath);
    }

    function updateColorNeigbours(
        cells: [number, number][],
        newSchema: string[][],
        selectedColor: string
    ) {
        if (cells.length === 0) return;
        cells.forEach(cell => {
            const [row, column] = cell;
            const neighborsOfCell = [
                [row - 1, column],
                [row, column - 1],
                [row, column + 1],
                [row + 1, column]
            ];

            const nextNeighbours: [number, number][] = [];
            neighborsOfCell.forEach(neighbor => {
                const [neighborRow, neighborColumn] = neighbor;
                if (
                    neighborRow >= 0 &&
                    neighborRow < newSchema.length &&
                    neighborColumn >= 0 &&
                    neighborColumn < newSchema[0].length
                ) {
                    const neighborColor =
                        newSchema[neighborRow][neighborColumn];
                    if (neighborColor === 'transparent') {
                        newSchema[neighborRow][neighborColumn] = selectedColor;
                        nextNeighbours.push([neighborRow, neighborColumn]);
                    }
                }
            });
            updateColorNeigbours(nextNeighbours, newSchema, selectedColor);
        });
    }

    function fillAvailableCellsWithColor(
        [row, column]: [number, number],
        colorScheme: string[][],
        selectedColor: string
    ) {
        const newSchema = colorScheme.map(row => row.slice());
        newSchema[row][column] = selectedColor;
        const neighbors = [
            [row - 1, column],
            [row, column - 1],
            [row, column + 1],
            [row + 1, column]
        ];
        const nextNeigbours: [number, number][] = [];
        neighbors.forEach(neighbor => {
            const [neighborRow, neighborColumn] = neighbor;
            if (
                neighborRow >= 0 &&
                neighborRow < newSchema.length &&
                neighborColumn >= 0 &&
                neighborColumn < newSchema[0].length
            ) {
                const neighborColor = newSchema[neighborRow][neighborColumn];
                if (neighborColor === 'transparent') {
                    newSchema[neighborRow][neighborColumn] = selectedColor;
                    nextNeigbours.push([neighborRow, neighborColumn]);
                }
            }
        });
        updateColorNeigbours(nextNeigbours, newSchema, selectedColor);
        return newSchema;
    }

    function updateCellWithColor(
        [row, column]: [number, number],
        color: string,
        colorScheme: string[][]
    ) {
        const newColorScheme = colorScheme.map(row => [...row]);
        newColorScheme[row][column] = color;
        return newColorScheme;
    }

    function updatePieceColorScheme(
        position: [number, number],
        color: string,
        colorScheme: string[][],
        isBucketEnabled = false
    ) {
        if (isBucketEnabled) {
            return fillAvailableCellsWithColor(position, colorScheme, color);
        }
        return updateCellWithColor(position, color, colorScheme);
    }

    return {
        buildMenuFromPath: loadMenuFromPath,
        updatePieceColorScheme
    };
}
