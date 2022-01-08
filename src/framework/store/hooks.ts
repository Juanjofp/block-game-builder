import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { ReduxRootState, ReduxDispatch } from '.';

export const useAppDispatch = () => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;
