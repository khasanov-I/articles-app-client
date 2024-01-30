import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type ScrollRestorationSchema} from '../types/ScrollRestorationSchema';

const initialState: ScrollRestorationSchema = {
    scroll: {},
};

const ScrollRestorationSlice = createSlice({
    name: 'ScrollRestoration',
    initialState,
    reducers: {
        setScrollPosition(state, action: PayloadAction<{path: string; position: number}>) {
            state.scroll[action.payload.path] = action.payload.position;
        },
    },
});

export const {actions: ScrollRestorationActions} = ScrollRestorationSlice;
export const {reducer: ScrollRestorationReducer} = ScrollRestorationSlice;
