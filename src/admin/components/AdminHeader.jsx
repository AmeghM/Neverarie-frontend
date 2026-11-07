import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  ExternalLink,
  Pencil,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";

function AdminHeader({ onMenuClick, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/admin": {
      title: "Dashboard",
      subtitle: "Overview of your publishing platform",
    },
    "/admin/books": {
      title: "Manage Books",
      subtitle: "Create and manage your books",
    },
    "/admin/chapters": {
      title: "Manage Chapters",
      subtitle: "Manage your book chapters",
    },
    "/admin/settings": {
      title: "Settings",
      subtitle: "Manage your account and preferences",
    },
  };

  const currentPage = pageTitles[location.pathname] || {
    title: "Admin Panel",
    subtitle: "Manage your publishing platform",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditProfile = () => {
    setProfileOpen(false);
    navigate("/admin/settings");
  };

  const handleLogout = () => {
    setProfileOpen(false);
    onLogout?.();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/8 bg-[#09090B]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg border border-white/10 p-2.5 text-gray-300 transition hover:bg-white/10 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-base font-semibold text-white">
            {currentPage.title}
          </h2>

          <p className="mt-1 text-xs text-gray-500">{currentPage.subtitle}</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Visit Website */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:border-[#8B5CF6]/50 hover:text-white sm:flex"
        >
          <ExternalLink size={15} />
          Visit Website
        </a>

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Profile button */}
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className={`flex items-center gap-2 rounded-xl border p-1.5 transition ${
              profileOpen
                ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/10"
                : "border-transparent hover:border-white/10 hover:bg-white/5"
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/15 text-sm font-bold text-[#C4B5FD]">
              A
            </div>

            <ChevronDown
              size={15}
              className={`hidden text-gray-400 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#18181B] shadow-2xl shadow-black/40">
              {/* Profile information */}
              <div className="border-b border-white/8 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/20 font-bold text-[#C4B5FD]">
                    A
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Admin</p>
                    <p className="truncate text-xs text-gray-500">
                      admin@example.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown options */}
              <div className="p-2">
                <button
                  onClick={handleEditProfile}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/6 hover:text-white"
                >
                  <Pencil size={17} />
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/admin/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/6 hover:text-white"
                >
                  <Settings size={17} />
                  Settings
                </button>

                <div className="my-2 border-t border-white/8" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
