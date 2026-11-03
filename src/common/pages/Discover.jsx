import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { SlidersHorizontal } from "lucide-react";

function Discover() {
  return (
    <>
      <Header />
      <section className="px-6 pb-12 pt-32 mx-auto max-w-6xl">
        {/* search filter button */}
        <div className="w-full flex items-center justify-center gap-5 0-2 ">
          <div className="w-full h-8 bg-amber-300 rounded-lg flex items-center p-2">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search...."
              className="w-full border-none focus:outline-none"
            />
          </div>

          <div className="w-20 h-8 bg-red-500 rounded-md flex items-center justify-center font-medium text-lg p-1 gap-1 text-white">
            <SlidersHorizontal size={18} /> Filter
          </div>
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-6  w-full mt-4 space-y-2">
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
          <div className="space-y-2 p-2 flex flex-col">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Frp8625gFHZjBVAKBPe0Da_p2Ev05GRjdTvC1AscA&s=10"
              alt=""
              className="h-65 rounded-lg"
            />

            <h2 className="text-white text-md">The Convenant of Water</h2>
            <span className="text-white text-sm">Rating</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Discover;
