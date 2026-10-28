import Header from "../components/Header";
import Footer from "../components/Footer";
import GridMotion from "../../components/GridMotion";

function Author() {
  const items = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-w4ptfOeV-yVz9Ruv-Xca0iMxBn0VVHWv1giCFSZuFA&s=10",
    "Neverarie",
    "https://i.pinimg.com/736x/5e/f9/6e/5ef96e57e7abcf79cb2af83efbe06d34.jpg",
    "Neverarie",
    "https://i.pinimg.com/236x/b6/35/6e/b6356e4833de27bf045cde154aec2c7f.jpg",
    "Neverarie",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwSp11XF3nDbeo0ZZ8kxCBvTdFPA8fzBDFDySQwbiSqw&s=10",
    "Neverarie",
  ];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#0B0812] text-white">
        {/* About introduction */}
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pb-12 pt-32 sm:min-h-screen sm:pt-28">
          <div className="absolute inset-0">
            <GridMotion
              items={items}
              rows={4}
              aspectRatio={1.33}
              gap={16}
              radius={14}
              angle={-12}
              tilt={0}
              speed={24}
              direction="alternate"
              parallax={0.5}
              spotlight={0.6}
              dim={0.35}
              fade={0.5}
              grayscale={false}
            />
          </div>

          {/* Background overlay */}
          <div className="absolute inset-0 bg-[#0B0812]/65" />

          {/* Introduction text */}
          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A78BFA] sm:text-sm">
                About Neverarie
              </p>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                The person behind
                <span className="mt-2 block text-[#A78BFA]">the stories.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                Every story has a beginning, and every world has someone who
                imagines it. Here's a little about the person and purpose behind
                Neverarie.
              </p>
            </div>
          </div>
        </section>

        {/* Author profile */}
        <section className="px-6 py-20 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16 lg:gap-24">
            {/* Portrait */}
            <div className="mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                {/* Replace this with your portrait */}
                <div className="flex h-full items-center justify-center text-sm text-white/30">
                  Author portrait
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-purple-400/10" />
              </div>
            </div>

            {/* Author description */}
            <div className="py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
                The creator
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Hello, I'm ATK.
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                I'm the creator behind Neverarie. This platform grew from my
                passion for stories, creativity, and the worlds that imagination
                can bring to life.
              </p>

              <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
                Through Neverarie, I want to create a space where visitors can
                discover stories, explore ideas, and find something that stays
                with them long after they've finished reading.
              </p>
            </div>
          </div>
        </section>

        {/* Website vision */}
        <section className="px-6 pb-24 sm:pb-32">
          <div className="mx-auto max-w-6xl border-t border-white/10 pt-12 sm:pt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
              The idea behind it
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              More than a website.
              <span className="block text-white/50">
                A collection of Untold Stories
              </span>
            </h2>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              A little corner of my mind where stories finally get to exist
              beyond my head. Some might be beautiful, some dark, strange, or
              downright messed up. Some are ideas I've carried for a long time,
              others are worlds I'm still figuring out.
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              I don't know if every story will be good, but they're mine, and
              it's time they found a place to live.
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              So, this is my little graveyard of untold stories. Some of them
              might come back to life.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Author;
