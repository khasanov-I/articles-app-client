import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type AddCommentSchema} from '../types/addComment';

const initialState: AddCommentSchema = {
    text: '',
};

const addCommentSlice = createSlice({
    name: 'addComment',
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
    },
});

export const {actions: addCommentActions} = addCommentSlice;
export const {reducer: addCommentReducer} = addCommentSlice;
