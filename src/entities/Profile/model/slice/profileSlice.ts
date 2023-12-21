import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type Profile, type ProfileSchema} from '../types/profile';
import {fetchProfileData} from '../services/fetchProfileData/fetchProfileData';
import {updateProfileData} from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly(state: ProfileSchema, action: PayloadAction<boolean>) {
            state.readonly = action.payload;
        },
        cancelEdit(state: ProfileSchema) {
            state.readonly = true;
            state.validateError = undefined;
            state.form = state.data;
        },
        updateProfile(state: ProfileSchema, action: PayloadAction<Profile>) {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProfileData.pending, state => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, state => {
                state.validateError = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateError = action.payload;
            });
    },
});

export const {actions: profileActions} = profileSlice;
export const {reducer: profileReducer} = profileSlice;
