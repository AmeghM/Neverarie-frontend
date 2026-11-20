import { useEffect, useState } from "react";
import { Upload, X, Image as ImageIcon, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EMPTY_BOOK = {};
function BookForm({
  initialData = EMPTY_BOOK,
  onSubmit,
  submitLabel = "Save Book",
  loading = false,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    genre: initialData.genre || "",
    author: initialData.author || "",
    tags: initialData.tags?.join(", ") || "",
    status: initialData.status || "Draft",
  });

  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(initialData.coverImage || "");

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      genre: initialData.genre || "",
      author: initialData.author || "",
      tags: initialData.tags?.join(", ") || "",
      status: initialData.status || "Draft",
    });

    setPreview(initialData.coverImage || "");
    setCoverFile(null);
  }, [initialData]);

  useEffect(() => {
    if (!coverFile) return;

    const objectUrl = URL.createObjectURL(coverFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setCoverFile(file);
  };

  const removeImage = () => {
    setCoverFile(null);
    setPreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const bookData = new FormData();

    bookData.append("title", formData.title.trim());
    bookData.append("description", formData.description.trim());
    bookData.append("genre", formData.genre);
    bookData.append("author", formData.author.trim());

    bookData.append(
      "tags",
      JSON.stringify(
        formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    );

    bookData.append("status", formData.status);

    // Cover image
    if (coverFile) {
      bookData.append("coverImage", coverFile);
    }

    // Pass FormData to parent
    onSubmit(bookData);
  };

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-[#111114] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#8B5CF6]";

  const labelStyle = "mb-2 block text-sm font-medium text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Cover Image */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">Book Cover</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload a cover image for your book.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-48 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#09090B]">
            {preview ? (
              <img
                src={preview}
                alt="Book cover preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-600">
                <ImageIcon size={32} />
                <span className="text-xs">No cover</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <label className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 py-3 text-sm font-medium text-[#A78BFA] transition hover:bg-[#8B5CF6]/20">
              <Upload size={17} />
              Upload Cover
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <p className="mt-3 text-xs text-gray-500">
              Recommended: portrait image, JPG, PNG or WebP.
            </p>

            {preview && (
              <button
                type="button"
                onClick={removeImage}
                className="mt-4 flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
              >
                <X size={15} />
                Remove cover
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Basic Information */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Basic Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter the main details about your book.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className={labelStyle}>Book Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label className={labelStyle}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description about your story..."
              rows={5}
              className={`${inputStyle} resize-y`}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelStyle}>Genre *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Dark Fantasy">Dark Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Author Name *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. fantasy, magic, adventure"
              className={inputStyle}
            />
            <p className="mt-2 text-xs text-gray-500">
              Separate multiple tags using commas.
            </p>
          </div>
        </div>
      </section>

      {/* Publishing Settings */}
      <section className="rounded-2xl border border-white/8 bg-[#111114] p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Publishing Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose how this book should appear on your website.
          </p>
        </div>

        <div>
          <label className={labelStyle}>Publishing Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

          <p className="mt-2 text-xs text-gray-500">
            Draft books remain unpublished. Published books can be displayed on
            your public website.
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin/books")}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
        >
          <ArrowLeft size={17} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
