import Footer from "../components/Footer";
import Header from "../components/Header";
import BookImg from "../../assets/media/books/ArtoriusCover.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Star } from "lucide-react";

function BookDetails() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Header />
      <section className="px-5 sm:px-6 min-h-[90vh] pb-12 pt-28 sm:pt-32 mx-auto max-w-7xl">
        {/* container */}
        <div className="grid grid-cols-1 sm:grid-cols-4  gap-8 w-full items-start">
          {/* image */}
          <div className="flex justify-center sm:justify-start">
            <img
              src={BookImg}
              alt="Book Image"
              className="w-full max-w-[250px] aspect-3/4  rounded-xl"
            />
          </div>

          {/* details */}
          <div className="sm:col-span-2 text-white space-y-3 min-w-0">
            <h1 className="text-4xl sm:text-6xl">Artorius</h1>
            <p className="text-gray-400 text-sm">Eng</p>
            <p>⭐10</p>
            <div className="flex flex-wrap gap-2 text-gray-300 mb-2">
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
            {/* Buttons */}
            <div className="flex items-center justify-between mt-4 mb-4">
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-violet-400 rounded-lg text-lg">
                  Read First
                </button>
                <button className="px-4 py-2 bg-purple-600 rounded-lg text-lg">
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel at
                expedita commodi quia similique libero quidem, iste atque illum
                molestias voluptatem quae maxime doloremque amet rem aliquid
                modi ipsum necessitatibus Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Illo at, vero quibusdam est
                ducimus necessitatibus autem officiis vel doloribus, debitis
                nobis sunt, earum labore reprehenderit consectetur unde harum
                qui ex?
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
              <Link
                to="/book/artorius/chapter/10"
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-700/30 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30 transition-all text-left group"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-700 flex group-hover:bg-violet-500/50 items-center justify-center font-semibold text-gray-200 transition-all">
                  10
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-centergap-2">
                    <h3 className="text-sm font-medium truncate">
                      Chapter 10 : Reborn
                    </h3>

                    <span className="shrink-0 text-[10px] font-bold bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 mt-1
                          text-xs text-gray-400"
                  >
                    <span className="italic">5 Nov 2026</span>
                  </div>
                </div>
              </Link>
              <Link
                to="/book/artorius/chapter/10"
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-700/30 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30 transition-all text-left group"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-700 flex group-hover:bg-violet-500/50 items-center justify-center font-semibold text-gray-200 transition-all">
                  9
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-centergap-2">
                    <h3 className="text-sm font-medium truncate">
                      Chapter 9 : Crawling in hell
                    </h3>

                    <span className="shrink-0 text-[10px] font-bold bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 mt-1
                          text-xs text-gray-400"
                  >
                    <span className="italic">5 Nov 2026</span>
                  </div>
                </div>
              </Link>
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
      <Footer />
    </>
  );
}

export default BookDetails;
