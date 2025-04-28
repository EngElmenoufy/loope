function Filters({ isOpen, onClose }) {
  return (
    <aside className={`drawer ${isOpen ? "open" : ""}`}>
      {/* Close button */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold mb-4">Filters</h3>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
          >
            ✖
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 border rounded"
              />
            </div>
          </div>

          <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Filters;
