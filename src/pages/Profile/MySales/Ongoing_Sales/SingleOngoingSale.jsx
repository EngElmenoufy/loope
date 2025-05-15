import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReportModal from './ReportModal';

function SingleOngoingSale({order}) {
    const [trackOrder, setTrackOrder] = useState(false); 
    const [isReportOpen, setIsReportOpen] = useState(false);
    const handleTracking = ()=>{
    setTrackOrder(!trackOrder);
    }
    const handleRporting = ()=>{
        setIsReportOpen(!isReportOpen);
    }
    return (
          <div className="card rounded-md">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img src={order.userAvatar} alt={order.userName} className="h-full w-full object-cover" />
            </div>
            <h2 className="text-xl font-bold">{order.userName}</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img 
                src={order.productImage} 
                alt={order.productName} 
                className="w-full rounded-md"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{order.productName}</h2>
              <p className="text-gray-700 mb-4">{order.productDescription}</p>
              
              <div className="space-y-1 mb-4 text-xl">
                <p><span className='font-bold'>Order ID:</span> <span>{order.orderId}</span> </p>
                <p><span className='font-bold'>Order Date:</span> <span >{order.orderDate}</span> </p>
                <p><span className='font-bold'>Transaction ID:</span> <span >{order.transactionId}</span> </p>
                <p><span className='font-bold'>Payment:</span> <span >{order.paymentMethod}</span> </p>
                <p> <span className="text-[#020817] text-lg font-bold">Price: {order.price} {order.currency}</span></p>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="font-medium text-lg"> <span className="font-bold">SHIPPING ADDRESS:</span> <span>12 street, Tanta, Egypt</span></p>
                </div>
                <div>
                  <p className="font-medium"> <span className="font-bold">ESTIMATED DELIVERY:</span> {order.estimatedDelivery}</p>
                </div>
              </div>
              {
                trackOrder==false ?
              <button 
              className="bg-primary-green text-white inline-block p-2 rounded-md hover:bg-[#174e47]"
              onClick={handleTracking}
              >
                Track Order
              </button>
              :
              <button
              
              className="bg-red-700 text-white inline-block p-2 rounded-md hover:bg-red-600"
              onClick={handleTracking}
              >
                Exit
              </button>
              }
            </div>
          </div>
          {
          ( trackOrder===true) &&
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Status</h3>
            
            <div className="relative mt-10">
              {/* Status line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
              
              {/* Status points */}
              <div className="flex justify-between relative z-10">
                {order.statusHistory.map((status, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center mb-2 
                      ${status.completed ? 'bg-primary-green border-primary-green' : 'bg-white border-gray-300'}`}
                    >
                      {status.completed && (
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <p className="capitalize font-medium text-center">{status.status}</p>
                    <p className="text-xs text-gray-500 text-center">{status.date}</p>
                  </div>
                ))}
              </div>
            </div>
            
          <div className="mt-10">
            <button 
            className={`bg-primary-green text-white w-full md:w-auto inline-block py-2 px-3 rounded-md hover:bg-[#174e47]`}
            onClick={handleRporting}
            >
              REPORT AN ISSUE
            </button>
          </div>
          </div>
}
            <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Report about order with ID: {order.orderId}</h2>
            </ReportModal>
        </div>
      
    )
};

export default SingleOngoingSale;
