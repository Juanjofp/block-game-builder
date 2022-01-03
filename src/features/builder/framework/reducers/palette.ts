import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaletteState = {
    colors: string[][];
    selectedIndex?: [number, number];
    selectedColor: string;
};

const initialState: PaletteState = {
    colors: [
        ['red', 'green', 'blue', 'brown', 'black'],
        ['yellow', 'orange', 'purple', 'white', 'transparent']
    ],
    selectedColor: 'transparent'
};

export const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        selectColor(state, action: PayloadAction<[number, number]>) {
            const [row, col] = action.payload;
            state.selectedIndex = action.payload;
            state.selectedColor = state.colors[row][col];
        }
    }
});

export const { selectColor } = paletteSlice.actions;
export default paletteSlice.reducer;
