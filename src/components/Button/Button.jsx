import "./Button.css";

function Button({ type, text, otherClass, onClick }) {
  return (
    <button
      className={`shadow-sm rounded-md transition-all duration-300 hover:shadow-lg py-2 px-4 ${type === "main" ? "main-button" : "second-button"} ${otherClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
