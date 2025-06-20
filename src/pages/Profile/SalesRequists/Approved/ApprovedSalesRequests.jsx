import React, { useState, useEffect } from 'react';
import SingleApprovedSalesRequests from './SingleApprovedSalesRequests';

const ApprovedSalesRequests = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
     const getCategories = async () => {
       try {
         const response = await fetch(`${URL}/api/categories/`, {
           method: "GET",
           headers: { "Content-Type": "application/json" },
         });
         const data = await response.json();
         if (!response.ok) throw new Error(data.msg);
         setCategories(data);
         return { success: true };
       } catch (err) {
         return { success: false, error: err.message };
       }
     };
     getCategories();
   }, []);
  const [orders] = useState([
    {
      id: 1,
      userName: 'TOM SMITH',
      productName: 'Havic HV G-92 Gamepad',
      productDescription: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
      customerId :'1',
      orderId: 'HUJ8W3',
      orderDate: '18 Mar 2025',
      transactionId: 'TBFH173',
      paymentMethod: 'Credit Card',
      price: '192.00',
      customerOffer: '180.00',
      sellerOffer: '190',
      currency: '$',
      estimatedDelivery: '21 MAR 2025',
      productImage: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
      id: 2,
      userName: 'TOM SMITH',
      productName: 'Havic HV G-92 Gamepad',
      productDescription: 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
      orderId: 'HUJ8W3',
       customerId :'1',
      orderDate: '18 Mar 2025',
      transactionId: 'TBFH173',
      paymentMethod: 'Credit Card',
      price: '192.00',
      customerOffer: '180.00',
      sellerOffer: '190',
      currency: '$',
      estimatedDelivery: '21 MAR 2025',
      productImage: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    }
  ]);


  return (
   
        
        <div className="space-y-6">
          {orders.map(order => (
            <SingleApprovedSalesRequests 
            order={order} 
            setSelectedOrder={setSelectedOrder} 
            selectedOrder={selectedOrder}
            />
          ))}
        </div>
  );
};

export default ApprovedSalesRequests;
