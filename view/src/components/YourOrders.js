import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../assets/css/YourOrders.css';

const YourOrders = () => {
  // Mock data for orders - replace with actual API call later
  const orders = [
    {
      id: '#ORD123456',
      date: '2025-09-10',
      total: 299.99,
      status: 'Delivered',
      items: [
        {
          name: 'Smart Home Hub',
          quantity: 1,
          price: 199.99,
          image: require('../assets/images/tech-and-gadgets.jpg')
        },
        {
          name: 'Eco-Friendly Water Bottle',
          quantity: 2,
          price: 49.99,
          image: require('../assets/images/self-care.jpg')
        }
      ]
    },
    {
      id: '#ORD123457',
      date: '2025-09-05',
      total: 159.99,
      status: 'In Transit',
      items: [
        {
          name: 'Modern Wall Clock',
          quantity: 1,
          price: 159.99,
          image: require('../assets/images/home-decor.jpg')
        }
      ]
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
      <div className="your-orders-container">
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <div className="order-meta">
                    <span className="order-id">Order {order.id}</span>
                    <span className="order-date">Placed on {formatDate(order.date)}</span>
                  </div>
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="amount">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="item-meta">
                        <span>Qty: {item.quantity}</span>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-actions">
                <button className="btn-track">Track Order</button>
                <button className="btn-reorder">Buy Again</button>
              </div>
            </div>
          ))}
        </div>
     
     
    </div>
  );
};

export default YourOrders;
