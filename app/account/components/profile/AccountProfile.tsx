"use client";

import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";

type UserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  // অন্যান্য ফিল্ড থাকলে এখানে যুক্ত করো
};

export default function AccountProfile() {
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();

        setUserData(data.data); // ধরে নিচ্ছি response এ user অবজেক্ট আছে
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [accessToken]);

  if (status === "loading" || loading) {
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    return <p>User data not found.</p>;
  }

  //udpate userData
  const updateUserData = async (updatedData: Partial<UserData>) => {
    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/update`,
        {
          method: "PUT", // or "PATCH", depending on your backend
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) throw new Error("Failed to update user data");

      const data = await res.json();
      console.log("User data updated:", data);
      setUserData(data.data); // response structure অনুযায়ী adjust করতে হবে
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <ProfileAvatar
          user={userData}
          setUserData={setUserData}
          updateUserData={updateUserData}
        />
      </Card>

      <Card>
        <ProfileForm
          user={userData}
          updateUserData={updateUserData}
          setUserData={setUserData}
        />
      </Card>
    </div>
  );
}
