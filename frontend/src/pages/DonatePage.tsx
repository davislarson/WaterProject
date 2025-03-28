import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

export default function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectId} = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || '',
      donationAmount: Number(donationAmount) || 0,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder='Enter donation amount'
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        />
        <br />
        <br />
        <button onClick={handleAddToCart}>Add to Cart</button>
        <br />
        <br />
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}
