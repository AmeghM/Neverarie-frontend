import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Upload,
  ImagePlus,
  X,
  ArrowUp,
  ArrowDown,
  Save,
  CalendarClock,
  FileEdit,
  Send,
} from "lucide-react";
import { addChapterAPI } from "../../services/allAPI";

function ChapterForm() {
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  const isEdit = Boolean(chapterId);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  const [title, setTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");

  const [status, setStatus] = useState("Draft");
  const [scheduledAt, setScheduledAt] = useState("");

  const [newPages, setNewPages] = useState([]);
  const [existingPages, setExistingPages] = useState([]);

  // Add selected images
  const handlePageUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    setNewPages((previous) => [
      ...previous,
      ...validFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);

    event.target.value = "";
  };

  // Remove newly selected image
  const removeNewPage = (id) => {
    setNewPages((previous) => {
      const page = previous.find((item) => item.id === id);

      if (page) URL.revokeObjectURL(page.preview);

      return previous.filter((item) => item.id !== id);
    });
  };

  // Move newly selected image up or down
  const moveNewPage = (index, direction) => {
    setNewPages((previous) => {
      const updated = [...previous];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= updated.length) {
        return previous;
      }

      [updated[index], updated[targetIndex]] = [
        updated[targetIndex],
        updated[index],
      ];

      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || chapterNumber === "") {
      alert("Please enter the chapter title and number.");
      return;
    }

    if (status === "Scheduled" && !scheduledAt) {
      alert("Please select a scheduled publishing date and time.");
      return;
    }

    if (!isEdit && newPages.length === 0) {
      alert("Please upload at least one manga page.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("chapterNumber", chapterNumber);

      formData.append("status", status);

      if (status === "Scheduled") {
        formData.append("scheduledAt", scheduledAt);
      }

      // Upload newly selected page images in their current order
      newPages.forEach((page) => {
        formData.append("pages", page.file);
      });

      const res = await addChapterAPI(bookId, formData);

      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to create chapter");
      }

      alert("Chapter created successfully!");

      navigate(`/admin/books/${bookId}/chapters`);
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center text-sm text-gray-400">
        Loading chapter details...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Chapter details */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Chapter Details</h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the basic information about this chapter.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Chapter Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Beginning"
              required
              className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Chapter Number *
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={chapterNumber}
              onChange={(e) => setChapterNumber(e.target.value)}
              placeholder="e.g. 1"
              required
              className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Publishing Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
            >
              <option value="Draft">Save as Draft</option>
              <option value="Published">Publish Now</option>
              <option value="Scheduled">Schedule Publishing</option>
            </select>
          </div>

          {status === "Scheduled" && (
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Publishing Date and Time *
              </label>

              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required
                className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
              />
            </div>
          )}
        </div>
      </section>

      {/* Manga page uploads */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Manga Pages</h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload your chapter pages as images. You can select multiple images.
          </p>
        </div>

        {/* Upload area */}
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#09090B] px-5 py-10 text-center transition hover:border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/5">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8B5CF6]/10 text-[#A78BFA]">
            <ImagePlus size={27} />
          </div>

          <p className="font-medium text-white">Click to upload manga pages</p>

          <p className="mt-2 text-xs text-gray-500">
            PNG, JPG, WEBP and other image formats
          </p>

          <span className="mt-4 flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white">
            <Upload size={15} />
            Choose Images
          </span>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePageUpload}
            className="hidden"
          />
        </label>

        {/* Existing pages */}
        {existingPages.length > 0 && (
          <div className="mt-7">
            <h3 className="mb-4 text-sm font-semibold text-gray-300">
              Currently Uploaded Pages ({existingPages.length})
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {existingPages.map((page, index) => (
                <div
                  key={page._id || page.id || index}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#09090B]"
                >
                  <img
                    src={page.imageUrl || page.url}
                    alt={`Chapter page ${index + 1}`}
                    className="aspect-3/4 w-full object-contain"
                  />

                  <p className="p-2 text-xs text-gray-400">
                    Existing Page {index + 1}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Existing pages are preserved. Newly uploaded images will be added
              after them.
            </p>
          </div>
        )}

        {/* New page previews */}
        {newPages.length > 0 && (
          <div className="mt-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-gray-300">
                New Pages ({newPages.length})
              </h3>

              <p className="text-xs text-gray-500">
                Use arrows to change their upload order.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {newPages.map((page, index) => (
                <div
                  key={page.id}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#09090B]"
                >
                  <div className="relative">
                    <img
                      src={page.preview}
                      alt={`New manga page ${index + 1}`}
                      className="aspect-3/4 w-full object-contain"
                    />

                    <span className="absolute left-2 top-2 rounded-md bg-black/80 px-2 py-1 text-xs text-white">
                      Page {existingPages.length + index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeNewPage(page.id)}
                      className="absolute right-2 top-2 rounded-lg bg-black/80 p-2 text-red-400 hover:bg-red-500 hover:text-white"
                      title="Remove page"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 p-2">
                    <span className="truncate text-[10px] text-gray-500">
                      {page.file.name}
                    </span>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveNewPage(index, -1)}
                        className="rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        <ArrowUp size={14} />
                      </button>

                      <button
                        type="button"
                        disabled={index === newPages.length - 1}
                        onClick={() => moveNewPage(index, 1)}
                        className="rounded-md p-1 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {existingPages.length === 0 && newPages.length === 0 && (
          <p className="mt-5 text-center text-xs text-gray-500">
            No manga pages selected yet.
          </p>
        )}
      </section>

      {/* Publishing information */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-7">
        <h2 className="text-lg font-semibold">Publishing</h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose when this chapter should become available to readers.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatusOption
            active={status === "Draft"}
            onClick={() => setStatus("Draft")}
            icon={FileEdit}
            title="Save Draft"
            description="Keep it unpublished."
          />

          <StatusOption
            active={status === "Published"}
            onClick={() => setStatus("Published")}
            icon={Send}
            title="Publish Now"
            description="Make it available immediately."
          />

          <StatusOption
            active={status === "Scheduled"}
            onClick={() => setStatus("Scheduled")}
            icon={CalendarClock}
            title="Schedule"
            description="Publish at a later time."
          />
        </div>
      </section>

      {/* Form actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(`/admin/chapters/${bookId}`)}
          disabled={loading}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Chapter"}
        </button>
      </div>
    </form>
  );
}

function StatusOption({ active, onClick, icon: Icon, title, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        active
          ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
          : "border-white/10 bg-[#09090B] hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <Icon
          size={20}
          className={active ? "text-[#A78BFA]" : "text-gray-500"}
        />

        <span
          className={`h-3 w-3 rounded-full border ${
            active ? "border-[#8B5CF6] bg-[#8B5CF6]" : "border-gray-600"
          }`}
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </button>
  );
}

export default ChapterForm;
