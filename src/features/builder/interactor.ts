import { ValidMenuKeys, MenuSection, containsValidPath } from './menu-models';

export function buildBuilderInteractor() {
    return {
        buildMenuFromPath: loadMenuFromPath,
        updatePieceColorScheme
    };
}

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

function removeFinalSlash(path: string): string {
    let endPath = path;
    while (endPath.endsWith('/')) {
        endPath = endPath.slice(0, -1);
    }
    return endPath;
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

function fillAvailableCellsWithColor(
    [row, column]: [number, number],
    colorScheme: string[][],
    selectedColor: string
) {
    const newSchema = colorScheme.map(row => row.slice());
    const oldColor = newSchema[row][column];
    newSchema[row][column] = selectedColor;
    updateColorNeighbours([[row, column]], newSchema, oldColor, selectedColor);
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

function getValidNeighbours(
    numOfRows: number,
    numOfColumns: number,
    [row, column]: [number, number]
): [number, number][] {
    const maxRows = numOfRows - 1;
    const maxColumns = numOfColumns - 1;
    const neighbours: [number, number][] = [];
    if (row > 0) neighbours.push([row - 1, column]);
    if (row < maxRows) neighbours.push([row + 1, column]);
    if (column > 0) neighbours.push([row, column - 1]);
    if (column < maxColumns) neighbours.push([row, column + 1]);
    return neighbours;
}

function updateColorAndCollectNeighboursWithOldColorInSchema(
    oldColor: string,
    newColor: string,
    neighbours: [number, number][],
    schema: string[][]
) {
    const nextNeighbours: [number, number][] = [];
    neighbours.forEach(neighbour => {
        const [row, column] = neighbour;
        const neighborColor = schema[row][column];
        if (neighborColor === oldColor) {
            schema[row][column] = newColor;
            nextNeighbours.push([row, column]);
        }
    });
    return nextNeighbours;
}

function updateColorNeighbours(
    cells: [number, number][],
    newSchema: string[][],
    oldColor: string,
    newColor: string
) {
    if (cells.length === 0) return;
    cells.forEach(cell => {
        const neighborsOfCell = getValidNeighbours(
            newSchema.length,
            newSchema[0].length,
            cell
        );

        const nextNeighbours =
            updateColorAndCollectNeighboursWithOldColorInSchema(
                oldColor,
                newColor,
                neighborsOfCell,
                newSchema
            );

        updateColorNeighbours(nextNeighbours, newSchema, oldColor, newColor);
    });
}
