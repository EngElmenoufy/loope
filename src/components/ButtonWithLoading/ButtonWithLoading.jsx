function ButtonWithLoading({ buttonName, isLoading, onLoading, otherClass }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      onClick={onLoading}
      className={`flex justify-center py-2 px-4 border border-transparent rounded-md transition-all shadow-sm text-sm font-medium text-white bg-[#18403C] ${isLoading ? "" : "hover:bg-[#133330] hover:shadow-lg"} ${otherClass}`}
    >
      {isLoading ? <div class="loader"></div> : buttonName}
    </button>
  );
}

export default ButtonWithLoading;
