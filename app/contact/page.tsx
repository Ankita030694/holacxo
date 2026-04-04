import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | B2B GTM Strategy Consultation",
  description: "Ready to scale your enterprise pipeline? Contact HolaCXO today for a 30-minute GTM strategy consultation and learn how to close deals in 90 days.",
  alternates: {
    canonical: "https://www.holacxo.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
