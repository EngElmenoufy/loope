import { useState } from "react";
import AccountPassword from "./AccountPassword";
import AccountEmail from "./AccountEmail";
import AccountDetails from "./AccountDetails";
import NotificationSettings from "./NotificationSettings";
import SavedAddresses from "./SavedAddresses";

export default function AccountSettings() {
  const [userData, setUserData] = useState({
    fName: "Mahmoud",
    lName: "Elmenoufy",
    birthday: "4-7-2003",
    phone: "012345678910",
    email: "mahmoudmoelmenoufy@gmail.com",
    password: "12345678",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <AccountDetails userData={userData} />

        <SavedAddresses />

        <AccountPassword />

        <AccountEmail email={userData.email} />

        <NotificationSettings />
      </div>
    </div>
  );
}
