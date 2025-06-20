import ApprovedSalesRequests from "./Approved/ApprovedSalesRequests";
import PendingSalesRequests from "./Pending/PendingSalesRequests"
import RejectedSalesRequests from "./Rejected/RejectedSalesRequests";
import React, { useState, useEffect } from "react";

function SalesRequests() {
    const [activeTab, setActiveTab] = useState('pending');

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

        {activeTab == 'pending' ? <PendingSalesRequests /> : ''}
        {activeTab == 'approved' ? <ApprovedSalesRequests /> : ''}
        {activeTab == 'rejected' ? <RejectedSalesRequests /> : ''}
    </main>
    </div>
    )
}

export default SalesRequests


