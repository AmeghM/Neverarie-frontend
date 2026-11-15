import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import ChapterForm from "../../components/ChapterForm";

function EditChapter() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <button
                onClick={() => navigate(`/admin/chapters/${bookId}`)}
                className="mb-5 flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Chapters
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <Pencil size={22} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Edit Chapter
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Update chapter details and manga pages.
                  </p>
                </div>
              </div>
            </div>

            <ChapterForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditChapter;
