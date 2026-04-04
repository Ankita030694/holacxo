import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic Validation
    const { firstName, lastName, email, phoneNumber, companyName, pageUrl } = data;
    if (!firstName || !lastName || !email || !phoneNumber || !companyName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, "contacts"), {
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      pageUrl: pageUrl || "Unknown",
      submittedAt: serverTimestamp(),
    });

    return NextResponse.redirect(new URL("/thank-you", request.url), 303);
  } catch (error: any) {
    console.error("Firebase save error:", error);
    return NextResponse.json({ error: "Failed to save data. Please check your Firebase configuration and rules." }, { status: 500 });
  }
}
