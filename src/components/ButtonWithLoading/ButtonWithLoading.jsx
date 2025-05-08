function ButtonWithLoading({ buttonName, isLoading, setIsLoading }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`flex justify-center py-2 px-4 border border-transparent rounded-md transition-all shadow-sm text-sm font-medium text-white bg-[#18403C] ${isLoading ? "" : "hover:bg-[#133330] hover:shadow-lg"}`}
    >
      {isLoading ? <div class="loader"></div> : buttonName}
    </button>
  );
}

export default ButtonWithLoading;
