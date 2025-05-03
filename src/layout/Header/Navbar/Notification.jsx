function Notification() {
  return (
    <div className="flex gap-3 border-b border[#E1E2DE]  p-2">
      <img src="profile-image.avif" alt="profile" className="w-10 h-10" />
      <div className="flex gap-3">
        <div>
          <p className="text-sm leading-4 text-[#0E150E] mb-2">
            50% OFF of everything at Elegance
          </p>
          <p className="text-[#9FAAA6] text-xs font-medium">15 Oct</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#18403C"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </div>
    </div>
  );
}

export default Notification;
