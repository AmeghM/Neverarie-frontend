import Footer from "../components/Footer";
import Header from "../components/Header";
// import BookImg from "../../assets/media/books/ArtoriusCover.jpg";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Bookmark,
  Star,
  BookOpen,
  Sparkles,
  ArrowRight,
  BookImage,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { getPublicChaptersAPI, viewBookAPI } from "../../services/allAPI";

function BookDetails() {
  const [expanded, setExpanded] = useState(false);
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [chapterLoading, setChapterLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [error, setError] = useState("");
  const [chapterError, setChapterError] = useState("");

  const novel = Boolean(selectedChapter?.content?.trim());
  const comic = Boolean(selectedChapter?.pages?.length);

  // format chapter published data
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch chapters
  const fetchChapters = async (bookId) => {
    try {
      setChapterLoading(true);
      setChapterError("");

      const res = await getPublicChaptersAPI(bookId);

      // Newest chapter first
      const chapterList = res.data.chapters || [];

      setChapters(
        [...chapterList].sort((a, b) => b.chapterNumber - a.chapterNumber),
      );
    } catch (error) {
      console.error("Chapter fetch error:", error);

      setChapters([]);
      setChapterError(
        error.response?.data?.message || "Failed to load chapters",
      );
    } finally {
      setChapterLoading(false);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");
        setBook(null);
        setChapters([]);

        const res = await viewBookAPI(slug);
        const bookData = res.data.book;
        setBook(bookData);

        if (bookData?._id) {
          await fetchChapters(bookData._id);
        }
      } catch (error) {
        console.error("Book fetch error:", error);
        setError(
          error.response?.data?.message || "Failed to load book details",
        );
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchBook();
    }
  }, [slug]);
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
          <p className="text-gray-400">Loading book details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !book) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center gap-3">
          <BookOpen size={40} className="text-gray-500" />

          <h2 className="text-xl font-semibold">{error || "Book not found"}</h2>

          <Link to="/" className="text-violet-400 hover:underline">
            Go Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="px-5 sm:px-6 min-h-[90vh] pb-12 pt-28 sm:pt-32 mx-auto max-w-7xl">
        {/* container */}
        <div className="grid grid-cols-1 sm:grid-cols-4  gap-8 w-full items-start">
          {/* image */}
          <div className="flex justify-center sm:justify-start">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full max-w-62.5 aspect-3/4  rounded-xl"
            />
          </div>

          {/* details */}
          <div className="sm:col-span-2 text-white space-y-3 min-w-0">
            <h1 className="text-4xl sm:text-6xl">{book.title}</h1>
            <p className="text-gray-400 text-sm">{book.genre}</p>
            <p>⭐10</p>
            <div className="flex flex-wrap gap-2 text-gray-300 mb-2">
              {book.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-2 border border-gray-600 rounded-3xl text-[12px] inline-block"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Buttons */}
            <div className="flex items-center justify-between mt-4 mb-4">
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    chapters.length > 0 &&
                    setSelectedChapter(chapters[chapters.length - 1])
                  }
                  disabled={chapters.length === 0}
                  className={`px-4 py-2  rounded-lg text-lg ${chapters.length > 0 ? "bg-violet-400 hover:bg-violet-300" : "bg-gray-700 text-gray-400 cursor-not-allowed"} `}
                >
                  Read First
                </button>
                <button
                  onClick={() =>
                    chapters.length > 0 && setSelectedChapter(chapters[0])
                  }
                  disabled={chapters.length === 0}
                  className={`px-4 py-2  rounded-lg text-lg ${chapters.length > 0 ? "bg-purple-600 hover:bg-purple-500" : "bg-gray-700 text-gray-400 cursor-not-allowed"} `}
                >
                  Read Last
                </button>
              </div>

              <div className="flex gap-5">
                <button className="hover:text-violet-400">
                  <Bookmark size={30} />
                </button>
                <button className="hover:text-violet-400">
                  <Star size={30} />
                </button>
              </div>
            </div>
            <div>
              <p className={`text-white ${!expanded ? "line-clamp-3" : ""}`}>
                {book.description}
              </p>
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="text-sm font-semibold text-blue-500 hover:underline"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            </div>
          </div>

          {/* chapter */}
          <div className="text-white bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Chapters</h2>
              </div>
              <span className="text-xs bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full">
                Ongoing
              </span>
            </div>
            <div className="max-h-90 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-600">
              {chapterLoading ? (
                <p className="text-center text-gray-400 py-8 text-sm">
                  Loading chapters...
                </p>
              ) : chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <button
                    key={chapter._id}
                    // to={`/book/chapter/${chapter._id}`}
                    onClick={() => setSelectedChapter(chapter)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-700/30 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30 transition-all text-left group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-700 flex group-hover:bg-violet-500/50 items-center justify-center font-semibold text-gray-200 transition-all">
                      {chapter.chapterNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[12px] font-medium truncate text-gray-200">
                          Chapter {chapter.chapterNumber}
                        </h3>

                        <span className="shrink-0 text-[9px] font-bold bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full">
                          New
                        </span>
                      </div>
                      <p className="text-sm truncate font-medium mt-1">
                        {chapter.title}
                      </p>
                      <div
                        className="flex items-center gap-2 mt-1
                          text-xs text-gray-400"
                      >
                        <span className="italic">
                          {formatDate(
                            chapter.novelStatus === "Published"
                              ? chapter.novelPublishedAt
                              : chapter.comicPublishedAt,
                          )}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BookOpen size={30} className="text-gray-500 mb-3" />

                  <h3 className="text-sm font-semibold">
                    No chapters available
                  </h3>

                  <p className="text-xs text-gray-400 mt-2">
                    Chapters will appear here once published.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* comments */}
      <section className="text-white px-5 sm:px-6 pb-12 pt-28 sm:pt-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 w-full items-start">
          <div className="col-span-3">
            <h2 className="text-xl font-semibold">Comments</h2>
            <div className="w-full bg-gray-900 rounded-2xl min-h-[45vh] flex items-center justify-center mt-3">
              <h3>Digging from the grave</h3>
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-center">Related</h2>
            <div></div>
          </div>
        </div>
      </section>

      {/* recomended */}
      <section></section>

      {/* Reading Mode Selection Overlay */}
      {selectedChapter && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setSelectedChapter(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111113] shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedChapter(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/5 p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>

            {/* Header */}
            <div className="border-b border-white/[0.08] px-6 pb-6 pt-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <BookOpen size={24} />
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Choose your experience
              </p>

              <h2 className="text-xl font-bold text-white sm:text-2xl">
                How would you like to read?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Chapter {selectedChapter.chapterNumber}
                {selectedChapter.title && ` · ${selectedChapter.title}`}
              </p>
            </div>

            {/* Reading Options */}
            <div
              className={`grid grid-cols-1 gap-3 p-5 ${
                comic && novel ? "sm:grid-cols-2" : "sm:grid-cols-1"
              }`}
            >
              {/* Comic Option */}
              {comic && (
                <button
                  onClick={() => {
                    navigate(`/book/chapter/${selectedChapter._id}?mode=comic`);
                    setSelectedChapter(null);
                  }}
                  className="group rounded-xl border border-white/10 bg-white/3 p-5 text-left transition-all duration-300 hover:border-violet-500/60 hover:bg-violet-500/[0.08]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                    <BookImage size={22} />
                  </div>

                  <h3 className="mb-1 font-semibold text-white">Comic</h3>

                  <p className="text-xs leading-relaxed text-gray-500">
                    Read through illustrated artwork.
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-violet-400">
                    <span>Read visually</span>
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </button>
              )}

              {/* Novel Option */}
              {novel && (
                <button
                  onClick={() => {
                    navigate(`/book/chapter/${selectedChapter._id}?mode=novel`);
                    setSelectedChapter(null);
                  }}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:border-violet-500/60 hover:bg-violet-500/[0.08]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                    <BookOpen size={22} />
                  </div>

                  <h3 className="mb-1 font-semibold text-white">Novel</h3>

                  <p className="text-xs leading-relaxed text-gray-500">
                    Enjoy the story through beautifully formatted text.
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs font-semibold text-violet-400">
                    <span>Read as text</span>
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 text-center">
              <p className="text-xs text-gray-600">
                <Sparkles size={12} className="mr-1 inline-block" />
                Choose your preferred reading style
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default BookDetails;
