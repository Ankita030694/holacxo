"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, LogOut, Menu, X, Rocket } from "lucide-react";

export default function AuthorityLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/nullify");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/nullify");
    } catch (error) {
       console.error("Logout error", error);
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen bg-[#0B1528] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="text-gray-500 font-mono text-xs uppercase tracking-widest">Validating Session...</div>
         </div>
       </div>
     );
  }

  const navItems = [
    { name: "Leads Pipeline", href: "/authority/leads", icon: LayoutDashboard },
    { name: "Add Blog Post", href: "/authority/blogs", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#0B1528] flex">
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0D1B36] border-r border-white/10 transition-transform duration-300 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 flex flex-col shadow-2xl`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                 <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Tanushka</span>
           </div>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1.5 hover:bg-white/5 rounded-lg">
              <X className="h-5 w-5" />
           </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
           <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-4 px-2 opacity-50">Main Menu</div>
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = pathname === item.href;
             return (
               <Link 
                 key={item.href} 
                 href={item.href}
                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                   ${isActive 
                     ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                     : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`}
               >
                 <Icon className={`h-5 w-5 ${isActive ? "text-blue-400" : "group-hover:text-white"}`} />
                 <span className="text-sm font-semibold tracking-wide">{item.name}</span>
               </Link>
             );
           })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3 bg-black/10">
           <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 overflow-hidden">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Authenticated As</div>
              <div className="text-xs text-gray-200 truncate font-mono">{user?.email}</div>
           </div>
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all group font-bold text-sm tracking-wide"
           >
             <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
             Logout
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
         <header className="md:hidden h-16 bg-[#0D1B36] border-b border-white/10 flex items-center px-4 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg transition-all">
               <Menu className="h-6 w-6 text-white" />
            </button>
            <div className="ml-4 font-bold">Tanushka Portal</div>
         </header>

         <main className="flex-1 overflow-y-auto w-full relative">
            {children}
         </main>
      </div>
    </div>
  );
}
