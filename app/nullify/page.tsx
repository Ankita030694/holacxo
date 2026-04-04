import { Metadata } from "next";
import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Authority Portal | HolaCXO",
  description: "Secure access for HolaCXO administrators",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginContent />;
}
