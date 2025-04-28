import { useRef } from "react";

export default function AddFiles({ files, onImageUpload, onRemoveImage }) {
  const fileInputRef = useRef(null);

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-3">
        Upload up to 6 pictures/videos of the item
      </p>
      <input
        type="file"
        accept="image/*,video/*"
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
            Upload pictures/videos of the item
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
                {file.type === "video" ? (
                  <div className="relative w-full h-full">
                    <video
                      src={file.preview}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-1/4 h-1/4 bg-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="100%"
                        viewBox="0 -960 960 960"
                        width="100%"
                        fill="#191919"
                      >
                        <path d="M320-200v-560l440 280-440 280Z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img
                    src={file.preview}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
                {/* <img
                  src={image.preview}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                /> */}
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
        </div>
      )}
    </div>
  );
}
