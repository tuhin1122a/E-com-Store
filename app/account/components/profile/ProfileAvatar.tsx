// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Camera, Save } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useRef, useState } from "react";

// interface ProfileAvatarProps {
//   user: {
//     firstName: string;
//     lastName: string;
//     avatarUrl?: string;
//   };
//   setUserData: (data: any) => void;
//   updateUserData: (updatedData: Partial<any>) => Promise<void>;
// }

// export default function ProfileAvatar({
//   user,
//   updateUserData,
// }: ProfileAvatarProps) {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
//   const { data: session } = useSession();
//   const accessToken = session?.user?.accessToken;

//   const handleChangePhotoClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");

//       const data = await res.json();
//       const avatarUrl = data.url || data.data?.url;

//       if (avatarUrl) {
//         setNewAvatarUrl(avatarUrl);
//       } else {
//         throw new Error("No URL returned from upload");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Failed to upload image. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveAvatar = async () => {
//     if (!newAvatarUrl) return;

//     try {
//       await updateUserData({ avatarUrl: newAvatarUrl }););

//       setNewAvatarUrl(null); // clear preview
//     } catch (error) {
//       console.error("Avatar update failed:", error);
//       alert("Failed to save avatar. Please try again.");
//     }
//   };

//   const previewUrl = newAvatarUrl || user?.avatarUrl || "/placeholder.svg";

//   return (
//     <>
//       <CardHeader>
//         <CardTitle>Profile Picture</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex items-center gap-6">
//           <Avatar className="h-24 w-24">
//             <AvatarImage src={previewUrl} alt={user?.firstName} />
//             <AvatarFallback className="text-2xl">
//               {user?.firstName?.charAt(0)}
//               {user?.lastName?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>

//           <div>
//             <input
//               type="file"
//               accept="image/png, image/jpeg, image/gif"
//               className="hidden"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               disabled={uploading}
//             />

//             <div className="flex items-center gap-2 mb-2">
//               <Button
//                 variant="outline"
//                 onClick={handleChangePhotoClick}
//                 disabled={uploading}
//               >
//                 <Camera className="h-4 w-4 mr-2" />
//                 {uploading ? "Uploading..." : "Change Photo"}
//               </Button>

//               {newAvatarUrl && (
//                 <Button
//                   variant="default"
//                   onClick={handleSaveAvatar}
//                   disabled={uploading}
//                 >
//                   <Save className="h-4 w-4 mr-2" />
//                   Save Photo
//                 </Button>
//               )}
//             </div>

//             <p className="text-sm text-muted-foreground">
//               JPG, PNG or GIF. Max size 2MB.
//             </p>
//           </div>
//         </div>
//       </CardContent>
//     </>
//   );
// }
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext"; // ✅ useUser context import
import { Camera, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

export default function ProfileAvatar() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);

  const { userData, updateUser } = useUser(); // ✅ from context
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !accessToken) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const avatarUrl = data.url || data.data?.url;

      if (avatarUrl) {
        setNewAvatarUrl(avatarUrl);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAvatar = async () => {
    if (!newAvatarUrl) return;

    try {
      const success = await updateUser({ avatarUrl: newAvatarUrl });
      if (success) {
        setNewAvatarUrl(null); // clear preview
      } else {
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
    }
  };

  const previewUrl = newAvatarUrl || userData?.avatarUrl || "/placeholder.svg";

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewUrl} alt={userData?.firstName} />
            <AvatarFallback className="text-2xl">
              {userData?.firstName?.charAt(0)}
              {userData?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={uploading}
            />

            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="outline"
                onClick={handleChangePhotoClick}
                disabled={uploading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {uploading ? "Uploading..." : "Change Photo"}
              </Button>

              {newAvatarUrl && (
                <Button onClick={handleSaveAvatar} disabled={uploading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Photo
                </Button>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              JPG, PNG, or GIF. Max size 2MB.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
}
