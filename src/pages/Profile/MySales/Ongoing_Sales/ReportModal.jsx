import React from "react";

const ReportModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-0"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="z-50 bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-4 right-3 text-gray-500 hover:text-red-700"
          onClick={onClose}
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>

          {children}
          <form action="">
            <label htmlFor="issue">Enter your issue: </label>
            <textarea 
            name="issue" 
            id="issue" 
            className="resize-y mt-5 p-2 rounded-md block bg-[#F5F5F5] w-full max-h-64 min-h-32" 
            rows={8}
            required
            >
            </textarea>
            <button 
            className="bg-primary-green text-white inline-block p-2 mt-5 rounded-md hover:bg-[#174e47]"
            >
                Send
            </button>
          </form>
      </div>
    </div>
  );
};

export default ReportModal;