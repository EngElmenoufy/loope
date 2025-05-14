import { Link } from "react-router-dom";

const SuccessMessage = () => {
  return (
    <div className="text-center py-4">
      <svg
        className="mx-auto h-12 w-12 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">Well Done!</h3>
      <p className="mt-1 text-sm text-gray-600">
        You successfully set a new password.
      </p>
      <Link
        to="/login"
        className="inline-block my-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#18403C] hover:bg-[#0e5b53] focus:outline-none"
      >
        Proceed to sign in
      </Link>
    </div>
  );
};

export default SuccessMessage;
