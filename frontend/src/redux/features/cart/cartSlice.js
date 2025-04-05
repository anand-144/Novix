import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import AddItem from '../../../assets/AddItem.gif';

const initialState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
                Swal.fire({
                    title: "Great!",
                    html: "<b>Book Added To Cart</b>",
                    color: "white",
                    imageUrl: AddItem,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "rgba(80, 200, 120, 0.8)"
                });
            } else {
                existingItem.quantity += 1;
                Swal.fire({
                    title: "Quantity Updated!",
                    html: "<b>Book quantity increased</b>",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "rgba(80, 200, 120, 0.8)"
                });
            }
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
        },

        clearCart: (state) => {
            state.cartItems = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
