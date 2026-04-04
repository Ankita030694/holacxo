import { Metadata } from "next";
import AuthorityLayoutContent from "./AuthorityLayoutContent";

export const metadata: Metadata = {
  title: "Authority Dashboard | HolaCXO",
  description: "Secure administration panel for HolaCXO",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthorityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthorityLayoutContent>{children}</AuthorityLayoutContent>;
}
