import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import AddItem from '../../../assets/AddItem.gif';

// Get initial cart data from localStorage (if available)
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ 
                    ...action.payload, 
                    quantity: action.payload.quantity || 1,
                    totalPrice: action.payload.newPrice * (action.payload.quantity || 1),  // Add totalPrice calculation
                });
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
                existingItem.totalPrice = existingItem.newPrice * existingItem.quantity; // Recalculate totalPrice
                Swal.fire({
                    title: "Quantity Updated!",
                    html: "<b>Book quantity increased</b>",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "rgba(80, 200, 120, 0.8)"
                });
            }
            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item.newPrice * item.quantity; // Recalculate totalPrice
            }
            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.newPrice * item.quantity; // Recalculate totalPrice
            }
            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        clearCart: (state) => {
            state.cartItems = [];
            // Clear cart from localStorage
            localStorage.removeItem('cartItems');
        },

        // New action to clear cart data on logout
        clearCartOnLogout: (state) => {
            state.cartItems = [];
            // Clear cart from localStorage on logout
            localStorage.removeItem('cartItems');
        }
    }
});

// Export the new action for clearing cart on logout
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, clearCartOnLogout } = cartSlice.actions;

export default cartSlice.reducer;
