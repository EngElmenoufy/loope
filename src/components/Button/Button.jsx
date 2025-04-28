import "./Button.css";

function Button({ type, text, otherClass, onClick }) {
  return (
    <button
      className={`${type === "main" ? "main-button" : "second-button"} ${otherClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
