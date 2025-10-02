import {configureStore} from '@reduxjs/toolkit'
import productsFiltersReducer from './features/productsFiltersSlice'

export const store = configureStore({
    reducer: {
        productsFilters: productsFiltersReducer
    }
});