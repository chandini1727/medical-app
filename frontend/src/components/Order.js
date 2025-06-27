import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/medicines');
        setMedicines(res.data);
      } catch (err) {
        setError('Failed to fetch medicines');
      }
    };
    fetchMedicines();
  }, []);

  const addToCart = (medicine) => {
    setCart([...cart, { medicine: medicine._id, quantity: 1 }]);
  };

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Please login first');
    const total = cart.reduce((sum, item) => sum + medicines.find(m => m._id === item.medicine).price * item.quantity, 0);
    try {
      const res = await axios.post('http://localhost:5000/api/orders', { medicines: cart, total }, {
        headers: { 'x-auth-token': token }
      });
      setCart([]);
      alert('Order placed successfully!');
    } catch (err) {
      setError(err.response.data.msg || 'Order failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Medicines</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {medicines.map(medicine => (
          <div key={medicine._id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={medicine.image} alt={medicine.name} style={{ width: '100%' }} />
            <h3>{medicine.name}</h3>
            <p>${medicine.price}</p>
            <button onClick={() => addToCart(medicine)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      {cart.map((item, index) => {
        const medicine = medicines.find(m => m._id === item.medicine);
        return (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{medicine.name}</h3>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
            />
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        );
      })}
      <button onClick={placeOrder} disabled={cart.length === 0}>Place Order</button>
    </div>
  );
};

export default Order;