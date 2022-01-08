import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidMenuKeys, MenuElement, menus } from 'features/builder/interactor';

export type BuilderMenuElement = {
    selected: boolean;
} & MenuElement;

const initialState: BuilderMenuElement[] = menus.map(menu => ({
    ...menu,
    selected: false
}));

export const paletteSlice = createSlice({
    name: 'builderMenu',
    initialState,
    reducers: {
        selectMenu(state, action: PayloadAction<ValidMenuKeys>) {
            state.forEach(element => {
                element.selected = element.key === action.payload;
            });
        }
    }
});

export const { selectMenu } = paletteSlice.actions;
export default paletteSlice.reducer;
