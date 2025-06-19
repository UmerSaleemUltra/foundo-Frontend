import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CartSummary = () => {
    return (
        <div className="shopping-cart-container">
            <div className="cart-header">
                <h3 style={{ marginTop: 0 }}>Shopping cart (2)</h3>
            </div>
            <div className="cart-item">
                <div className="cart-item-details">
                    <h4 style={{ marginTop: 0 }}>Annual State Filings</h4>
                    <p>Black / 27 / 32"</p>
                    <p className="cart-item-price">$119.00</p>
                </div>
                <div className="cart-item-controls">
                    <Button className="remove-btn">Remove</Button>
                </div>
            </div>
            <div className="cart-item">
                <div className="cart-item-details">
                    <h4 style={{ marginTop: 0 }}>Business PayPal</h4>
                    <p>Denim blue / 25 / 32"</p>
                    <p className="cart-item-price">$138.00</p>
                </div>
                <div className="cart-item-controls">
                    <Button className="remove-btn">Remove</Button>
                </div>
            </div>


            <div className="subtotal-section">
                <div className="subtotal">
                    <span>Subtotal:</span>
                    <span>$257.00</span>
                </div>
                <p className="tax-info">Tax included. <span className="shipping-info">Shipping</span> calculated at checkout.</p>
                <a href="#" className="add-note">Add a note to your order</a>
                <Button variant="contained" className="checkout-btn">Place Order</Button>
            </div>
        </div>
    );
};

export default CartSummary;