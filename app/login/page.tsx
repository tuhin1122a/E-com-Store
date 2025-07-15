import LoginForm from "./components/LoginForm";

export const metadata = {
  title: "Sign In - EcomStore",
  description: "Access your EcomStore account to continue shopping.",
  openGraph: {
    title: "Sign In - EcomStore",
    description: "Secure login to your EcomStore account.",
    url: "https://yourdomain.com/login",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign In - EcomStore",
    description: "Login to your EcomStore profile.",
  },
  robots: "index, follow",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
