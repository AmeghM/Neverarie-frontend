import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import Artorius from "../assets/media/overviews/artorius.png";
import { MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getLatestBooksAPI, getPublicHomepageAPI } from "../services/allAPI";
import { Link } from "react-router-dom";

function LandPage() {
  const [homepageData, setHomepageData] = useState(null);
  const [latestBooks, setLatestBooks] = useState([]);
  const [latestLoading, setLatestLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const res = await getPublicHomepageAPI();
        const data = res?.data?.data ?? res?.data ?? null;

        setHomepageData(data);
      } catch (error) {
        console.error("Failed to load homepage settings:", error);
      }
    };
    fetchHomepageData();
  }, []);

  const featuredBook = homepageData?.featuredBook;
  const title = featuredBook?.title || "Neverarie";

  const description = featuredBook?.description || "";
  const backgroundImage = homepageData?.backgroundImage || "";
  const buttonText = homepageData?.primaryButtonText || "Read Now";
  const backgroundPosition = homepageData?.backgroundPosition || "center";
  const overlayStrength = homepageData?.overlayStrength ?? 70;
  const bookLink = featuredBook?.slug
    ? `/books/${featuredBook.slug}`
    : "discover";

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await getLatestBooksAPI();
        if (res?.data?.success) {
          setLatestBooks(res.data.books || []);
        }
      } catch (error) {
        console.error("Failed to load latest books:", error);
      } finally {
        setLatestLoading(false);
      }
    };
    fetchLatestBooks();
  }, []);
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="px-3 sm:px-5 pt-3 sm:pt-5">
        <div className="relative min-h-[75dvh] sm:min-h-[85dvh] lg:h-[88dvh] overflow-hidden rounded-2xl bg-[#100D1C]">
          {/* Background Image */}
          <img
            src={backgroundImage}
            alt={`${title} artwork`}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            style={{
              objectPosition: backgroundPosition,
            }}
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#100D1C] via-[#100D1C]/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#100D1C]/80 via-transparent to-[#100D1C]/20" />

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[75dvh] sm:min-h-[85dvh] lg:h-[88dvh] items-center px-6 py-12 sm:px-12 lg:px-20">
            <div className="w-full max-w-xl space-y-5 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#C4B5FD]">
                {title}
              </h1>

              <p className="max-w-lg text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-violet-100/70 text-left line-clamp-4">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={bookLink}
                  className="rounded-lg flex items-center gap-1 bg-[#8B5CF6] px-6 py-3 text-sm sm:text-base font-semibold text-[#171126] transition-all duration-300 hover:bg-[#a27df8] hover:scale-101 active:scale-95"
                >
                  {buttonText} <MoveUpRight size={16} />
                </Link>

                <span className="text-xs sm:text-sm text-violet-200/50 tracking-wide">
                  An unforgettable journey awaits
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="absolute bottom-5 right-6 hidden sm:block text-xs tracking-[0.3em] uppercase text-white/40">
            Neverarie
          </div>
        </div>
      </section>

      {/* Continue / Featured */}
      <section className="px-3 sm:px-5 py-10 sm:py-16">
        <div className="min-h-[40vh] sm:min-h-[50vh] rounded-2xl bg-linear-to-br from-[#ae8df9] to-[#8B5CF6] flex items-center justify-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#171126]">
            Continue Your Journey
          </h2>
        </div>
      </section>

      {/* Latest */}
      <section className="px-5 sm:px-10 lg:px-20 py-12 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#C4B5FD]">
              Latest
            </h2>
            <p className="text-sm text-violet-200/50 mt-2">
              Recently updated stories
            </p>
          </div>
        </div>

        {latestLoading ? (
          <div className="text-center py-16 text-violet-200/50">
            Loading latest books...
          </div>
        ) : latestBooks.length === 0 ? (
          <div className="text-center py-16 text-violet-200/50">
            No books available yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {latestBooks.slice(0, 10).map((book) => (
              <Link
                key={book._id}
                to={`/books/${book.slug}`}
                className="group min-w-0"
              >
                {/* Cover */}
                <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-[#171126] border border-white/8">
                  <img
                    src={book.coverImage || Artorius}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-70" />
                </div>

                {/* Book Details */}
                <div className="mt-3 space-y-1">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-[#C4B5FD] transition-colors">
                    {book.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-violet-200/50 truncate">
                    {book.genre || "Story"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trending */}
      <section className="px-5 sm:px-10 lg:px-20 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#C4B5FD]">
          Trending
        </h2>
        {/* Add trending content here */}
      </section>

      <Footer />
    </>
  );
}

export default LandPage;
