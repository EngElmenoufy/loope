import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Ongoing_Sales/OngoingSales.css'
import SinglePastSale from './SinglePastSale';
import NoSales from '../NoSales';
const PastSales = ({activeTab, setActiveTab}) => {
  
  const [order] = useState({
    
 id: 1,
    userName: 'TOM SMITH',
    productName: 'Havic HV G-92 Gamepad',
    productDescription: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
    orderId: 'HUJ8W3',
    orderDate: '18 Mar 2025',
    transactionId: 'TBFH173',
    paymentMethod: 'Credit Card',
    price: '192.00',
    currency: '$',
    estimatedDelivery: '21 MAR 2025',
    productImage: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    status: 'ordered',
    statusHistory: [
      {
        status: 'ordered',
        date: '18 March 2025, 8:38 PM',
        completed: true
      },
      {
        status: 'shipped',
        date: '20 March 2025',
        completed: false
      },
      {
        status: 'dispatched',
        date: '20 March 2025',
        completed: false
      },
      {
        status: 'on the way',
        date: '21 March 2025',
        completed: false
      },
      {
        status: 'delivered',
        date: '21 March 2025',
        completed: false
      }
    ]
  });

  
  return (
     <>
      {activeTab=='past' && order && Object.keys(order).length !== 0 &&  
        <div className="grid [grid-template-rows:repeat(auto-fit,_minmax(min-content,_1fr))] gap-10">
            <SinglePastSale order={order} />
            <SinglePastSale order={order} />
            <SinglePastSale order={order}/>
            <SinglePastSale order={order}/>
        </div> 
      } 
      {
        activeTab=='past' && (order==null || Object.keys(order).length === 0) && 
        <NoSales>
          <h2>You haven’t sold anything yet</h2>
        </NoSales>
      }
    </>
           
  );
};

export default PastSales;





