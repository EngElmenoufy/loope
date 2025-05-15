import React, { useState } from 'react';
import { X } from 'lucide-react';



export const Star = ({ filled, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer ${
        filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const ReviewModal = ({ isOpen, onClose, product, setRating, setReview, rating, review}) => {
 
    const[temporaryRating, setTemporaryRating]= useState(0);
    const handleSubmit = ()=>{
        setRating(temporaryRating);
     
        onClose();
    }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* BreadCrumb */}
        <div
        className="fixed inset-0 bg-black/50 backdrop-blur-0"
        onClick={onClose}
        ></div>

      <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-5 pt-6 relative">
        <div className="flex items-center mb-4" >
          <button onClick={onClose} className="absolute left-4 top-4">
            <X className="h-6 w-6 text-gray-500" />
          </button>
          <h2 className="text-xl font-medium mx-auto">Leave a review</h2>
        </div>

        <div className="flex items-center space-x-3 my-5">
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
            {product.userImage && (
              <img src={product.userImage} alt="User" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <div className="font-bold">{product.username}</div>
            <div className="text-gray-500">{product.location}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-5">
          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
            {product.image && (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <div className="font-bold uppercase">{product.name}</div>
            <div className="text-gray-600">{product.variant}</div>
            <div className="text-gray-600">{product.price}</div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-center uppercase font-medium mb-3">What is your rate?</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= temporaryRating}
                onClick={() => setTemporaryRating(star)}
              />
            ))}
          </div>
          
        </div>
      
       
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Your review"
          className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none mb-5 focus:outline-none focus:ring-1 focus:ring-green-700"
              
        />

        <button
          type='submit'
          onClick={handleSubmit}
          className="w-full bg-primary-green hover:bg-[#174e47] text-white py-3 rounded-md font-medium mb-3"
        >
          MARK AS DONE
        </button>
        <button
          onClick={onClose}
          className="w-full border border-gray-300 hover:bg-gray-100 text-gray-600 py-3 rounded-md font-medium"
        >
          SKIP
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
