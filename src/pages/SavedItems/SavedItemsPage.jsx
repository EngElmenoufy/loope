import { useState } from 'react';
import { Heart, ShoppingBag, Trash2, MessageCircle, X } from 'lucide-react';

export default function SavedItemsPage({favoriteProducts, setFavoriteProducts, addOrRemoveFavorite, addToCart}) {


  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [offerPrice, setOfferPrice] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
console.log(favoriteProducts)
  
 

  // Function to move item to shopping bag
  const moveToShoppingBag = (item) => {
    // In a real app, this would call an API to update the cart
    // For demo purposes, we'll just show a notification
    addNotification(`${item.productId?.name} added to your shopping bag!`);
    console.log(item.productId?._id, item.productId?.sellerId)
    // Remove from favorites
    setFavoriteProducts(favoriteProducts.filter(fav => fav.productId?._id !== item.id));
    addToCart(item.productId?._id, item.productId?.sellerId, 1)
  };

  // Function to remove item from favorites
  const removeFromFavorites = (itemId) => {
    setFavoriteProducts(favoriteProducts?.filter(fav => fav.productId?._id !== itemId));
    addNotification("Item removed from favorites");
    addOrRemoveFavorite(itemId, true)
  };

  // Function to open offer modal
  const openOfferModal = (item) => {
    setCurrentItem(item);
    setOfferPrice("");
    setMessage("");
    setOfferModalOpen(true);
  };

  // Function to submit an offer
  const submitOffer = () => {
    // In a real app, this would send the offer to an API
    addNotification(`Offer of $${offerPrice} sent to ${currentItem.productId?.sellerId} for ${currentItem.productId?.name}`);
    setOfferModalOpen(false);
  };

  // Function to add a notification
  const addNotification = (text) => {
    const newNotification = {
      id: Date.now(),
      text
    };
    setNotifications([...notifications, newNotification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(current => current.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // Empty state component
  const EmptyFavorites = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Heart size={64} className="text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Your favorites list is empty</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Items you save will appear here. Find products you love and click the heart icon to save them for later.
      </p>
      <button className="bg-primary-green text-white px-6 py-2 rounded-md hover:bg-primary-hover">
        Explore Products
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between">
            <span>{notification.text}</span>
            <button 
              onClick={() => setNotifications(notifications.filter(n => n.id !== notification.id))}
              className="ml-4 text-gray-300 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
        <div className="text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
          {favoriteProducts?.length} {favoriteProducts?.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Content */}
      {favoriteProducts?.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <div className="bg-white rounded-lg shadow">
          {/* Items grid for medium and large screens */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {favoriteProducts?.map(item => (
              <div key={item.productId?._id} className="border border-gray-200 rounded-lg p-4 flex flex-col h-full">
                {/* Product header with image and remove button */}
                <div className="relative mb-4">
                  <div className="flex justify-center">
                    <img src={item.productId?.img[0]} alt={item.productId?.name} className="h-48 object-cover rounded-md" />
                  </div>
                  <button 
                    onClick={() => removeFromFavorites(item.productId?._id)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                {/* Product info */}
                <div className="flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold mb-1">{item.productId?.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">Sold by: </p>
                  <p className="font-semibold text-lg mb-4">${item.productId?.price}</p>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => moveToShoppingBag(item)}
                      disabled={item.inStock}
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md w-full ${
                        item.productId?.stock_quantity
                          ? 'bg-primary-green text-white hover:bg-primary-vover' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag size={18} />
                      {item.productId?.stock_quantity ? 'Add to Bag' : 'Out of Stock'}
                    </button>
                    
                    <button
                      onClick={() => openOfferModal(item)}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 w-full"
                    >
                      <MessageCircle size={18} />
                      Make Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Items list for small screens */}
          <div className="md:hidden divide-y divide-gray-200">
            {favoriteProducts?.map(item => (
              <div key={item.productId?._id} className="p-4 flex flex-col sm:flex-row gap-4">
                {/* Product image */}
                <div className="flex-shrink-0">
                  <img src={item.productId?.img[0]} alt={item.productId?.name} className="w-full sm:w-32 h-40 object-cover rounded-md" />
                </div>
                
                {/* Product info */}
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">{item.productId?.name}</h2>
                    <button 
                      onClick={() => removeFromFavorites(item.productId?._id)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-2">Sold by: {item.productId?.sellerId}</p>
                  <p className="font-semibold text-lg mb-4">${item.productId?.price}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <button
                      onClick={() => moveToShoppingBag(item)}
                      disabled={!item.productId?.stock_quantity}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        item.inStock 
                          ? 'bg-primary-green text-white hover:bg-primary-hover' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag size={18} />
                      {item.productId?.stock_quantity} ? 'Add to Bag' : 'Out of Stock'}
                    </button>
                    
                    <button
                      onClick={() => openOfferModal(item)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <MessageCircle size={18} />
                      Make Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {offerModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Backdrop with blur */}
          {/* <div className="fixed inset-0 backdrop-blur-0" onClick={()=>setOfferModalOpen(false)}></div> */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Make an Offer</h3>
              <button 
                onClick={() => setOfferModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <img src={currentItem.productId?.img[0]} alt={currentItem.productId?.name} className="w-16 h-20 object-cover rounded-md" />
                <div>
                  <h4 className="font-medium">{currentItem.productId?.name}</h4>
                  <p className="text-gray-600">Listed price: ${currentItem.productId?.price}</p>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Offer (EGP)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      id="offerPrice"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      className="pl-8 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:bg-primary-hover focus:border-primary-green"
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
                
                {/* <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message to Seller (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:bg-primary-hover focus:border-primary-green"
                    rows="3"
                    placeholder="Tell the seller why you're making this offer..."
                    style={{minHeight: '70px', maxHeight: '150px',}}
                  ></textarea>
                </div> */}
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOfferModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitOffer}
                    className="px-4 py-2 bg-primary-green text-white rounded-md hover:bg-primary-hover"
                  >
                    Send Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}