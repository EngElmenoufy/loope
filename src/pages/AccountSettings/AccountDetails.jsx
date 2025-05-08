import Button from "../../components/Button/Button";

function AccountDetails({ userData }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Account Details
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold">First Name</h3>
          <p className="text-gray-600">{userData.fName}</p>
        </div>

        <div>
          <h3 className="text-base font-semibold">Last Name</h3>
          <p className="text-gray-600">{userData.lName}</p>
        </div>

        <div>
          <h3 className="text-base font-semibold">Birthday</h3>
          <p className="text-gray-600">{userData.birthday}</p>
        </div>

        <div>
          <h3 className="text-base font-medium">Phone</h3>
          <p className="text-gray-600">{userData.phone}</p>
        </div>

        <Button
          type="main"
          text="Edit Profile"
          otherClass="!capitalize !w-fit !text-sm"
        />
      </div>
    </div>
  );
}

export default AccountDetails;
