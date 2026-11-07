import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  Settings,
  X,
  ExternalLink,
  ChevronRight,
  LogOut,
} from "lucide-react";

function AdminSidebar({ isOpen, onClose, onLogout }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/admindash",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Manage Books",
      path: "/admin/books",
      icon: BookOpen,
    },
    {
      name: "Manage Chapters",
      path: "/admin/chapters",
      icon: Library,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72
        flex-col border-r border-white/8 bg-[#111113]
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center
              rounded-xl bg-[#8B5CF6]"
            >
              <BookOpen size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                Neve<span className="text-[#A78BFA]">rarie</span>
              </h1>
              <p className="text-[11px] text-gray-500">Dashboard</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400
              hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mx-5 border-t border-white/8" />

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-7">
          <p
            className="mb-5 px-3 text-[10px] font-semibold
            uppercase tracking-[0.18em] text-gray-500"
          >
            Workspace
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl
                  px-3 py-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-[#8B5CF6]/15 text-[#A78BFA]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon size={19} />
                      {item.name}
                    </div>

                    {isActive && <ChevronRight size={16} />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/8 p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-3
              text-sm text-gray-400 transition hover:bg-white/5
              hover:text-white"
          >
            <ExternalLink size={18} />
            View Website
          </a>

          <div
            className="mt-4 flex items-center gap-3
            rounded-xl bg-white/04 p-3"
          >
            <div
              className="flex h-10 w-10 items-center
              justify-center rounded-full bg-[#8B5CF6]/20
              text-sm font-bold text-[#A78BFA]"
            >
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-gray-500">Author Account</p>
            </div>
          </div>
          {/* Logout */}
          <button
            onClick={onLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
