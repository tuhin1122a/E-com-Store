"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-md border hover:shadow-lg transition bg-white text-gray-700"
    >
      <FcGoogle size={20} />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
}
