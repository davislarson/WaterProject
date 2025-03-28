import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((acc, item) => acc + item.donationAmount, 0);

  return (
    <div>
      <h2>YOUR CART</h2>

      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="list-unstyled">
            {cart.map((item: CartItem) => (
              <li key={item.projectId}>
                <h3>{item.projectName}</h3>
                <p>Donation Amount: ${item.donationAmount.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.projectId)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: {totalAmount.toFixed(2)} </h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/')}>Continue Browsing</button>
    </div>
  );
}
