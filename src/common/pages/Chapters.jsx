import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";

function Chapters() {
  const pages = [1, 2, 3];
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#101116] text-gray-200">
        {/* TOP NAVBAR */}
        <nav className="h-16 border-b border-white/10 bg-[#15161d] px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white text-sm">
              ← Back
            </button>
            <span className="text-white font-bold tracking-wide text-lg">
              STORY<span className="text-violet-500">VERSE</span>
            </span>
          </div>

          <div className="hidden md:block text-sm text-gray-400">
            Reading <span className="text-white">The Shadow Hunter</span>
          </div>

          <button className="text-gray-400 hover:text-white text-sm">
            ☰ Chapters
          </button>
        </nav>

        {/* CHAPTER HEADER */}
        <section className="max-w-5xl mx-auto px-4 pt-10 pb-7 text-center">
          <p className="text-violet-400 text-xs uppercase tracking-[0.25em] mb-3">
            The Shadow Hunter
          </p>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Chapter 05
          </h1>

          <h2 className="text-gray-400 text-lg md:text-xl">
            The Beginning of Darkness
          </h2>

          <p className="text-gray-600 text-xs mt-4">
            Published November 05, 2026
          </p>
        </section>

        {/* CHAPTER NAVIGATION - TOP */}
        <div className="max-w-5xl mx-auto px-4 mb-7">
          <div className="flex items-center justify-between bg-[#191a22] border border-white/10 rounded-xl p-3 md:p-4">
            <button className="text-gray-400 hover:text-white text-xs md:text-sm">
              ← <span className="hidden sm:inline">Previous Chapter</span>
              <span className="sm:hidden">Previous</span>
            </button>

            <span className="text-gray-500 text-xs md:text-sm">Chapter 05</span>

            <button className="text-violet-400 hover:text-violet-300 text-xs md:text-sm">
              <span className="hidden sm:inline">Next Chapter</span>
              <span className="sm:hidden">Next</span> →
            </button>
          </div>
        </div>

        {/* READING MODE SELECTOR */}
        <section className="max-w-5xl mx-auto px-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-medium text-sm">Reading Mode</h3>
              <p className="text-gray-500 text-xs mt-1">
                Choose how you want to read
              </p>
            </div>

            <div className="flex items-center bg-[#1a1b23] border border-white/10 rounded-lg p-1 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-md bg-violet-600 text-white text-sm font-medium">
                ☷ Scroll
              </button>

              <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-md text-gray-400 hover:text-white text-sm">
                ▣ Single Page
              </button>
            </div>
          </div>
        </section>

        {/* READING AREA */}
        <main className="max-w-3xl mx-auto px-3 md:px-5">
          <div className="space-y-1">
            {pages.map((page) => (
              <div key={page} className="relative bg-[#20212a] overflow-hidden">
                <img
                  src={`https://placehold.co/900x1300/20212a/e5e7eb?text=MANGA+PAGE+${page}`}
                  alt={`Manga page ${page}`}
                  className="block w-full h-auto"
                />

                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  Page {page}
                </span>
              </div>
            ))}
          </div>

          {/* PAGE NAVIGATION */}
          <div className="flex items-center justify-between py-8 border-b border-white/10">
            <button className="px-4 py-3 rounded-lg border border-white/10 text-gray-400 text-sm hover:bg-white/5">
              ← Previous Page
            </button>

            <span className="text-gray-500 text-sm">
              Page <span className="text-white">03</span> / 32
            </span>

            <button className="px-4 py-3 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-500">
              Next Page →
            </button>
          </div>
        </main>

        {/* CHAPTER NAVIGATION - BOTTOM */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-[#191a22] border border-white/10 rounded-xl p-5 md:p-6">
            <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-5">
              End of Chapter 05
            </p>

            <div className="flex items-center justify-between gap-3">
              <button className="flex-1 py-3 border border-white/10 rounded-lg text-gray-300 hover:bg-white/5 text-xs md:text-sm">
                ← Previous Chapter
              </button>

              <button className="flex-1 py-3 bg-violet-600 rounded-lg text-white hover:bg-violet-500 text-xs md:text-sm">
                Next Chapter →
              </button>
            </div>

            <button className="block mx-auto mt-5 text-gray-500 hover:text-violet-400 text-sm">
              ↑ Back to Top
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Chapters;
