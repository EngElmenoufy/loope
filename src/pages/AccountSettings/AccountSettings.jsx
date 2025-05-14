import { useState } from "react";
import AccountPassword from "./AccountPassword";
import AccountEmail from "./AccountEmail";
import AccountDetails from "./AccountDetails";
import NotificationSettings from "./NotificationSettings";
import SavedAddresses from "./SavedAddresses";

export default function AccountSettings({
  user,
  onUpdateUserData,
  error,
  successMessage,
  isLoading,
}) {
  // const [userData, setUserData] = useState({
  //   fName: "Mahmoud",
  //   lName: "Elmenoufy",
  //   birthday: "4-7-2003",
  //   phone: "012345678910",
  //   email: "mahmoudmoelmenoufy@gmail.com",
  //   password: "12345678",
  // });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <AccountDetails
          user={user}
          onSubmit={onUpdateUserData}
          formError={error.accountDetails}
          successMessage={successMessage.accountDetails}
          isLoading={isLoading.accountDetails}
        />

        <SavedAddresses
          user={user}
          onSubmit={onUpdateUserData}
          formError={error.address}
          successMessage={successMessage.address}
          isLoading={isLoading.address}
        />

        <AccountPassword
          user={user}
          onSubmit={onUpdateUserData}
          formError={error.password}
          successMessage={successMessage.password}
          isLoading={isLoading.password}
        />

        <AccountEmail
          user={user}
          onSubmit={onUpdateUserData}
          formError={error.email}
          successMessage={successMessage.email}
          isLoading={isLoading.email}
        />

        <NotificationSettings />
      </div>
    </div>
  );
}
