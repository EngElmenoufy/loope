import React, { useState } from "react";
import ButtonWithLoading from "../../../../components/ButtonWithLoading/ButtonWithLoading";

const ReportModal = ({
  isOpen,
  onClose,
  children,
  setShowSuccessReport,
  setHideReport,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handleCloseReport = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const timer = setTimeout(() => {
      onClose();
      setShowSuccessReport(true);
      setIsLoading(false);
      setHideReport(true);

      const timer2 = setTimeout(() => {
        setShowSuccessReport(false);
      }, 5000);
      return () => clearTimeout(timer2);
    }, 3000);
    return () => clearTimeout(timer);
  };

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
        <form>
          <label htmlFor="issue">Enter your issue: </label>
          <textarea
            name="issue"
            id="issue"
            className="resize-y mt-5 p-2 rounded-md block bg-[#F5F5F5] w-full max-h-64 min-h-32"
            rows={8}
            required
          ></textarea>
          <ButtonWithLoading
            buttonName={"Send"}
            isLoading={isLoading}
            onLoading={handleCloseReport}
            otherClass="mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
