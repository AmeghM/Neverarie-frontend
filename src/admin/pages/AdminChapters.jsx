import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  BookOpen,
  Layers,
  ArrowUpRight,
  Eye,
  Filter,
  Plus,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { useEffect } from "react";
import { getAdminChaptersAPI, getAllBooksAPI } from "../../services/allAPI";

function AdminChapters() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllBooksAPI();
      const booksData = res.data.books || [];

      // Fetch chapters for every book
      const chapterResponses = await Promise.allSettled(
        booksData.map((book) => getAdminChaptersAPI(book._id)),
      );

      // Calculate chapter statistics for each book
      const updatedBooks = booksData.map((book, index) => {
        const response = chapterResponses[index];
        const chapters =
          response.status === "fulfilled"
            ? response.value.data.chapters || []
            : [];

        const totalChapters = chapters.length;

        const publishedChapters = chapters.filter(
          (chapter) =>
            chapter.novelStatus === "Published" ||
            chapter.comicStatus === "Published",
        ).length;

        const draftChapters = chapters.filter(
          (chapter) =>
            (chapter.content?.trim() && chapter.novelStatus === "Draft") ||
            (chapter.pages?.length > 0 && chapter.comicStatus === "Draft"),
        ).length;

        // Scheduling is not implemented yet
        const scheduledChapters = 0;

        return {
          ...book,
          totalChapters,
          publishedChapters,
          draftChapters,
          scheduledChapters,
        };
      });

      setBooks(updatedBooks);
    } catch (error) {
      console.log("Books fetch error:", error);
      setError(
        error.response?.data?.message || "Failed to fetch books. Try again",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Search and filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || book.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [books, search, activeFilter]);

  // Overall statistics
  const totalBooks = books.length;

  const totalChapters = books.reduce(
    (total, book) => total + book.totalChapters,
    0,
  );

  const filters = ["All", "Published", "Draft"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Draft":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const handleManageChapters = (bookId) => {
    navigate(`/admin/books/${bookId}/chapters`);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {/* Page heading */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>Admin</span>
                  <span>/</span>
                  <span className="text-[#A78BFA]">Manage Chapters</span>
                </div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  Manage Chapters
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Select a book to create, edit and organize its chapters.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/books")}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111114] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10"
              >
                <Eye size={18} />
                View Books
              </button>
            </div>

            {/* Books section */}
            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111114]">
              {/* Section heading */}
              <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Your Books</h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose a book to manage its chapters.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full lg:max-w-xs">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#09090B] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <Filter size={16} className="mr-1 text-gray-500" />

                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                      activeFilter === filter
                        ? "bg-[#8B5CF6]/15 text-[#A78BFA]"
                        : "text-gray-500 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Book cards */}

              {loading ? (
                <div className="py-16 text-center text-sm text-gray-400">
                  Loading books...
                </div>
              ) : error ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-red-400">{error}</p>

                  <button
                    onClick={fetchBooks}
                    className="mt-4 rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <div
                      key={book._id}
                      className="group overflow-hidden rounded-2xl border border-white/8 bg-[#09090B] transition duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40"
                    >
                      {/* Book cover */}
                      <div
                        className={`relative flex h-40 items-center justify-center overflow-hidden bg-linear-to-br from-purple-950 to-indigo-950`}
                      >
                        <div className="absolute inset-0 bg-black/20" />

                        <BookOpen
                          size={55}
                          strokeWidth={1}
                          className="relative text-white/40 transition duration-300 group-hover:scale-110 group-hover:text-white/60"
                        />

                        <div className="absolute right-3 top-3">
                          <span
                            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                              book.status,
                            )}`}
                          >
                            {book.status}
                          </span>
                        </div>
                      </div>

                      {/* Book details */}
                      <div className="p-5">
                        <div className="mb-4">
                          <h3 className="truncate text-lg font-semibold text-white">
                            {book.title}
                          </h3>

                          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                            {book.description}
                          </p>
                        </div>

                        {/* Chapter count */}
                        <div className="mb-5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#A78BFA]">
                            <Layers size={17} />
                          </div>

                          <div>
                            <p className="text-lg font-bold text-white">
                              {book.totalChapters}
                            </p>

                            <p className="text-xs text-gray-500">
                              Total Chapters
                            </p>
                          </div>
                        </div>

                        {/* Chapter status details */}
                        <div className="mb-5 grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-sm font-semibold text-green-400">
                              {book.publishedChapters}
                            </p>
                            <p className="mt-1 text-[11px] text-gray-500">
                              Published
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-yellow-400">
                              {book.draftChapters}
                            </p>
                            <p className="mt-1 text-[11px] text-gray-500">
                              Drafts
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-blue-400">
                              {book.scheduledChapters}
                            </p>
                            <p className="mt-1 text-[11px] text-gray-500">
                              Scheduled
                            </p>
                          </div>
                        </div>

                        {/* Last updated */}
                        <div className="mb-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
                          <span className="text-xs text-gray-500">
                            Last updated
                          </span>

                          <span className="text-xs text-gray-400">
                            {book.updatedAt
                              ? new Date(book.updatedAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "Not available"}
                          </span>
                        </div>

                        {/* Manage chapters button */}
                        <button
                          onClick={() => handleManageChapters(book._id)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B5CF6]/10 px-4 py-3 text-sm font-semibold text-[#A78BFA] transition hover:bg-[#8B5CF6] hover:text-white"
                        >
                          Manage Chapters
                          <ArrowUpRight size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#A78BFA]">
                    <BookOpen size={26} />
                  </div>

                  <h3 className="font-semibold text-white">No books found</h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    {search || activeFilter !== "All"
                      ? "Try changing your search or filter."
                      : "You haven't created any books yet. Create your first book to get started."}
                  </p>

                  {!search && activeFilter === "All" && (
                    <button
                      onClick={() => navigate("/admin/books/add")}
                      className="mt-5 flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
                    >
                      <Plus size={17} />
                      Create First Book
                    </button>
                  )}
                </div>
              )}

              {/* Footer */}
              {!loading && !error && filteredBooks.length > 0 && (
                <div className="border-t border-white/[0.07] px-5 py-4 sm:px-6">
                  <p className="text-xs text-gray-500">
                    Showing {filteredBooks.length} of {totalBooks} books
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminChapters;
