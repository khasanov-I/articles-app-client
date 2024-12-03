import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {type ProfileSchema} from '../types/editableProfileCardSchema';
import {fetchProfileData} from '../services/fetchProfileData/fetchProfileData';
import {type Country} from '@/entities/Country';
import {type Currency} from '@/entities/Currency';

const initialState: ProfileSchema = {
    isLoading: true,
    error: undefined,
    data: undefined,
    canEdit: false,
};
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setAge(state, action: PayloadAction<string>) {
            state.data = {...state.data, age: action.payload};
        },
        setCity(state, action: PayloadAction<string>) {
            state.data = {...state.data, city: action.payload};
        },
        setLastName(state, action: PayloadAction<string>) {
            state.data = {...state.data, lastname: action.payload};
        },
        setFirstName(state, action: PayloadAction<string>) {
            state.data = {...state.data, firstname: action.payload};
        },
        setCountry(state, action: PayloadAction<Country>) {
            state.data = {...state.data, country: action.payload};
        },
        setCurrency(state, action: PayloadAction<Currency>) {
            state.data = {...state.data, currency: action.payload};
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
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {actions: profileActions} = profileSlice;
export const {reducer: profileReducer} = profileSlice;
