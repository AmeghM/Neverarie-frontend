import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-[#09090B] text-white">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="min-h-screen lg:pl-72">
          {/* Header */}
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

          {/* Page content */}
          <main className="p-4 sm:p-7 lg:p-10"></main>
        </div>
      </div>
    </>
  );
}

export default AdminSettings;
