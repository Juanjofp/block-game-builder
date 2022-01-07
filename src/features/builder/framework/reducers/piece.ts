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
        updatePieceColor(
            state,
            action: PayloadAction<{ color: string; position: [number, number] }>
        ) {
            const [row, col] = action.payload.position;
            state.colors[row][col] = action.payload.color;
        },
        updatePieceImage(state, action: PayloadAction<string>) {
            state.image = action.payload;
        }
    }
});

export const { updatePieceColor, updatePieceImage } = pieceSlice.actions;
export default pieceSlice.reducer;
