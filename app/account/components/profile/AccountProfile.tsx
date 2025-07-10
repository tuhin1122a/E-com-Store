"use client";

import { Card } from "@/components/ui/card";

import { useUser } from "@/context/UserContext";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";

export default function AccountProfile() {
  const { userData, loading, updateUser } = useUser();

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    return <p>User data not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <ProfileAvatar user={userData} updateUserData={updateUser} />
      </Card>

      <Card>
        <ProfileForm user={userData} updateUserData={updateUser} />
      </Card>
    </div>
  );
}
