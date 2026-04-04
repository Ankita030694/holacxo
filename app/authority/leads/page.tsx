"use client";

import { useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface RemarkHistoryEntry {
  text: string;
  timestamp: string;
  author: string;
}

interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  updatedBy: string;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  pageUrl: string;
  submittedAt: string;
  status?: string;
  remarks?: string;
  remarksHistory?: RemarkHistoryEntry[];
  statusHistory?: StatusHistoryEntry[];
}

const STATUS_OPTIONS = [ 
  "New", "Not Answering", "Interested", "Follow Up", "Meeting Scheduled", 
  "Proposal Sent", "Negotiation", "Converted", "Rejected", "Postponed"
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [fetching, setFetching] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");
  
  const [editingRemarks, setEditingRemarks] = useState<{ [id: string]: string }>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  
  const [historyModalLead, setHistoryModalLead] = useState<Lead | null>(null);
  const [statusModalLead, setStatusModalLead] = useState<Lead | null>(null);

  const router = useRouter();

  const fetchLeads = useCallback(async (token: string, nextId: string | null = null) => {
    setFetching(true);
    try {
      const url = new URL("/api/leads", window.location.origin);
      url.searchParams.append("limit", "50");
      if (nextId) url.searchParams.append("lastId", nextId);

      const res = await fetch(url.toString(), {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to fetch leads");

      const data = await res.json();
      if (nextId) {
        setLeads(prev => [...prev, ...data.leads]);
      } else {
        setLeads(data.leads);
      }
      setLastId(data.lastId);
      setHasMore(data.hasMore);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await getIdToken(currentUser);
        fetchLeads(token);
      }
    });

    return () => unsubscribeAuth();
  }, [fetchLeads]);

  const handleUpdateStatus = async (id: string, status: string) => {
    if (!user) return;
    try {
      const token = await getIdToken(user);
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, status })
      });

      if (!res.ok) throw new Error("Update failed");
      
      setLeads(prev => prev.map(l => {
        if (l.id === id) {
           const historyEntry: StatusHistoryEntry = {
              status,
              timestamp: new Date().toISOString(),
              updatedBy: user.email || "Unknown"
           };
           return { 
             ...l, 
             status, 
             statusHistory: [...(l.statusHistory || []), historyEntry].slice(-5) 
           };
        }
        return l;
      }));
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleSaveRemark = async (id: string) => {
    const newText = editingRemarks[id];
    if (newText === undefined || !user) return;
    
    setSavingId(id);
    try {
      const token = await getIdToken(user);
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, remarks: newText })
      });

      if (!res.ok) throw new Error("Save failed");
      
      setLeads(prev => prev.map(l => {
        if (l.id === id) {
          const newEntry: RemarkHistoryEntry = {
            text: newText,
            timestamp: new Date().toISOString(),
            author: user.email || "Unknown"
          };
          return { 
            ...l, 
            remarks: newText, 
            remarksHistory: [newEntry, ...(l.remarksHistory || [])] 
          };
        }
        return l;
      }));
      
      const newEditing = { ...editingRemarks };
      delete newEditing[id];
      setEditingRemarks(newEditing);
      
    } catch (err: any) {
      alert("Failed to save remark: " + err.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!user || !confirm("Are you sure you want to delete this lead?")) return;
    try {
      const token = await getIdToken(user);
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Delete failed");
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err: any) {
      alert("Failed to delete lead: " + err.message);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Page Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-xl transition-all hover:border-white/10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Leads Pipeline</h1>
          <p className="text-gray-400 text-lg">Real-time status tracking and state audit logs.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#0B1528] px-6 py-4 rounded-xl border border-white/10 shadow-inner">
           <div className="text-center pr-6 border-r border-white/10">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-1">Active Pipeline</span>
              <div className="text-3xl font-mono text-blue-400 font-bold leading-none">{leads.length}</div>
           </div>
           <div className="text-center">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-1">Converted Leads</span>
              <div className="text-3xl font-mono text-green-400 font-bold leading-none">{leads.filter(l => l.status === "Converted").length}</div>
           </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-500 font-bold text-sm">
          CRITICAL_ERROR: {error}
        </div>
      )}

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-2xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1300px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <th className="px-5 py-4">Timestamp</th>
              <th className="px-5 py-4 w-48">Lead Details</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4 w-40">Sales Status</th>
              <th className="px-5 py-4 max-w-[300px]">Source Page</th>
              <th className="px-5 py-4 min-w-[300px]">Remarks</th>
              <th className="px-5 py-4 text-right w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="group hover:bg-white/[0.04] transition-colors duration-200">
                <td className="px-5 py-6 align-top">
                  <div className="text-xs text-gray-300">{new Date(lead.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  <div className="text-[10px] text-gray-500 mt-1 font-mono uppercase tracking-wider">{new Date(lead.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="text-sm font-bold text-white tracking-tight">{lead.firstName} {lead.lastName}</div>
                  <div className="text-xs text-gray-400 mt-0.5 opacity-60 truncate max-w-[200px]">{lead.email}</div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="text-sm text-gray-300 font-mono tracking-tighter">{lead.phoneNumber}</div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">{lead.companyName}</div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="flex flex-col gap-2">
                     <select 
                       value={lead.status || "New"}
                       onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                       className="text-[11px] font-bold py-1.5 px-3 rounded-lg border border-white/10 bg-black/40 outline-none cursor-pointer focus:border-blue-500/50 transition-all font-mono uppercase tracking-widest"
                     >
                       {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                     </select>
                     <button 
                       onClick={() => setStatusModalLead(lead)}
                       className="text-[9px] text-gray-500 uppercase font-black tracking-widest hover:text-green-400 transition-colors text-left pl-1"
                     >
                       State Logs →
                     </button>
                  </div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="text-[10px] text-gray-600 font-mono break-all leading-relaxed whitespace-pre-wrap" title={lead.pageUrl}>
                    {lead.pageUrl}
                  </div>
                </td>
                <td className="px-5 py-6 align-top">
                  <div className="flex gap-2 items-start">
                    <textarea
                      value={editingRemarks[lead.id] !== undefined ? editingRemarks[lead.id] : (lead.remarks || "")}
                      onChange={(e) => setEditingRemarks({ ...editingRemarks, [lead.id]: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-gray-300 outline-none focus:border-blue-500/40 min-h-[40px] resize-none"
                      placeholder="Add a remark..."
                    />
                    <div className="flex flex-col gap-1.5 shrink-0">
                       <button 
                         onClick={() => handleSaveRemark(lead.id)}
                         disabled={savingId === lead.id || editingRemarks[lead.id] === undefined}
                         className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-[9px] font-bold rounded transition-all whitespace-nowrap uppercase tracking-widest"
                       >
                         {savingId === lead.id ? "Sync" : "Save"}
                       </button>
                       <button 
                         onClick={() => setHistoryModalLead(lead)}
                         className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-bold rounded transition-all whitespace-nowrap uppercase tracking-widest"
                       >
                         Log
                       </button>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-6 align-top text-right">
                  <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-gray-700 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {hasMore && (
         <div className="mt-8 flex justify-center">
           <button onClick={() => {
             if (user && lastId) getIdToken(user).then(t => fetchLeads(t, lastId));
           }} disabled={fetching} className="px-10 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all">
             {fetching ? "Syncing Feed..." : "Load More Pipeline"}
           </button>
         </div>
      )}

      {/* Modals */}
      {historyModalLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0D1B36] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold tracking-tight uppercase tracking-widest text-blue-400">Remarks Engine Log</h3>
              <button onClick={() => setHistoryModalLead(null)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {[...(historyModalLead.remarksHistory || [])].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((entry, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 -left-1.5 w-3 h-3 rounded-full bg-blue-500 border-4 border-[#0D1B36]"></div>
                  <div className="text-[10px] text-gray-500 flex justify-between mb-3 uppercase font-bold tracking-widest">
                     <span>{new Date(entry.timestamp).toLocaleString()}</span>
                     <span className="text-blue-500">{entry.author}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300 border border-white/5 leading-relaxed">
                     {entry.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {statusModalLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
           <div className="bg-[#0D1B36] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
             <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold uppercase tracking-widest text-green-400">State Transition Log</h3>
                <button onClick={() => setStatusModalLead(null)} className="p-2 hover:bg-white/10 rounded-full transition-all text-gray-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {[...(statusModalLead.statusHistory || [])].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5).map((entry, i) => (
                   <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0 text-white">
                      <div className="flex-1">
                         <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">
                            {new Date(entry.timestamp).toLocaleString()}
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-xs uppercase font-mono tracking-widest text-white bg-green-500/10 px-2 py-1 rounded border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                               {entry.status}
                            </span>
                            <span className="text-[9px] text-gray-500">BY: {entry.updatedBy}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
