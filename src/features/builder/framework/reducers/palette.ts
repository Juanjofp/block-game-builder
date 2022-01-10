import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaletteState = {
    colors: string[][];
    selectedIndex?: [number, number];
    selectedColor: string;
    isBucketEnabled: boolean;
};

const initialState: PaletteState = {
    colors: [
        ['red', 'green', 'blue', 'brown', 'black'],
        ['yellow', 'orange', 'purple', 'white', 'transparent']
    ],
    selectedColor: 'transparent',
    isBucketEnabled: false
};

export const paletteSlice = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        selectColor(state, action: PayloadAction<[number, number]>) {
            const [row, col] = action.payload;
            state.selectedIndex = action.payload;
            state.selectedColor = state.colors[row][col];
        },
        enableBucket(state, action: PayloadAction<boolean>) {
            state.isBucketEnabled = action.payload;
        }
    }
});

export const { selectColor, enableBucket } = paletteSlice.actions;
export default paletteSlice.reducer;
