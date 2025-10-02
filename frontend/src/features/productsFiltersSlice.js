import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for fetching products from the API:
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        return await response.json();
    }
);

const initialState = {
    products: [],
    selectedCategory: 'All',
    status: 'idle',
    error: null
};
// A slice needs:
const productsFiltersSlice = createSlice({
    // 1) a string name:
    name: 'productsFilters',
    // 2) the initialState:
    initialState,
    // 3) a reducer function (or functions):
    reducers: {
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
    },
    // This block of code corresponds to the AsyncThunk hook imported earlier. This hook simplifies the handling of async operations in Redux applications:
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setSelectedCategory, setProducts } = productsFiltersSlice.actions;
// Enable the slice defined in this file to modify the store object in store.js via the store object's reducer key:
export default productsFiltersSlice.reducer