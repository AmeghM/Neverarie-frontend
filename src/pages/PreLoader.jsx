import loaderGif from "../assets/media/neverarieLoader.gif";
import "../index.css";

function PreLoader() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gray-800">
      <img
        src={loaderGif}
        alt="Loading..."
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default PreLoader;
