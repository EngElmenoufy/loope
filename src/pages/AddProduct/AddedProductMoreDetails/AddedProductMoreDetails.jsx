export default function AddedProductMoreDetails({
  description,
  setDescription,
  category,
  setCagegory,
  brand,
  setBrand,
}) {
  return (
    <div>
      <h4>ADD DETAILS</h4>
      <textarea
        placeholder="DESCRIPTION"
        className="w-full border-b border-gray-200 bg-transparent p-2 focus:outline-none resize-none"
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="select-value"
        value={category}
        onChange={(e) => setCagegory(e.target.value)}
      >
        <option value="" disabled selected>
          SELECT CATEGORY
        </option>
        <option value="value-1">value-1</option>
        <option value="value-2">value-2</option>
        <option value="value-3">value-3</option>
        <option value="value-4">value-4</option>
        <option value="value-5">value-5</option>
        <option value="value-6">value-6</option>
        <option value="value-7">value-7</option>
      </select>

      <select
        className="select-value my-4"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="" disabled selected>
          SELECT BRAND
        </option>
        <option value="value-1">value-1</option>
        <option value="value-2">value-2</option>
        <option value="value-3">value-3</option>
        <option value="value-4">value-4</option>
        <option value="value-5">value-5</option>
        <option value="value-6">value-6</option>
        <option value="value-7">value-7</option>
      </select>
    </div>
  );
}
