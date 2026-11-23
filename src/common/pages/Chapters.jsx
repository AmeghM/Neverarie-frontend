import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import {
  useNavigate,
  useParams,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getPublicChapterByIdAPI } from "../../services/allAPI";
import {
  ChevronLeft,
  BookOpen,
  ChevronRight,
  List,
  Layers,
  ArrowUp,
  ArrowLeft,
} from "lucide-react";

function Chapters() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedMode = searchParams.get("mode");

  const [chapter, setChapter] = useState(null);
  const [book, setBook] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [readingMode, setReadingMode] = useState("scroll");

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError("");

        setChapter(null);
        setBook(null);
        setPreviousChapter(null);
        setNextChapter(null);
        setCurrentPage(0);

        const res = await getPublicChapterByIdAPI(chapterId, requestedMode);
        setChapter(res.data.chapter);
        setBook(res.data.book);

        setPreviousChapter(res.data.prevChapter);
        setNextChapter(res.data.nextChapter);
      } catch (error) {
        console.error("Chapter fetch error:", error);
        setError(error.response?.data?.message || "Failed to load chapter");
      } finally {
        setLoading(false);
      }
    };
    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId, requestedMode]);

  const pages = chapter?.pages
    ? [...chapter.pages].sort((a, b) => a.pageNumber - b.pageNumber)
    : [];

  const totalPages = pages.length;

  const novel = Boolean(chapter?.content?.trim());
  const comic = Boolean(chapter?.pages?.length);
  const formatMode =
    requestedMode === "novel" && novel
      ? "novel"
      : requestedMode === "comic" && comic
        ? "comic"
        : comic
          ? "comic"
          : novel
            ? "novel"
            : "none";

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Loading screen
  if (loading) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-[#101116] text-white flex items-center justify-center">
          <p className="text-gray-400">Loading chapter...</p>
        </div>

        <Footer />
      </>
    );
  }

  // Error screen
  if (error || !chapter || !book) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-[#101116] text-white flex flex-col items-center justify-center gap-4 px-5">
          <BookOpen size={45} className="text-gray-500" />

          <h2 className="text-xl font-semibold">
            {error || "Chapter not found"}
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500"
          >
            Go Back
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen  bg-[#101116] text-gray-200">
        <div className="max-w-5xl mx-auto px-4 pt-24 sm:pt-28">
          <button
            onClick={() => navigate(`/books/${book.slug}`)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg
    text-violet-400 hover:text-white hover:bg-white/6
    border border-white/8 transition-all text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Book</span>
          </button>
        </div>

        {/* CHAPTER HEADER */}
        <section className="max-w-5xl mx-auto px-4 pt-7  pb-7 text-center">
          <p className="text-violet-400 text-xs uppercase tracking-[0.25em] mb-3">
            {book.title}
          </p>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Chapter {String(chapter.chapterNumber).padStart(2, "0")}
          </h1>

          <h2 className="text-gray-400 text-lg md:text-xl">{chapter.title}</h2>

          <p className="text-gray-600 text-xs mt-4">
            Published{" "}
            {formatDate(
              formatMode === "novel"
                ? chapter.novelPublishedAt
                : chapter.comicPublishedAt,
            )}
          </p>
        </section>

        {/* CHAPTER NAVIGATION - TOP */}
        <div className="max-w-5xl mx-auto px-4 mb-7">
          <div className="flex items-center justify-between bg-[#191a22] border border-white/10 rounded-xl p-3 md:p-4">
            {previousChapter ? (
              <Link
                to={`/book/chapter/${previousChapter._id}?mode=${formatMode}`}
                className="text-gray-400 hover:text-white text-xs md:text-sm flex items-center gap-1"
              >
                <ChevronLeft size={17} />
                <span className="hidden sm:inline">Previous Chapter</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <span className="text-gray-600 text-xs md:text-sm">
                <ChevronLeft size={17} className="inline" />
                Previous
              </span>
            )}

            <span className="text-gray-500 text-xs md:text-sm">
              Chapter {chapter.chapterNumber}
            </span>

            {nextChapter ? (
              <Link
                to={`/book/chapter/${nextChapter._id}?mode=${formatMode}`}
                className="text-violet-400 hover:text-violet-300 text-xs md:text-sm flex items-center gap-1"
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight size={17} />
              </Link>
            ) : (
              <span className="text-gray-600 text-xs md:text-sm">
                Next
                <ChevronRight size={17} className="inline" />
              </span>
            )}
          </div>
        </div>

        {/* READING MODE SELECTOR */}
        {formatMode === "comic" && (
          <section className="max-w-5xl mx-auto px-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-medium text-sm">
                  Comic Reading Mode
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  Choose how you want to view pages
                </p>
              </div>

              <div className="flex items-center bg-[#1a1b23] border border-white/10 rounded-lg p-1 w-full sm:w-auto">
                <button
                  onClick={() => setReadingMode("scroll")}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    readingMode === "scroll"
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List size={16} />
                  Scroll
                </button>

                <button
                  onClick={() => setReadingMode("single")}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    readingMode === "single"
                      ? "bg-violet-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Layers size={16} />
                  Single Page
                </button>
              </div>
            </div>
          </section>
        )}

        {/* READING AREA */}

        {/* READING AREA */}

        <main
          className={`mx-auto px-3 md:px-5 ${
            formatMode === "novel" ? "max-w-3xl" : "max-w-3xl"
          }`}
        >
          {/* NOVEL READER */}
          {formatMode === "novel" && (
            <article className="rounded-xl border border-white/[0.06] bg-[#191a22] px-5 py-8 sm:px-10 sm:py-12 md:px-14">
              {/* Novel Header */}
              <div className="text-center mb-10 pb-8 border-b border-white/10">
                <p className="text-violet-400 text-xs uppercase tracking-[0.2em] mb-3">
                  Novel Edition
                </p>

                <h2 className="text-white text-xl sm:text-2xl font-semibold">
                  {chapter.title}
                </h2>

                <p className="text-gray-500 text-xs mt-3">
                  Chapter {chapter.chapterNumber}
                </p>
              </div>

              {/* Novel Content */}
              <div className="max-w-2xl mx-auto">
                {chapter.content?.trim() ? (
                  chapter.content
                    .trim()
                    .split(/\n\s*\n/)
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-300 text-[15px] sm:text-base leading-8 sm:leading-9 mb-7 whitespace-pre-line text-justify"
                      >
                        {paragraph.trim()}
                      </p>
                    ))
                ) : (
                  <p className="text-center text-gray-500 py-10">
                    No novel content available.
                  </p>
                )}
              </div>

              {/* End of Novel */}
              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-600">
                  End of Chapter {chapter.chapterNumber}
                </p>
              </div>
            </article>
          )}

          {/* COMIC READER */}
          {formatMode === "comic" && totalPages > 0 && (
            <>
              {/* SCROLL MODE */}
              {readingMode === "scroll" && (
                <div className="space-y-1">
                  {pages.map((page) => (
                    <div
                      key={page._id || page.pageNumber}
                      className="relative bg-[#20212a] overflow-hidden"
                    >
                      <img
                        src={page.imageUrl}
                        alt={`Manga page ${page.pageNumber}`}
                        loading={page.pageNumber <= 2 ? "eager" : "lazy"}
                        className="block w-full h-auto"
                      />

                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                        Page {page.pageNumber}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* SINGLE PAGE MODE */}
              {readingMode === "single" && (
                <>
                  <div className="relative bg-[#20212a] overflow-hidden">
                    <img
                      src={pages[currentPage].imageUrl}
                      alt={`Manga page ${pages[currentPage].pageNumber}`}
                      className="block w-full h-auto"
                    />

                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      Page {pages[currentPage].pageNumber}
                    </span>
                  </div>

                  {/* PAGE NAVIGATION */}
                  <div className="flex items-center justify-between gap-2 py-8 border-b border-white/10">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 0}
                      className="px-3 sm:px-4 py-3 rounded-lg border border-white/10 text-gray-400 text-xs sm:text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} className="inline" />
                      Previous Page
                    </button>

                    <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                      Page{" "}
                      <span className="text-white">
                        {pages[currentPage].pageNumber}
                      </span>
                      {" / "}
                      {totalPages}
                    </span>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages - 1}
                      className="px-3 sm:px-4 py-3 rounded-lg bg-violet-600 text-white text-xs sm:text-sm hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next Page
                      <ChevronRight size={16} className="inline" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* EMPTY STATE */}
          {formatMode === "none" && (
            <div className="text-center py-20 bg-[#191a22] rounded-xl border border-white/10">
              <BookOpen size={40} className="mx-auto text-gray-500 mb-4" />

              <h3 className="text-white font-semibold">No content available</h3>

              <p className="text-gray-500 text-sm mt-2">
                This chapter doesn't have any published content.
              </p>
            </div>
          )}
        </main>

        {/* CHAPTER NAVIGATION - BOTTOM */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-[#191a22] border border-white/10 rounded-xl p-5 md:p-6">
            <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-5">
              End of Chapter {chapter.chapterNumber}
            </p>

            <div className="flex items-center justify-between gap-3">
              {previousChapter ? (
                <Link
                  to={`/book/chapter/${previousChapter._id}?mode=${formatMode}`}
                  className="flex-1 py-3 border border-white/10 rounded-lg text-center text-gray-300 hover:bg-white/5 text-xs md:text-sm"
                >
                  ← Previous Chapter
                </Link>
              ) : (
                <button
                  disabled
                  className="flex-1 py-3 border border-white/10 rounded-lg text-gray-600 text-xs md:text-sm"
                >
                  ← Previous Chapter
                </button>
              )}

              {nextChapter ? (
                <Link
                  to={`/book/chapter/${nextChapter._id}?mode=${formatMode}`}
                  className="flex-1 py-3 bg-violet-600 rounded-lg text-center text-white hover:bg-violet-500 text-xs md:text-sm"
                >
                  Next Chapter →
                </Link>
              ) : (
                <button
                  disabled
                  className="flex-1 py-3 bg-gray-700 rounded-lg text-gray-500 text-xs md:text-sm"
                >
                  Next Chapter →
                </button>
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 mx-auto mt-5 text-gray-500 hover:text-violet-400 text-sm"
            >
              <ArrowUp size={16} />
              Back to Top
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Chapters;
