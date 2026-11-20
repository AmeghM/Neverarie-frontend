import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Plus,
  BookOpen,
  Layers,
  CheckCircle2,
  FileEdit,
  CalendarClock,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { deleteChapterAPI, getAdminChaptersAPI } from "../../services/allAPI";
import { useEffect } from "react";

// Static sample book and chapter data
// const sampleBooks = [
//   {
//     id: "book-1",
//     title: "Shadow Reborn",
//     status: "Published",
//     description:
//       "A young warrior awakens in a world where shadows hold unimaginable power.",
//     coverImage: "",
//     chapters: [
//       {
//         id: "ch-1",
//         chapterNumber: 1,
//         title: "The Beginning",
//         status: "Published",
//         pages: ["page1.jpg", "page2.jpg", "page3.jpg"],
//         updatedAt: "2026-11-05",
//       },
//       {
//         id: "ch-2",
//         chapterNumber: 2,
//         title: "The Awakening",
//         status: "Published",
//         pages: ["page1.jpg", "page2.jpg"],
//         updatedAt: "2026-11-06",
//       },
//       {
//         id: "ch-3",
//         chapterNumber: 3,
//         title: "A New Enemy",
//         status: "Draft",
//         pages: ["page1.jpg", "page2.jpg", "page3.jpg", "page4.jpg"],
//         updatedAt: "2026-11-08",
//       },
//       {
//         id: "ch-4",
//         chapterNumber: 4,
//         title: "The Final Battle",
//         status: "Scheduled",
//         pages: ["page1.jpg", "page2.jpg"],
//         updatedAt: "2026-11-09",
//         scheduledAt: "2026-11-15",
//       },
//     ],
//   },
//   {
//     id: "book-2",
//     title: "The Last Horizon",
//     status: "Published",
//     description:
//       "An adventure beyond the known world, where every discovery brings a new mystery.",
//     coverImage: "",
//     chapters: [
//       {
//         id: "ch-5",
//         chapterNumber: 1,
//         title: "Lost World",
//         status: "Published",
//         pages: ["page1.jpg", "page2.jpg"],
//         updatedAt: "2026-11-04",
//       },
//       {
//         id: "ch-6",
//         chapterNumber: 2,
//         title: "The Journey",
//         status: "Draft",
//         pages: ["page1.jpg", "page2.jpg", "page3.jpg"],
//         updatedAt: "2026-11-07",
//       },
//     ],
//   },
//   {
//     id: "book-3",
//     title: "Crimson Fate",
//     status: "Draft",
//     description: "A story of destiny, betrayal, and an unexpected power.",
//     coverImage: "",
//     chapters: [],
//   },
// ];

