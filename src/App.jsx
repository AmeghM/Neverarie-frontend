import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import PreLoader from "./pages/PreLoader";
import LandPage from "./pages/LandPage";

import SignUp from "./common/pages/SignUp";
import Login from "./common/pages/Login";
import Discover from "./common/pages/Discover";
import Support from "./common/pages/Support";
import Author from "./common/pages/Author";
import Cursor from "./common/components/Cursor";
import BookDetails from "./common/pages/BookDetails";
import Chapters from "./common/pages/Chapters";
import AdminDash from "./admin/pages/AdminDash";
import AdminBooks from "./admin/pages/AdminBooks";
import AdminChapters from "./admin/pages/AdminChapters";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminAddBook from "./admin/pages/AdminAddBook";
import AdminEditBook from "./admin/pages/AdminEditBook";
import BookChapters from "./admin/pages/BookChapters";
import AddChapter from "./admin/pages/Chapters/AddChapter";
import EditChapter from "./admin/pages/Chapters/EditChapter";

function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);
  const location = useLocation();

  useEffect(() => {
    const isAdmin = location.pathname.startsWith("/admin");

    document.body.classList.toggle("admin-page", isAdmin);

    return () => {
      document.body.classList.remove("admin-page");
    };
  }, [location.pathname]);
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={loader ? <PreLoader /> : <LandPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/support" element={<Support />} />
        <Route path="/author" element={<Author />} />

        <Route path="/book" element={<BookDetails />} />
        <Route path="/chapter" element={<Chapters />} />

        {/* admin */}
        <Route path="/admin/dash" element={<AdminDash />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/chapters" element={<AdminChapters />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/books/add" element={<AdminAddBook />} />
        <Route path="/admin/books/:id/edit" element={<AdminEditBook />} />
        {/*  */}
        <Route path="/admin/chapters/:bookId/" element={<BookChapters />} />
        <Route path="/admin/chapters/:bookId/add" element={<AddChapter />} />
        <Route
          path="/admin/chapters/:bookId/:chapterId/edit"
          element={<EditChapter />}
        />
      </Routes>
    </>
  );
}

export default App;
