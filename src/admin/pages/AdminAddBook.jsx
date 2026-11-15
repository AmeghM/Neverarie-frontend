import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, BookOpen } from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import BookForm from "../components/BookForm";

function AdminAddBook() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Optional first chapter setting
  const [addFirstChapter, setAddFirstChapter] = useState(false);

  const handleAddBook = async (bookData) => {
    try {
      setLoading(true);

      const response = await fetch("/api/books", {
        method: "POST",
        body: bookData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create book");
      }

      // Get the newly created book
      const createdBook = data.book || data;
      const bookId = createdBook._id || createdBook.id;

      if (!bookId) {
        throw new Error(
          "Book created, but its ID was not returned by the server.",
        );
      }

      alert("Book created successfully!");

      // Redirect based on user's choice
      if (addFirstChapter) {
        navigate(`/admin/chapters/${bookId}/add`);
      } else {
        navigate("/admin/books");
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-5xl">
            {/* Page heading */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <button
                  onClick={() => navigate("/admin/books")}
                  className="transition hover:text-white"
                >
                  Manage Books
                </button>

                <span>/</span>

                <span className="text-[#A78BFA]">Add Book</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <Plus size={23} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Add New Book
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Create a new book for your publishing platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional first chapter option */}
            <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  type="checkbox"
                  checked={addFirstChapter}
                  onChange={(e) => setAddFirstChapter(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#8B5CF6]"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-[#A78BFA]" />

                    <h3 className="font-semibold text-white">
                      Add first chapter after creating book
                    </h3>

                    <span className="rounded-md bg-[#8B5CF6]/10 px-2 py-1 text-[10px] font-medium text-[#A78BFA]">
                      Optional
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    After creating this book, you'll be redirected to the
                    chapter editor where you can add your first chapter and
                    upload manga pages.
                  </p>
                </div>
              </label>
            </div>

            {/* Book form */}
            <BookForm
              onSubmit={handleAddBook}
              submitLabel="Create Book"
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAddBook;
