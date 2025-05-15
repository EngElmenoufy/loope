import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OngoingSales from "./Ongoing_Sales/OngoingSales";
import PastSales from './Past_Sales/PastSales';

function MySalesPage() {
    const [activeTab, setActiveTab] = useState('ongoing');
    
    return (
       <div className="min-h-screen" >
      <main className="container mx-auto px-4 py-8" >
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">My Sales</h1>
          </div>
          <div className="flex rounded-md overflow-hidden">
            <button 
              className={`px-8 py-2 ${activeTab === 'ongoing' ? `bg-primary-green text-white` : 'bg-gray-100'}`}
              onClick={() => setActiveTab('ongoing')}
            >
              ONGOING
            </button>
            <button 
              className={`px-8 py-2 ${activeTab === 'past' ? 'bg-primary-green text-white' : 'bg-gray-100'}`}
              onClick={() => setActiveTab('past')}
            >
              PAST
            </button>
          </div>
        </div>
        
           {(activeTab=='ongoing')&& <OngoingSales activeTab={activeTab} setActiveTab={setActiveTab}/>}
           {(activeTab=='past')&& <PastSales activeTab={activeTab} setActiveTab={setActiveTab}/>}
        </main>
    </div>
    )
}

export default MySalesPage
