import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Search,
  Library,
  CheckCircle2,
  FileEdit,
  CalendarClock,
  Pencil,
  Trash2,
  MoreVertical,
  Layers,
  ArrowUpRight,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

function AdminBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const navigate = useNavigate();

  // Sample book data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Shadow Reborn",
      description:
        "A young warrior discovers an ancient power hidden within his soul.",
      genre: "Action, Fantasy",
      chapters: 24,
      status: "Published",
      updated: "Nov 08, 2026",
      cover: "from-purple-950 via-violet-900 to-black",
      initials: "SR",
    },
    {
      id: 2,
      title: "Crimson World",
      description:
        "In a world consumed by darkness, humanity fights for survival.",
      genre: "Dark Fantasy, Adventure",
      chapters: 18,
      status: "Published",
      updated: "Nov 06, 2026",
      cover: "from-red-950 via-rose-900 to-black",
      initials: "CW",
    },
    {
      id: 3,
      title: "The Last Hunter",
      description:
        "The journey of the last hunter in a world filled with monsters.",
      genre: "Action, Supernatural",
      chapters: 12,
      status: "Draft",
      updated: "Nov 04, 2026",
      cover: "from-blue-950 via-indigo-900 to-black",
      initials: "LH",
    },
    {
      id: 4,
      title: "Beyond The Void",
      description:
        "A mysterious journey beyond the boundaries of the known universe.",
      genre: "Sci-Fi, Mystery",
      chapters: 8,
      status: "Scheduled",
      updated: "Nov 02, 2026",
      cover: "from-emerald-950 via-teal-900 to-black",
      initials: "BV",
    },
  ]);

  // Statistics
  const totalBooks = books.length;
  const publishedBooks = books.filter(
    (book) => book.status === "Published",
  ).length;
  const draftBooks = books.filter((book) => book.status === "Draft").length;
  const scheduledBooks = books.filter(
    (book) => book.status === "Scheduled",
  ).length;

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      icon: Library,
      description: "All books",
    },
    {
      title: "Published",
      value: publishedBooks,
      icon: CheckCircle2,
      description: "Visible to readers",
    },
    {
      title: "Drafts",
      value: draftBooks,
      icon: FileEdit,
      description: "Unpublished books",
    },
    {
      title: "Scheduled",
      value: scheduledBooks,
      icon: CalendarClock,
      description: "Upcoming releases",
    },
  ];

  // Search and filter
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || book.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Delete book (frontend demo)
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (confirmed) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const filters = ["All", "Published", "Draft", "Scheduled"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Draft":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Scheduled":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

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
          <main className="p-4 sm:p-7 lg:p-10 space-y-8">
            {/* Page heading */}
            <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-[#A78BFA]">Manage Books</span>
                </div>

                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Manage Books
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                  Create, organize and manage your manga library.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/books/add")}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-3 text-sm font-medium transition hover:bg-[#7C3AED]"
              >
                <Plus size={19} />
                Add New Book
              </button>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/8 bg-[#111116] p-4 sm:p-5 transition hover:border-[#8B5CF6]/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#A78BFA]">
                        <Icon size={20} />
                      </div>

                      <ArrowUpRight size={17} className="text-gray-600" />
                    </div>

                    <p className="mt-4 text-sm text-gray-400">{item.title}</p>

                    <h2 className="mt-1 text-2xl font-semibold">
                      {item.value}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </section>

            {/* Book library */}
            <section>
              {/* Section heading */}
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Your Library</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Browse and manage all your books.
                </p>
              </div>

              {/* Search and filters */}
              <div className="rounded-xl border border-white/8 bg-[#111116] p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Search */}
                  <div className="relative w-full lg:max-w-md">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="text"
                      placeholder="Search books by title or genre..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-lg border border-white/8 bg-[#09090B] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#8B5CF6]"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <SlidersHorizontal
                      size={17}
                      className="mr-1 text-gray-500"
                    />

                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                          activeFilter === filter
                            ? "bg-[#8B5CF6] text-white"
                            : "border border-white/8 bg-[#09090B] text-gray-400 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-white/6 pt-4">
                  <p className="text-xs text-gray-500">
                    Showing{" "}
                    <span className="text-white font-medium">
                      {filteredBooks.length}
                    </span>{" "}
                    of {totalBooks} books
                  </p>
                </div>
              </div>

              {/* Books grid */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group overflow-hidden rounded-xl border border-white/8 bg-[#111116] transition duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40"
                  >
                    {/* Book cover */}
                    <div
                      className={`relative flex h-52 items-center justify-center overflow-hidden bg-linear-to-br ${book.cover}`}
                    >
                      <div className="absolute inset-0 bg-black/10" />

                      <div className="relative flex h-36 w-28 flex-col items-center justify-center border border-white/20 bg-black/20 shadow-2xl backdrop-blur-sm">
                        <BookOpen size={30} className="text-white/70" />

                        <h3 className="mt-3 px-2 text-center text-lg font-bold tracking-widest text-white">
                          {book.initials}
                        </h3>

                        <span className="mt-1 text-[8px] uppercase tracking-[0.3em] text-white/60">
                          Original Series
                        </span>
                      </div>

                      {/* Status */}
                      <div className="absolute right-3 top-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-medium ${getStatusStyle(book.status)}`}
                        >
                          {book.status}
                        </span>
                      </div>
                    </div>

                    {/* Book details */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-semibold transition group-hover:text-[#A78BFA]">
                            {book.title}
                          </h3>

                          <p className="mt-1 text-xs text-[#A78BFA]">
                            {book.genre}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            navigate(`/admin/books/${book.id}/edit`)
                          }
                          title="Edit book"
                          className="rounded-lg border border-white/8 p-2 text-gray-400 transition hover:border-[#8B5CF6]/40 hover:text-[#A78BFA]"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>

                      <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                        {book.description}
                      </p>

                      {/* Chapter information */}
                      <div className="mt-5 flex items-center justify-between border-y border-white/[0.07] py-3">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Layers size={16} className="text-[#A78BFA]" />
                          <span className="text-xs">
                            {book.chapters} Chapters
                          </span>
                        </div>

                        <span className="text-[11px] text-gray-500">
                          Updated {book.updated}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/chapters?book=${book.id}`)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#8B5CF6]/10 px-3 py-2.5 text-xs font-medium text-[#A78BFA] transition hover:bg-[#8B5CF6] hover:text-white"
                        >
                          <Layers size={15} />
                          Manage Chapters
                        </button>

                        <button
                          onClick={() => handleDelete(book.id)}
                          title="Delete book"
                          className="rounded-lg border border-white/8 px-3 py-2.5 text-gray-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filteredBooks.length === 0 && (
                <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#111116] px-5 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8B5CF6]/10">
                    <BookOpen size={25} className="text-[#A78BFA]" />
                  </div>

                  <h3 className="mt-4 text-lg font-medium">No books found</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your search or selected filter.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveFilter("All");
                    }}
                    className="mt-5 text-sm text-[#A78BFA] hover:text-purple-300"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminBooks;
