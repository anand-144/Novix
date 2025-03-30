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
                state.cartItems.push(action.payload);
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
                    background: "rgba(80, 200, 120, 0.8)" // Emerald color with 80% opacity
                });
                
                                



            } else {
                Swal.fire({
                    title: "Already Added To The Cart",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!",
                    background: "rgba(241, 130, 141, 0.4)"
                  });
                  
            }
        },

        removeFromCart: (state , action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },

        clearCart: (state) => {
            state.cartItems = []
        }

    }
});



export const { addToCart , removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
