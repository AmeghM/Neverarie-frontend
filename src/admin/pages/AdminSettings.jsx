import { useEffect, useState } from "react";
import {
  Image,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Link as LinkIcon,
  CheckCircle2,
  BookOpen,
  LoaderCircle,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import {
  getAllBooksAPI,
  getHomepageSettingsAPI,
  updateHomepageSettingsAPI,
} from "../../services/allAPI";

function getResponseData(response) {
  return response?.data?.data ?? response?.data ?? response;
}

function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [books, setBooks] = useState([]);
  const [settings, setSettings] = useState({
    featuredBook: "",
    primaryButtonText: "Read Now",
    backgroundImage: "",
    backgroundImageFileId: "",
    backgroundPosition: "center",
    overlayStrength: 70,
    visible: true,
  });
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [previewBackground, setPreviewBackground] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load books and existing homepage settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const [bookResponse, settingsResponse] = await Promise.all([
          getAllBooksAPI(),
          getHomepageSettingsAPI(),
        ]);

        const bookData = getResponseData(bookResponse);
        const settingsData = getResponseData(settingsResponse);

        // Support either an array or a controller response containing books
        const bookList = Array.isArray(bookData)
          ? bookData
          : bookData?.books || bookData?.allBooks || [];

        // Only published books can be featured
        setBooks(bookList.filter((book) => book.status === "Published"));

        const currentSettings = settingsData || {};

        setSettings({
          featuredBook:
            currentSettings.featuredBook?._id ||
            currentSettings.featuredBook ||
            "",
          primaryButtonText: currentSettings.primaryButtonText || "Read Now",
          backgroundImage: currentSettings.backgroundImage || "",
          backgroundImageFileId: currentSettings.backgroundImageFileId || "",
          backgroundPosition: currentSettings.backgroundPosition || "center",
          overlayStrength: currentSettings.overlayStrength ?? 70,
          visible: currentSettings.visible ?? true,
        });
      } catch (err) {
        console.error("Homepage settings loading error:", err);
        setError(
          err?.response?.data?.message ||
            "Unable to load homepage settings. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const selectedBook = books.find((book) => book._id === settings.featuredBook);

  const updateSetting = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  // const handleSave = async () => {
  //   if (!settings.featuredBook) {
  //     setError("Please select a published book first.");
  //     return;
  //   }

  //   try {
  //     setSaving(true);
  //     setError("");
  //     setSaved(false);

  //     const reqBody = {
  //       featuredBook: settings.featuredBook,
  //       primaryButtonText: settings.primaryButtonText,
  //       backgroundImage: settings.backgroundImage,
  //       backgroundImageFileId: settings.backgroundImageFileId,
  //       backgroundPosition: settings.backgroundPosition,
  //       overlayStrength: Number(settings.overlayStrength),
  //       visible: settings.visible,
  //     };

  //     await updateHomepageSettingsAPI(reqBody);

  //     setSaved(true);
  //   } catch (err) {
  //     console.error("Homepage settings save error:", err);
  //     setError(
  //       err?.response?.data?.message ||
  //         "Unable to save homepage settings. Please try again.",
  //     );
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSave = async () => {
    if (!settings.featuredBook) {
      setError("Please select a published book first.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSaved(false);

      const formData = new FormData();

      formData.append("featuredBook", settings.featuredBook);
      formData.append("primaryButtonText", settings.primaryButtonText);
      formData.append("backgroundPosition", settings.backgroundPosition);
      formData.append("overlayStrength", settings.overlayStrength);
      formData.append("visible", settings.visible);

      if (backgroundFile) {
        formData.append("backgroundFile", backgroundFile);
      }

      await updateHomepageSettingsAPI(formData);

      setSaved(true);
      setBackgroundFile(null);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save homepage settings.",
      );
    } finally {
      setSaving(false);
    }
  };
  const handleReset = () => {
    setSettings({
      featuredBook: "",
      primaryButtonText: "Read Now",
      backgroundImage: "",
      backgroundImageFileId: "",
      backgroundPosition: "center",
      overlayStrength: 70,
      visible: true,
    });

    setSaved(false);
    setError("");
  };
  useEffect(() => {
    if (!backgroundFile) {
      setPreviewBackground(settings.backgroundImage);
      return;
    }

    const imageUrl = URL.createObjectURL(backgroundFile);
    setPreviewBackground(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [backgroundFile, settings.backgroundImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="min-h-screen lg:pl-72">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

          <div className="flex min-h-[70vh] items-center justify-center gap-3 text-sm text-gray-400">
            <LoaderCircle className="animate-spin text-[#A78BFA]" size={20} />
            Loading homepage settings...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-7 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Page heading */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-sm text-[#8B5CF6]">
                  Website Management
                </p>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  Website Settings
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                  Manage the featured story displayed on your homepage.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Success and error messages */}
            {saved && (
              <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                <CheckCircle2 size={18} />
                Homepage settings saved successfully.
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Section information */}
            <div className="rounded-xl border border-white/8 bg-[#111114] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#8B5CF6]/10 p-3 text-[#A78BFA]">
                  <Image size={22} />
                </div>

                <div>
                  <h2 className="font-semibold">Homepage Hero Section</h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    Choose which published book appears in your homepage banner
                    and customize its background and button.
                  </p>
                </div>
              </div>
            </div>

            {/* Main editor layout */}
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
              {/* Editor */}
              <div className="space-y-6">
                {/* Featured book */}
                <section className="rounded-xl border border-white/8 bg-[#111114] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                      <BookOpen size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold">Featured Book</h2>
                      <p className="text-xs text-gray-500">
                        Select a published book for your homepage
                      </p>
                    </div>
                  </div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Select Book
                  </label>

                  <select
                    value={settings.featuredBook}
                    onChange={(e) =>
                      updateSetting("featuredBook", e.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none transition focus:border-[#8B5CF6]"
                  >
                    <option value="">Choose a published book</option>

                    {books.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.title}
                      </option>
                    ))}
                  </select>

                  {books.length === 0 && (
                    <p className="mt-3 text-xs text-amber-400">
                      No published books found. Publish a book before featuring
                      it.
                    </p>
                  )}

                  {selectedBook && (
                    <div className="mt-5 flex gap-4 rounded-lg border border-white/10 bg-[#09090B] p-3">
                      {selectedBook.coverImage ? (
                        <img
                          src={selectedBook.coverImage}
                          alt={selectedBook.title}
                          className="h-24 w-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-16 items-center justify-center rounded-md bg-[#8B5CF6]/10 text-[#A78BFA]">
                          <BookOpen size={24} />
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {selectedBook.title}
                        </h3>
                        <p className="mt-1 text-xs text-green-400">Published</p>
                        <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-400">
                          {selectedBook.description}
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="mt-3 text-xs text-gray-500">
                    The homepage heading and description will automatically use
                    the selected book's details.
                  </p>
                </section>

                {/* Background image */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                      <Image size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold">Background Image</h2>
                      <p className="text-xs text-gray-500">
                        Set the wide homepage banner artwork
                      </p>
                    </div>
                  </div>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#09090B] px-5 py-8 text-center transition hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5">
                    <Image size={28} className="mb-3 text-[#A78BFA]" />

                    <p className="text-sm font-medium text-white">
                      {backgroundFile
                        ? backgroundFile.name
                        : "Click to upload image"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Choose a landscape image from your device
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setBackgroundFile(file);
                          setSaved(false);
                          setError("");
                        }
                      }}
                    />
                  </label>

                  {(backgroundFile || settings.backgroundImage) && (
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm text-gray-300">Preview</p>

                        <button
                          type="button"
                          onClick={() => {
                            setBackgroundFile(null);
                            updateSetting("backgroundImage", "");
                            updateSetting("backgroundImageFileId", "");
                          }}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>

                      <img
                        src={previewBackground}
                        alt="Background preview"
                        className="h-40 w-full rounded-lg border border-white/10 object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Background Position
                    </label>

                    <select
                      value={settings.backgroundPosition}
                      onChange={(e) =>
                        updateSetting("backgroundPosition", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
                    >
                      <option value="center">Center</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">
                        Overlay Strength
                      </label>
                      <span className="text-sm font-medium text-[#A78BFA]">
                        {settings.overlayStrength}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.overlayStrength}
                      onChange={(e) =>
                        updateSetting("overlayStrength", Number(e.target.value))
                      }
                      className="w-full accent-[#8B5CF6]"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Controls how dark the background appears behind the text.
                    </p>
                  </div>
                </section>

                {/* Primary button */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                      <LinkIcon size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold">Hero Button</h2>
                      <p className="text-xs text-gray-500">
                        Customize the main call-to-action button
                      </p>
                    </div>
                  </div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Button Text
                  </label>

                  <input
                    type="text"
                    value={settings.primaryButtonText}
                    onChange={(e) =>
                      updateSetting("primaryButtonText", e.target.value)
                    }
                    placeholder="e.g. Read Now"
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none focus:border-[#8B5CF6]"
                  />

                  <p className="mt-3 text-xs text-gray-500">
                    The button will open the selected book's page on your
                    website.
                  </p>
                </section>

                {/* Visibility */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                        {settings.visible ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </div>

                      <div>
                        <h2 className="font-semibold">Hero Visibility</h2>
                        <p className="text-xs text-gray-500">
                          Show or hide this hero section
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        updateSetting("visible", !settings.visible)
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        settings.visible ? "bg-[#8B5CF6]" : "bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          settings.visible ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </section>
              </div>

              {/* Live preview */}
              <div className="xl:sticky xl:top-24 xl:self-start">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Live Preview</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Preview your homepage hero content
                    </p>
                  </div>

                  <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#A78BFA]">
                    Preview
                  </span>
                </div>

                <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-xl border border-white/10 bg-[#100D1C] p-6 sm:p-8">
                  {previewBackground && (
                    <img
                      src={previewBackground}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectPosition: settings.backgroundPosition,
                      }}
                    />
                  )}

                  <div
                    className="absolute inset-0 bg-black"
                    style={{
                      opacity: Number(settings.overlayStrength) / 100,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-[#100D1C]/90 via-[#100D1C]/60 to-transparent" />

                  <div className="relative z-10 max-w-lg">
                    {settings.visible ? (
                      selectedBook ? (
                        <>
                          <h3 className="text-3xl font-bold leading-tight text-[#C4B5FD] sm:text-4xl">
                            {selectedBook.title}
                          </h3>

                          <p className="mt-5 line-clamp-4 text-sm leading-7 text-violet-100/70">
                            {selectedBook.description}
                          </p>

                          <div className="mt-7">
                            <span className="inline-flex rounded-lg bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-[#171126]">
                              {settings.primaryButtonText || "Read Now"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="rounded-lg border border-white/10 bg-black/50 p-5">
                          <BookOpen size={28} className="mb-3 text-[#A78BFA]" />
                          <p className="font-semibold">
                            Select a featured book
                          </p>
                          <p className="mt-1 text-sm text-gray-400">
                            Your selected book's title and description will
                            appear here.
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-black/50 p-5">
                        <EyeOff size={28} className="mb-3 text-gray-400" />
                        <p className="font-semibold">Hero section is hidden</p>
                        <p className="mt-1 text-sm text-gray-400">
                          Turn on visibility to display the hero.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                  This preview shows the selected book content and your
                  background settings.
                </p>
              </div>
            </div>

            {/* Bottom save action */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500">
                Remember to save your changes before leaving this page.
              </p>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-6 py-3 text-sm font-medium transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
