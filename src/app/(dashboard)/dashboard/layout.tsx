// app/dashboard/layout.tsx

import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-black">
      
      {/* Sidebar - Fixed Width */}
      <div className="hidden lg:flex lg:w-64">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}