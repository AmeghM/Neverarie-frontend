import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import PreLoader from "./pages/PreLoader";
import LandPage from "./pages/LandPage";

function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 10000);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={loader ? <PreLoader /> : <LandPage />} />
      </Routes>
    </>
  );
}

export default App;
