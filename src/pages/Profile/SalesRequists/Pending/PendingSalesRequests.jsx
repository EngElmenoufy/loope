import React, { useState, useEffect } from 'react';
import SinglePendingSalesRequests from './SinglePendingSalesRequest';

const PendingSalesRequest = () => {
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
    <div className="min-h-screen">
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SALES REQUESTS</h1>
        </div>
        
        <div className="mb-6 border-b">
          <div className="flex">
            <button 
              className={`px-6 py-2 font-medium ${activeTab === 'pending' ? 'border-b-2 border-primary-green text-primary-green' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pending')}
            >
              PENDING
            </button>
            <button 
              className={`px-6 py-2 font-medium ${activeTab === 'rejected' ? 'border-b-2 border-primary-green text-primary-green' : 'text-gray-600'}`}
              onClick={() => setActiveTab('rejected')}
            >
              REJECTED
            </button>
            <button 
              className={`px-6 py-2 font-medium ${activeTab === 'approved' ? 'border-b-2 border-primary-green text-primary-green' : 'text-gray-600'}`}
              onClick={() => setActiveTab('approved')}
            >
              APPROVED
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {orders.map(order => (
            <SinglePendingSalesRequests 
            order={order} 
            setSelectedOrder={setSelectedOrder} 
            selectedOrder={selectedOrder}
            />
          ))}
        </div>
      </main>
      
    </div>
  );
};

export default PendingSalesRequest;
