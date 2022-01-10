import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PieceState = {
    colors: string[][];
    image?: string;
};

const canvasSize = 12;
const initialState: PieceState = {
    colors: Array.from({ length: canvasSize }, () =>
        Array.from({ length: canvasSize }, () => 'transparent')
    )
};

export const pieceSlice = createSlice({
    name: 'piece',
    initialState,
    reducers: {
        updatePieceImage(state, action: PayloadAction<string>) {
            state.image = action.payload;
        },
        updatePieceSchema(state, action: PayloadAction<string[][]>) {
            state.colors = action.payload;
        }
    }
});

export const { updatePieceImage, updatePieceSchema } = pieceSlice.actions;
export default pieceSlice.reducer;
