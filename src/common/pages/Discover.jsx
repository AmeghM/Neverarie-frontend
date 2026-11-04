import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { SlidersHorizontal, Star, Bookmark } from "lucide-react";
import TestImage from "../../assets/media/books/ArtoriusCover.jpg";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <>
      <Header />

      <section className="px-4 sm:px-6 pb-12 pt-28 sm:pt-32 mx-auto max-w-6xl">
        {/* search filter button */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-5 mb-4">
          <div className="w-full h-9 bg-amber-300 rounded-lg flex items-center p-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search...."
              className="w-full border-none focus:outline-none bg-transparent text-sm sm:text-base"
            />
          </div>

          <div className="shrink-0 h-9 bg-red-500 rounded-md flex items-center justify-center font-medium text-sm sm:text-lg px-2 sm:px-3 gap-1 text-white">
            <SlidersHorizontal size={18} /> Filter
          </div>
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-2 w-full mt-4">
          <Link
            to="/book"
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
                src={TestImage}
                alt="Artorius"
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
                    src={TestImage}
                    alt=""
                    className="w-full h-38 object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                  <h2 className="absolute bottom-3 left-3 text-white font-bold text-lg">
                    Artorius
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
                    <span className="px-2 py-1 border border-gray-600 rounded-3xl text-[0.65rem] inline-block">
                      Action
                    </span>
                    <span className="px-2 py-1 border border-gray-600  rounded-3xl text-[0.65rem]  inline-block">
                      Adventure
                    </span>
                    <span className="px-2 py-1 border border-gray-600 rounded-3xl text-[0.65rem]  inline-block">
                      Horror
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                    For ten thousand years, Artorius has done one thing: watched
                    over the damned. He is an Eidolon, a being made to oversee
                    Hell, and he has never questioned it.
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      to="/book"
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
              Artorius
            </h2>

            <span className="text-gray-400 text-xs sm:text-xs">Eng</span>
          </Link>
          <Link
            to="/artorius"
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
                src={TestImage}
                alt="Artorius"
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
                    src={TestImage}
                    alt=""
                    className="w-full h-38 object-cover object-top"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

                  <h2 className="absolute bottom-3 left-3 text-white font-bold text-lg">
                    Artorius
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
                    <span className="px-2 py-1 border border-gray-600 rounded-3xl text-[0.65rem] inline-block">
                      Action
                    </span>
                    <span className="px-2 py-1 border border-gray-600  rounded-3xl text-[0.65rem]  inline-block">
                      Adventure
                    </span>
                    <span className="px-2 py-1 border border-gray-600 rounded-3xl text-[0.65rem]  inline-block">
                      Horror
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                    For ten thousand years, Artorius has done one thing: watched
                    over the damned. He is an Eidolon, a being made to oversee
                    Hell, and he has never questioned it.
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      to="/artorius"
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
              Artorius
            </h2>

            <span className="text-gray-400 text-xs sm:text-xs">Eng</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Discover;
