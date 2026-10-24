import Header from "../common/components/Header";
import Footer from "../common/components/Footer";

function LandPage() {
  return (
    <>
      <Header />
      <section className="w-full min-h-dvh flex flex-col justify-center items-center gap-4 px-4">
        <h1 className="text-white text-2xl text-center">LandPage</h1>
        <h1 className="text-violet-800 text-center text-7xl">Neverarie</h1>
        <h1 className="text-center text-4xl text-blue-600 ">
          Work in Progress
        </h1>
      </section>
      {/* continue */}
      <section></section>

      {/* Trending */}
      <section></section>

      {/* about */}
      <section></section>
      <Footer />
    </>
  );
}

export default LandPage;
