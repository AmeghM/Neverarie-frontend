import Footer from "../components/Footer";
import Header from "../components/Header";
import BookImg from "../../assets/media/books/ArtoriusCover.jpg";
import { useState } from "react";

function BookDetails() {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Header />
      <section className="px-5 sm:px-6 min-h-[90vh] pb-12 pt-28 sm:pt-32 mx-auto max-w-6xl">
        {/* container */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 w-full items-start">
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
            <p>Eng</p>
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
            <div></div>
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
          <div className="text-white">
            <ul>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                porro, nisi architecto illum placeat quod in officia nihil, non
                neque aspernatur repellendus praesentium ab veniam recusandae
                magni inventore iusto dolore!
              </li>
            </ul>
          </div>
        </div>
        {/* comments */}
        <div></div>
        {/* related */}
        <div></div>
        {/* recomended */}
      </section>
      <Footer />
    </>
  );
}

export default BookDetails;
