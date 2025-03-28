import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


export default function CartSummary() {
  const navigate = useNavigate();
  const cart = useCart();
  const totalAmount = cart.cart.reduce((acc, item) => acc + item.donationAmount, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒 <strong>{totalAmount.toFixed(2)}</strong>
    </div>
  );
}
