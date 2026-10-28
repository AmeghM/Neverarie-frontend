import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import PreLoader from "./pages/PreLoader";
import LandPage from "./pages/LandPage";

import SignUp from "./common/pages/SignUp";
import Login from "./common/pages/Login";
import Discover from "./common/pages/Discover";
import Support from "./common/pages/Support";
import Author from "./common/pages/Author";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/support" element={<Support />} />
        <Route path="/author" element={<Author />} />

        {/* admin */}
      </Routes>
    </>
  );
}

export default App;
