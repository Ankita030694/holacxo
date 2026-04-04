import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  startAfter, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  Timestamp,
  arrayUnion
} from "firebase/firestore";

// Verify ID Token on the server
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  
  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return decodedToken;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const limitCount = parseInt(searchParams.get("limit") || "50");
    const lastId = searchParams.get("lastId");

    let q;
    if (lastId) {
      const lastDoc = await getDoc(doc(db, "contacts", lastId));
      q = query(
        collection(db, "contacts"),
        orderBy("submittedAt", "desc"),
        startAfter(lastDoc),
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, "contacts"),
        orderBy("submittedAt", "desc"),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    const leads = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate().toISOString() : data.submittedAt
      };
    });

    return NextResponse.json({ 
      leads, 
      lastId: leads.length > 0 ? leads[leads.length - 1].id : null,
      hasMore: leads.length === limitCount
    });

  } catch (error: any) {
    console.error("GET Leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads from database" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, remarks } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const updateData: any = {};
    if (status !== undefined) {
      updateData.status = status;
      // Add status change to history
      updateData.statusHistory = arrayUnion({
        status,
        timestamp: new Date().toISOString(),
        updatedBy: user.email || "Unknown"
      });
    }
    
    if (remarks !== undefined) {
      updateData.remarks = remarks;
      // Also add to remarks history
      updateData.remarksHistory = arrayUnion({
        text: remarks,
        timestamp: new Date().toISOString(),
        author: user.email || "Unknown"
      });
    }

    await updateDoc(doc(db, "contacts", id), updateData);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await verifyToken(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await deleteDoc(doc(db, "contacts", id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
