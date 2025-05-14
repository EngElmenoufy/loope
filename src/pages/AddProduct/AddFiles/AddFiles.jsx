import { useRef } from "react";

export default function AddFiles({
  files,
  onImageUpload,
  onRemoveImage,
  error,
}) {
  const fileInputRef = useRef(null);

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-3">
        Upload up to 6 pictures of the product
      </p>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={onImageUpload}
      />

      {files.length === 0 ? (
        <div
          className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="bg-gray-100 rounded-lg p-4 mb-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Upload pictures of the product
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-lg aspect-square shadow-md"
              >
                <img
                  src={file.preview}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                  onClick={() => onRemoveImage(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#191919"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
            ))}
            {files.length < 6 && (
              <div
                className="flex items-center justify-center bg-white rounded-lg aspect-square cursor-pointer shadow-md"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30px"
                    viewBox="0 -960 960 960"
                    width="30px"
                    fill="#191919"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center">
            {files.length}/6 files uploaded
          </p>
          {error && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM6.5999 3.00002C6.5999 2.77901 6.42091 2.60002 6.1999 2.60002C5.97889 2.60002 5.7999 2.77901 5.7999 3.00002V6.00002C5.7999 6.22103 5.97889 6.40002 6.1999 6.40002C6.42091 6.40002 6.5999 6.22103 6.5999 6.00002V3.00002ZM6.1999 8.40002C6.64173 8.40002 6.9999 8.04185 6.9999 7.60002C6.9999 7.15819 6.64173 6.80002 6.1999 6.80002C5.75807 6.80002 5.3999 7.15819 5.3999 7.60002C5.3999 8.04185 5.75807 8.40002 6.1999 8.40002Z"
                  fill="#E14627"
                />
              </svg>
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
