import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import BookForm from "../components/BookForm";

// Static sample book data
const sampleBooks = [
  {
    id: "book-1",
    title: "Shadow Reborn",
    description:
      "A young warrior awakens in a world where shadows hold unimaginable power. Follow his journey as he discovers his true destiny.",
    author: "Zlac",
    genre: "Action",
    tags: ["Fantasy", "Adventure", "Action"],
    status: "Published",
    coverImage: "",
  },
  {
    id: "book-2",
    title: "The Last Horizon",
    description:
      "An adventure beyond the known world, where every discovery brings a new mystery.",
    author: "Zlac",
    genre: "Adventure",
    tags: ["Adventure", "Mystery", "Fantasy"],
    status: "Published",
    coverImage: "",
  },
  {
    id: "book-3",
    title: "Crimson Fate",
    description:
      "A story of destiny, betrayal, and an unexpected power that could change everything.",
    author: "Zlac",
    genre: "Fantasy",
    tags: ["Fantasy", "Drama", "Action"],
    status: "Draft",
    coverImage: "",
  },
];

function AdminEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Find the selected book using its URL ID
  const book = sampleBooks.find((item) => item.id === id);

  // Handle book update (frontend only)
  const handleUpdateBook = (bookData) => {
    setLoading(true);

    // Simulate update action
    setTimeout(() => {
      setLoading(false);

      alert("Book updated successfully!");

      navigate("/admin/books");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <button
                  onClick={() => navigate("/admin/books")}
                  className="hover:text-white"
                >
                  Manage Books
                </button>

                <span>/</span>

                <span className="text-[#A78BFA]">Edit Book</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <Pencil size={21} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">Edit Book</h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your book information and publishing settings.
                  </p>
                </div>
              </div>
            </div>

            {book ? (
              <BookForm
                initialData={book}
                onSubmit={handleUpdateBook}
                submitLabel="Update Book"
                loading={loading}
              />
            ) : (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                <p className="text-red-400">Book not found.</p>

                <button
                  onClick={() => navigate("/admin/books")}
                  className="mt-4 rounded-xl bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7C3AED]"
                >
                  Back to Manage Books
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminEditBook;
