import "./IconButton.css";

export default function IconButton({
  icon,
  onClick,
  disable,
  isRounded = true,
}) {
  return (
    // <button
    //   onClick={onClick}
    //   className={`bg-white hover:bg-[#ededed] shadow-lg rounded-full flex justify-center items-center transition-colors w-12 h-12 absolute ${icon.position === "left" || icon.position === "right" ? "top-1/2 -translate-y-1/2" : icon.position === "up" || icon.position === "down" ? "left-1/2 -translate-x-1/2" : "top-4"} ${icon.position === "left" ? "left-4" : icon.position === "up" ? "top-4" : icon.position === "down" ? "bottom-4" : "right-4"} ${disable ? "opacity-50 !cursor-not-allowed" : ""}`}
    // >
    //   <img src={icon.src} alt={icon.alt} className="w-2/3 h-2/3" />
    // </button>
    <button
      onClick={onClick}
      className={`btn-icon ${isRounded ? "icon-rounded" : "icon-button"} ${icon.position || ""} ${disable ? "disabled" : ""}`}
      disabled={disable}
    >
      <img src={icon.src} alt={icon.alt} className="icon-image" />
      {icon.label ? (
        <span className="text-white max-md:hidden">{icon.label}</span>
      ) : null}
    </button>
  );
}
