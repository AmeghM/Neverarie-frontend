import { useState } from "react";
import {
  Image,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Type,
  Link,
  AlignLeft,
  CheckCircle2,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

const defaultSlide = {
  id: "slide-1",
  eyebrow: "WELCOME TO OUR WORLD",
  title: "Discover Stories Beyond Imagination",
  description:
    "Explore original stories, unforgettable characters, and incredible worlds.",
  backgroundImage: "",
  primaryButtonText: "Explore Books",
  primaryButtonLink: "/books",
  secondaryButtonText: "Learn More",
  secondaryButtonLink: "/about",
  visible: true,
};

function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Keep the hero content inside a slide object.
  // Later, multiple slide objects can be added for the carousel.
  const [slides, setSlides] = useState([defaultSlide]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [saved, setSaved] = useState(false);

  const currentSlide = slides[activeSlide];

  const updateSlide = (field, value) => {
    setSlides((prev) =>
      prev.map((slide, index) =>
        index === activeSlide ? { ...slide, [field]: value } : slide,
      ),
    );

    setSaved(false);
  };

  const handleSave = () => {
    // Frontend demo only.
    // Later, save this data through your backend.
    console.log("Hero settings:", slides);
    setSaved(true);
  };

  const handleReset = () => {
    setSlides([defaultSlide]);
    setActiveSlide(0);
    setSaved(false);
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
                  Manage the hero section displayed on your homepage.
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
                  className="flex items-center gap-2 rounded-lg bg-[#8B5CF6] px-5 py-2.5 text-sm font-medium transition hover:bg-[#7C3AED]"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Save message */}
            {saved && (
              <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                <CheckCircle2 size={18} />
                Changes saved in this demo.
              </div>
            )}

            {/* Section information */}
            <div className="rounded-xl border border-white/[0.08] bg-[#111114] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#8B5CF6]/10 p-3 text-[#A78BFA]">
                  <Image size={22} />
                </div>

                <div>
                  <h2 className="font-semibold">Homepage Hero Section</h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    Edit the main banner visitors see when they open your
                    website. You can change its text, background image, and
                    navigation buttons.
                  </p>
                </div>
              </div>
            </div>

            {/* Main editor layout */}
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
              {/* Editor */}
              <div className="space-y-6">
                {/* Hero content */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                      <Type size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold">Hero Content</h2>
                      <p className="text-xs text-gray-500">
                        Main text displayed on your homepage
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Small Label
                      </label>

                      <input
                        type="text"
                        value={currentSlide.eyebrow}
                        onChange={(e) => updateSlide("eyebrow", e.target.value)}
                        placeholder="e.g. WELCOME TO OUR WORLD"
                        className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none transition focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Main Heading
                      </label>

                      <textarea
                        rows={2}
                        value={currentSlide.title}
                        onChange={(e) => updateSlide("title", e.target.value)}
                        placeholder="Enter your hero heading"
                        className="w-full resize-none rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none transition focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Description
                      </label>

                      <textarea
                        rows={4}
                        value={currentSlide.description}
                        onChange={(e) =>
                          updateSlide("description", e.target.value)
                        }
                        placeholder="Write a short introduction..."
                        className="w-full resize-none rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none transition focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
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
                        Set the hero section background
                      </p>
                    </div>
                  </div>

                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Image URL
                  </label>

                  <input
                    type="text"
                    value={currentSlide.backgroundImage}
                    onChange={(e) =>
                      updateSlide("backgroundImage", e.target.value)
                    }
                    placeholder="Paste your image URL here"
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none transition focus:border-[#8B5CF6]"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Use a publicly accessible image URL for this frontend demo.
                    Later, you can add an image upload option.
                  </p>

                  {currentSlide.backgroundImage && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
                      <img
                        src={currentSlide.backgroundImage}
                        alt="Hero background preview"
                        className="h-40 w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </section>

                {/* Buttons */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                      <Link size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold">Hero Buttons</h2>
                      <p className="text-xs text-gray-500">
                        Customize the buttons and their destinations
                      </p>
                    </div>
                  </div>

                  {/* Primary button */}
                  <div className="space-y-4">
                    <div>
                      <p className="mb-3 text-sm font-medium text-[#A78BFA]">
                        Primary Button
                      </p>

                      <label className="mb-2 block text-sm text-gray-400">
                        Button Text
                      </label>

                      <input
                        type="text"
                        value={currentSlide.primaryButtonText}
                        onChange={(e) =>
                          updateSlide("primaryButtonText", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Button Link
                      </label>

                      <input
                        type="text"
                        value={currentSlide.primaryButtonLink}
                        onChange={(e) =>
                          updateSlide("primaryButtonLink", e.target.value)
                        }
                        placeholder="/books"
                        className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div className="my-6 border-t border-white/[0.08]" />

                  {/* Secondary button */}
                  <div className="space-y-4">
                    <div>
                      <p className="mb-3 text-sm font-medium text-gray-300">
                        Secondary Button
                      </p>

                      <label className="mb-2 block text-sm text-gray-400">
                        Button Text
                      </label>

                      <input
                        type="text"
                        value={currentSlide.secondaryButtonText}
                        onChange={(e) =>
                          updateSlide("secondaryButtonText", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none focus:border-[#8B5CF6]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Button Link
                      </label>

                      <input
                        type="text"
                        value={currentSlide.secondaryButtonLink}
                        onChange={(e) =>
                          updateSlide("secondaryButtonLink", e.target.value)
                        }
                        placeholder="/about"
                        className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
                </section>

                {/* Visibility */}
                <section className="rounded-xl border border-white/[0.08] bg-[#111114] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#8B5CF6]/10 p-2.5 text-[#A78BFA]">
                        {currentSlide.visible ? (
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
                        updateSlide("visible", !currentSlide.visible)
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        currentSlide.visible ? "bg-[#8B5CF6]" : "bg-gray-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          currentSlide.visible ? "left-6" : "left-1"
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
                      Preview your homepage hero design
                    </p>
                  </div>

                  <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1 text-xs text-[#A78BFA]">
                    Preview
                  </span>
                </div>

                <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-xl border border-white/10 bg-[#18181B] p-6 sm:p-8">
                  {currentSlide.backgroundImage && (
                    <img
                      src={currentSlide.backgroundImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

                  <div className="relative z-10 max-w-lg">
                    {currentSlide.visible ? (
                      <>
                        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#A78BFA]">
                          {currentSlide.eyebrow}
                        </p>

                        <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
                          {currentSlide.title}
                        </h3>

                        <p className="mt-5 text-sm leading-7 text-gray-300">
                          {currentSlide.description}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                          <span className="rounded-lg bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white">
                            {currentSlide.primaryButtonText}
                          </span>

                          <span className="rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                            {currentSlide.secondaryButtonText}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-black/50 p-5">
                        <EyeOff size={28} className="mb-3 text-gray-400" />
                        <p className="font-semibold">Hero section is hidden</p>
                        <p className="mt-1 text-sm text-gray-400">
                          Turn on visibility to display the preview.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                  This is an approximate preview. Your actual homepage may use
                  different spacing, typography, and responsive styling.
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
                className="flex items-center justify-center gap-2 rounded-lg bg-[#8B5CF6] px-6 py-3 text-sm font-medium transition hover:bg-[#7C3AED]"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
