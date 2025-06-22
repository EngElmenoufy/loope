import { useNavigate, Link } from "react-router-dom";

function DropdownYourAccount({ user, onClose, onLogout }) {
  const navigate = useNavigate();

  function handleProfileNavigate() {
    navigate(`/profile/${user._id}`);
    onClose();
  }
  const handleAccountSettingsClick = () => {
    navigate("/account-settings");
    onClose();
  };
  const handleClickMyOrders = () => {
    navigate("/mysales");
    onClose();
  };

  const handleSalesRequestsClick = () => {
    navigate("/sales-requests");
    onClose();
  };

  const handleAddProduct = () => {
    navigate("/add");
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 w-64 bg-white rounded-md shadow-lg border border-gray-100 z-50">
      <div
        onClick={handleProfileNavigate}
        className="p-3 border-b flex items-center cursor-pointer hover:bg-gray-100"
      >
        <img
          src={
            user.avatar ===
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
              ? "../../../../public/profile.jpg"
              : user.avatar
          }
          alt="profile image"
          className="rounded-full w-10 h-10 mr-3"
        />
        <div>
          <div
            className="font-semibold max-w-44 text-nowrap overflow-hidden text-ellipsis"
            title={`${user.firstName} ${user.lastName}`}
          >
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-600">View your profile</div>
        </div>
      </div>

      <div className="py-2">
        {user.role === "seller" ? (
          <>
            <button
              onClick={handleClickMyOrders}
              className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
            >
              {/* <Gift size={18} className="mr-3" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Z" />
              </svg>
              <span>My Sales</span>
            </button>
            <button
              onClick={handleSalesRequestsClick}
              className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
            >
              {/* <Gift size={18} className="mr-3" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z" />
              </svg>
              <span>My Sales Requests</span>
            </button>
            <button
              onClick={handleAddProduct}
              className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
            >
              {/* <Gift size={18} className="mr-3" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
              <span>Add Product</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleClickMyOrders}
              className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
            >
              {/* <Gift size={18} className="mr-3" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Z" />
              </svg>
              <span>My Purchases</span>
            </button>
            <button
              onClick={handleSalesRequestsClick}
              className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
            >
              {/* <Gift size={18} className="mr-3" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#18403c"
              >
                <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z" />
              </svg>
              <span>My Purchases Requests</span>
            </button>
          </>
        )}
      </div>

      <div className="border-t border-gray-200 py-2">
        <button
          className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
          onClick={handleAccountSettingsClick}
        >
          {/* <Settings size={18} className="mr-3" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#18403c"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
          </svg>
          <span>Account settings</span>
        </button>
        <button
          className="flex items-center w-full px-4 py-3 gap-2 hover:bg-gray-100"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          {/* <LogOut size={18} className="mr-3" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#18403c"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}

export default DropdownYourAccount;
