import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { SlidersHorizontal, Star, Bookmark, Search } from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getPublicBooksAPI } from "../../services/allAPI";

function Discover() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getPublicBooksAPI();
        setBooks(res.data.books);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      <Header />

      <section className="px-4 sm:px-6 pb-12 pt-28 sm:pt-32 mx-auto max-w-6xl">
        {/* search filter button */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-5 mb-4">
          <div className="w-full h-11 bg-white rounded-xl flex items-center px-3 gap-2 border border-gray-200 shadow-sm focus-within:border-[#8B5CF6] focus-within:ring-4 focus-within:ring-[#8B5CF6]/10 transition-all duration-200">
            <Search size={19} className="text-[#8B5CF6]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none border-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>

          {/* <div className="shrink-0 h-9 bg-red-500 rounded-md flex items-center justify-center font-medium text-sm sm:text-lg px-2 sm:px-3 gap-1 text-white">
            <SlidersHorizontal size={18} /> Filter
          </div> */}
        </div>

        {/* Book grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-violet-100 border-t-[#8B5CF6] rounded-full animate-spin"></div>

            <h2 className="text-gray-700 font-semibold text-base">
              Discovering books...
            </h2>

            <p className="text-gray-400 text-sm text-center">
              Please wait while we fetch the books.
              <br />
              This may take a few moments.
            </p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-2 w-full mt-4">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book.slug}`}
                className="space-y-1 p-2 flex flex-col min-w-0 relative group"
                onClick={(e) => {
                  if (e.target.closest(".preview-card")) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Main image */}
                <div className="relative w-full mb-2">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full aspect-2/3 object-cover rounded-lg object-top "
                    style={{ objectPosition: "center top" }}
                  />

                  {/* Floating preview card */}
                  <div
                    className="
                preview-card
      absolute z-20 left-1/2 top-28
      -translate-x-1/2 -translate-y-1/3
      w-40 sm:w-60
      bg-gray-900 rounded-xl shadow-2xl
      overflow-hidden
      opacity-0 invisible scale-95
      group-hover:opacity-100 group-hover:visible
      group-hover:scale-108
      transition-all duration-300 delay-500
      group-hover:delay-500
      pointer-events-auto
    "
                  >
                    {/* Card image with title */}
                    <div className="relative">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-38 object-cover object-top"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                      <h2 className="absolute bottom-3 left-3 text-white font-bold text-lg">
                        {book.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center">
                        <span className="px-3 py-1  bg-gray-700 rounded-3xl text-xs flex items-center gap-1 justify-center text-white">
                          <Star size={9} fill="yellow" color="yellow" />
                          10
                        </span>
                      </div>
                      <div className="flex gap-2 text-gray-300 mb-2">
                        {book.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 border border-gray-600 rounded-3xl text-[0.65rem]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                        {book.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          to={`/books/${book.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-3 bg-violet-500  rounded-3xl text-white text-xs font-semibold flex items-center gap-1"
                        >
                          Read More <span>→</span>
                        </Link>
                        <button className="bg-gray-800 p-2 text-gray-200 border border-gray-500 h-10  w-10 flex items-center justify-center rounded-full">
                          <Bookmark size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Original title and rating */}
                <h2 className="text-white text-md sm:text-lg tracking-wide">
                  {book.title}
                </h2>

                <span className="text-gray-400 text-xs sm:text-xs">
                  {book.genre}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <h2 className="text-gray-700 font-semibold text-lg">
              No books found!
            </h2>
            <p className="text-gray-400 text-sm">
              Looks like there are no books to discover right now.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Discover;
