"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Order, OrderState } from "./order-type";
import { createOrder, getOrders } from "./order-action";

const initialState: OrderState = {
    orders: null,
    loading: false,
    error: null,
    status: "pending",
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderError: (state) => {
            state.error = null;
            state.status = "pending";
        },
        clearOrderState: (state) => {
            state.orders = null;
            state.error = null;
            state.status = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";

                const newOrders = action.payload.data as Order[];

                if (state.orders) {
                    const uuids = new Set(
                        state.orders.map((order) => order.uuid)
                    );

                    const filteredOrders = newOrders.filter(
                        (order) => !uuids.has(order.uuid)
                    );

                    state.orders = [
                        ...state.orders,
                        ...filteredOrders,
                    ];
                } else {
                    state.orders = newOrders;
                }

                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            })
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.status = "pending";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeed";

                const order = action.payload.data as Order;

                if (state.orders) {
                    state.orders.unshift(order);
                } else {
                    state.orders = [order];
                }

                state.error = null;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.status = "rejected";
                state.error = action.payload as string;
            });
    },
});

export const { resetOrderError, clearOrderState, } = orderSlice.actions;
export default orderSlice.reducer;