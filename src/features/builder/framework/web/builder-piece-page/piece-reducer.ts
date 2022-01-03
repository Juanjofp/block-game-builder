import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PieceState = {
    colors: string[][];
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
        updatePiece(
            state,
            action: PayloadAction<{ color: string; position: [number, number] }>
        ) {
            const [row, col] = action.payload.position;
            state.colors[row][col] = action.payload.color;
        }
    }
});

export const { updatePiece } = pieceSlice.actions;
export default pieceSlice.reducer;
