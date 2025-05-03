import Notification from "./Notification";

function DropdownYourAccount() {
  return (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50 pt-2">
      <h5 className="text-center text-[#184033] mb-4">Notifications</h5>

      <div className="h-96 overflow-y-auto">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
}

export default DropdownYourAccount;
