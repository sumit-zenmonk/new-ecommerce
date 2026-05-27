"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "./cart-type";

const getCartFromStorage = () => {
    if (typeof window === "undefined") return null;

    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : null;
};

const initialState: CartState = {
    cart: getCartFromStorage(),
    loading: false,
    error: null,
    status: "pending",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCartError: (state) => {
            state.error = null;
            state.status = "pending";
        },

        clearCartState: (state) => {
            state.cart = null;
            state.error = null;
            state.status = "pending";
            localStorage.removeItem("cart");
        },

        addToCart: (state, action: PayloadAction<CartItem>) => {
            if (!state.cart) {
                state.cart = {
                    total_price: "0",
                    items: [],
                };
            }

            const exists = state.cart.items.find((item) => item.product_uuid === action.payload.product_uuid);
            if (!exists) {
                state.cart.items.unshift(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
    },
});

export const { resetCartError, clearCartState, addToCart } = cartSlice.actions;
export default cartSlice.reducer;