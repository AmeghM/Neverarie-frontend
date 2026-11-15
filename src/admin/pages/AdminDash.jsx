import { useState, useEffect } from "react";
import {
  BookOpen,
  Library,
  CheckCircle2,
  CalendarClock,
  Clock,
  Plus,
  ArrowUpRight,
  FileText,
  Upload,
  Activity,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

function AdminDash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const currentDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Dashboard statistics
  const stats = [
    {
      title: "Total Books",
      value: "10",
      description: "Books in your library",
      icon: BookOpen,
    },
    {
      title: "Total Chapters",
      value: "86",
      description: "Across all books",
      icon: Library,
    },
    {
      title: "Published",
      value: "72",
      description: "Available to readers",
      icon: CheckCircle2,
    },
    {
      title: "Scheduled",
      value: "4",
      description: "Upcoming publications",
      icon: CalendarClock,
    },
  ];

  const quickActions = [
    {
      title: "Add New Book",
      description: "Create a new book",
      icon: Plus,
    },
    {
      title: "Manage Books",
      description: "View and edit your books",
      icon: BookOpen,
    },
    {
      title: "Manage Chapters",
      description: "Add or edit chapters",
      icon: FileText,
    },
    {
      title: "Upload Chapter",
      description: "Publish new manga pages",
      icon: Upload,
    },
  ];

  return (
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

        <main className="p-4 sm:p-7 lg:p-10 space-y-8">
          {/* Welcome section */}
          <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#111116] p-6 sm:p-8">
            {/* Background decoration */}
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#A78BFA]">
                  ADMIN DASHBOARD
                </p>

                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Welcome back, Admin!
                </h1>

                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                  Manage your books, publish new chapters and keep your
                  publishing platform up to date.
                </p>

                <button className="mt-6 flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-3 text-sm font-medium transition hover:bg-[#7C3AED]">
                  <Plus size={18} />
                  Add New Book
                </button>
              </div>

              {/* Clock */}
              <div className="min-w-[220px] rounded-xl border border-white/8 bg-black/30 p-5 sm:text-right">
                <div className="flex items-center gap-2 text-gray-400 sm:justify-end">
                  <Clock size={16} className="text-[#A78BFA]" />
                  <span className="text-xs font-medium tracking-wider">
                    LOCAL TIME
                  </span>
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">
                  {currentTime}
                </h2>

                <p className="mt-2 text-xs text-gray-400">{currentDate}</p>

                <p className="mt-3 text-xs text-[#A78BFA]">
                  India Standard Time · UTC +05:30
                </p>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Publishing Overview</h2>
              <p className="mt-1 text-sm text-gray-500">
                A quick overview of your platform.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-xl border border-white/8 bg-[#111116] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#A78BFA]">
                        <Icon size={21} />
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-gray-600 transition group-hover:text-[#A78BFA]"
                      />
                    </div>

                    <h3 className="mt-5 text-sm text-gray-400">{item.title}</h3>

                    <p className="mt-1 text-3xl font-semibold tracking-tight">
                      {item.value}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Easily access your publishing tools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/8 bg-[#111116] p-5 transition hover:border-[#8B5CF6]/40 hover:bg-[#17141F]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#A78BFA] transition group-hover:bg-[#8B5CF6] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="shrink-0 text-gray-600 group-hover:text-[#A78BFA]"
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom section */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* Recent Activity */}
            <div className="rounded-xl border border-white/8 bg-[#111116] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Recent Activity</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Latest publishing updates
                  </p>
                </div>

                <Activity size={20} className="text-[#A78BFA]" />
              </div>

              <div className="mt-6 flex min-h-32 flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8B5CF6]/10">
                  <Activity size={22} className="text-[#A78BFA]" />
                </div>

                <p className="mt-3 text-sm text-gray-300">
                  No recent activity yet
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Your publishing activities will appear here.
                </p>
              </div>
            </div>

            {/* Publishing status */}
            <div className="rounded-xl border border-white/8 bg-[#111116] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Publishing Status</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Your chapter publishing overview
                  </p>
                </div>

                <BookOpen size={20} className="text-[#A78BFA]" />
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">Published</span>
                    <span className="text-white">72 Chapters</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[84%] rounded-full bg-[#8B5CF6]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">Scheduled</span>
                    <span className="text-white">4 Chapters</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[5%] rounded-full bg-blue-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">Drafts</span>
                    <span className="text-white">10 Chapters</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[12%] rounded-full bg-yellow-500" />
                  </div>
                </div>
              </div>

              <p className="mt-6 border-t border-white/8 pt-4 text-xs text-gray-500">
                Total: 86 chapters
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDash;
