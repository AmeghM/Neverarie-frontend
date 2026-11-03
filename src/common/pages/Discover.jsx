import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { SlidersHorizontal } from "lucide-react";
import TestImage from "../../assets/media/books/ArtoriusCover.jpg";

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 w-full mt-4">
          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>

          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>

          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>

          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>

          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>

          <div className="space-y-2 p-2 flex flex-col min-w-0">
            <img
              src={TestImage}
              alt=""
              className="w-full aspect-2/3 object-cover rounded-lg"
            />
            <h2 className="text-white text-sm sm:text-md">Artorius</h2>
            <span className="text-white text-xs sm:text-sm">Rating</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Discover;