function BookChapters() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchChapters = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAdminChaptersAPI(bookId);
      setBook(res.data.book);
      setChapters(res.data.chapters || []);
    } catch (error) {
      console.log("Chapter fetch error:", error);
      setBook(null);
      setChapters([]);
      setError(
        error.response?.data?.message ||
          "Failed to fetch chapters. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (bookId) {
      fetchChapters();
    }
  }, [bookId]);

  // Statistics
  const publishedCount = chapters.filter(
    (chapter) => chapter.status === "Published",
  ).length;

  const draftCount = chapters.filter(
    (chapter) => chapter.status === "Draft",
  ).length;

  const scheduledCount = chapters.filter(
    (chapter) => chapter.status === "Scheduled",
  ).length;

  // Delete chapter (frontend only)
  const handleDeleteChapter = async (chapterId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chapter?",
    );

    if (!confirmed) return;
    try {
      const res = await deleteChapterAPI(chapterId);
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to delete chapter");
      }
      setChapters((prev) =>
        prev.filter((chapter) => chapter._id !== chapterId),
      );
      alert("Chapter deleted successfully!");
    } catch (error) {
      console.error("delete chapter error:", error);
      alert("something went wrong");
    }
  };

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Published":
        return "border-green-500/20 bg-green-500/10 text-green-400";

      case "Draft":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      case "Scheduled":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";

      default:
        return "border-gray-500/20 bg-gray-500/10 text-gray-400";
    }
  };

  // Date formatting
  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div className="flex justify-center py-24">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#8B5CF6] border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }
  // Book not found
  if (error || !book) {
    return (
      <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        <div className="rounded-2xl border border-white/8 bg-[#111114] p-8 text-center">
          <BookOpen size={35} className="mx-auto mb-4 text-[#A78BFA]" />

          <h2 className="text-lg font-semibold">Book not found</h2>

          <p className="mt-2 text-sm text-gray-500">
            The selected book does not exist in the sample data.
          </p>

          <button
            onClick={() => navigate("/admin/chapters")}
            className="mt-5 text-sm text-[#A78BFA] hover:text-white"
          >
            Back to Manage Chapters
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => navigate("/admin/chapters")}
            className="hover:text-white"
          >
            Manage Chapters
          </button>

          <span>/</span>

          <span className="text-[#A78BFA]">{book.title}</span>
        </div>

        {/* Book heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/chapters")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#111114] text-gray-400 transition hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{book.title}</h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and organize chapters for this book.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/admin/books/${bookId}/chapters/add`)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
          >
            <Plus size={18} />
            Add New Chapter
          </button>
        </div>

        {/* Book information */}
        <div className="mb-7 flex flex-col gap-5 rounded-2xl border border-white/8 bg-[#111114] p-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#8B5CF6]/10">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <BookOpen size={35} className="text-[#A78BFA]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{book.title}</h2>

              <span
                className={`rounded-md border px-2 py-1 text-[11px] ${
                  book.status === "Published"
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {book.status || "Draft"}
              </span>
            </div>

            <p className="line-clamp-2 text-sm text-gray-500">
              {book.description || "No description available."}
            </p>

            <button
              onClick={() => navigate(`/admin/books/${bookId}/edit`)}
              className="mt-3 flex items-center gap-2 text-xs font-medium text-[#A78BFA] hover:text-white"
            >
              <Pencil size={13} />
              Edit Book Details
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <StatCard
            title="Total Chapters"
            value={chapters.length}
            icon={Layers}
            color="purple"
          />

          <StatCard
            title="Published"
            value={publishedCount}
            icon={CheckCircle2}
            color="green"
          />

          <StatCard
            title="Drafts"
            value={draftCount}
            icon={FileEdit}
            color="yellow"
          />

          <StatCard
            title="Scheduled"
            value={scheduledCount}
            icon={CalendarClock}
            color="blue"
          />
        </div>

        {/* Chapters list */}
        <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#111114]">
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Chapters</h2>

              <p className="mt-1 text-sm text-gray-500">
                All chapters belonging to {book.title}.
              </p>
            </div>

            <span className="w-fit rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400">
              {chapters.length} Chapters
            </span>
          </div>

          {chapters.length > 0 ? (
            <div className="divide-y divide-white/6">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter._id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-white/2 sm:flex-row sm:items-center sm:p-6"
                >
                  {/* Chapter number */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-sm font-bold text-[#A78BFA]">
                    {String(chapter.chapterNumber ?? index + 1).padStart(
                      2,
                      "0",
                    )}
                  </div>

                  {/* Chapter details */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {chapter.title}
                      </h3>

                      <span
                        className={`rounded-md border px-2 py-1 text-[10px] font-medium ${getStatusStyle(
                          chapter.status,
                        )}`}
                      >
                        {chapter.status || "Draft"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon size={13} />
                        {chapter.pages?.length || 0} Pages
                      </span>

                      <span>Updated: {formatDate(chapter.updatedAt)}</span>

                      {chapter.status === "Scheduled" &&
                        chapter.scheduledAt && (
                          <span className="flex items-center gap-1 text-blue-400">
                            <CalendarClock size={13} />
                            {formatDate(chapter.scheduledAt)}
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/chapters/${bookId}/${chapter._id}/edit`,
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 transition hover:border-[#8B5CF6]/40 hover:text-white"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteChapter(chapter._id)}
                      className="flex items-center justify-center rounded-lg border border-white/10 p-2 text-gray-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                      title="Delete chapter"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-5 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#A78BFA]">
                <BookOpen size={26} />
              </div>

              <h3 className="font-semibold">No chapters yet</h3>

              <p className="mt-2 max-w-sm text-sm text-gray-500">
                This book doesn't have any chapters. Start by creating your
                first chapter.
              </p>

              <button
                onClick={() => navigate(`/admin/books/${bookId}/chapters/add`)}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]"
              >
                <Plus size={17} />
                Add First Chapter
              </button>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}

// Shared admin page layout
function AdminLayout({ children, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-7 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

// Statistics card
function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    purple: "bg-[#8B5CF6]/10 text-[#A78BFA]",
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    blue: "bg-blue-500/10 text-blue-400",
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#111114] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-gray-500 sm:text-sm">{title}</p>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors[color]}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{value}</h3>
    </div>
  );
}

export default BookChapters;
