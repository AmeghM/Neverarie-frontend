import Header from "../common/components/Header";
import Footer from "../common/components/Footer";
import Artorius from "../assets/media/overviews/artorius.png";
import { MoveUpRight } from "lucide-react";

function LandPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="px-3 sm:px-5 pt-3 sm:pt-5">
        <div className="relative min-h-[75dvh] sm:min-h-[85dvh] lg:h-[88dvh] overflow-hidden rounded-2xl bg-[#100D1C]">
          {/* Background Image */}
          <img
            src={Artorius}
            alt="Artorius fantasy artwork"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#100D1C] via-[#100D1C]/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#100D1C]/80 via-transparent to-[#100D1C]/20" />

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[75dvh] sm:min-h-[85dvh] lg:h-[88dvh] items-center px-6 py-12 sm:px-12 lg:px-20">
            <div className="w-full max-w-xl space-y-5 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#C4B5FD]">
                Artorius
              </h1>

              <p className="max-w-lg text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-violet-100/70 text-left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Debitis voluptas quaerat error provident temporibus iusto
                molestias molestiae reprehenderit quod, architecto quia at nemo
                eligendi laboriosam aspernatur modi unde aut consectetur.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button className="rounded-lg flex items-center gap-1 bg-[#8B5CF6] px-6 py-3 text-sm sm:text-base font-semibold text-[#171126] transition-all duration-300 hover:bg-[#a27df8] hover:scale-101 active:scale-95">
                  Read Now <MoveUpRight size={16} />
                </button>

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
        <div className="min-h-[40vh] sm:min-h-[50vh] rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#171126]">
            Continue Your Journey
          </h2>
        </div>
      </section>

      {/* Latest */}
      <section className="px-5 sm:px-10 lg:px-20 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#C4B5FD]">
          Latest
        </h2>
        {/* Add latest content here */}
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
