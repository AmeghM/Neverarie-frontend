import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// register
export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVERURL}/register`, reqBody);
};

// login
export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVERURL}/login`, reqBody);
};

// get books
export const getPublicBooksAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/discover`);
};
// viewBook
export const viewBookAPI = async (slug) => {
  return await commonAPI("GET", `${SERVERURL}/books/${slug}`);
};

// view chapters
export const getPublicChaptersAPI = async (bookId) => {
  return await commonAPI("GET", `${SERVERURL}/books/${bookId}/chapters`);
};

// read chapters
export const getPublicChapterByIdAPI = async (chapterId) => {
  return await commonAPI("GET", `${SERVERURL}/book/chapter/${chapterId}`);
};

// homepage
export const getPublicHomepageAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/homepage`, "");
};

// latest book
export const getLatestBooksAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/latest`, "");
};

// admin
// add book
export const addBookAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVERURL}/admin/books/add`,
    reqBody,
    getAuthHeaders(),
  );
};

// get all books
export const getAllBooksAPI = async () => {
  return await commonAPI(
    "GET",
    `${SERVERURL}/admin/books`,
    "",
    getAuthHeaders(),
  );
};

// Get single book
export const getBookByIdAPI = async (id) => {
  return await commonAPI(
    "GET",
    `${SERVERURL}/admin/books/${id}`,
    "",
    getAuthHeaders(),
  );
};

// update
export const updateBookAPI = async (id, bookData) => {
  return await commonAPI(
    "PUT",
    `${SERVERURL}/admin/books/${id}/edit`,
    bookData,
    getAuthHeaders(),
  );
};
// delete
export const deleteBookAPI = async (id) => {
  return await commonAPI(
    "DELETE",
    `${SERVERURL}/admin/books/delete/${id}`,
    "",
    getAuthHeaders(),
  );
};

// chapters
// get admin book chapters
export const getAdminChaptersAPI = async (bookId) => {
  return await commonAPI(
    "GET",
    `${SERVERURL}/admin/books/${bookId}/chapters`,
    "",
    getAuthHeaders(),
  );
};

// add chapters
export const addChapterAPI = async (bookId, chapterData) => {
  return await commonAPI(
    "POST",
    `${SERVERURL}/admin/books/${bookId}/chapters/add`,
    chapterData,
    getAuthHeaders(),
  );
};

// delete chapter
export const deleteChapterAPI = async (chapterId) => {
  return await commonAPI(
    "DELETE",
    `${SERVERURL}/admin/chapters/${chapterId}`,
    "",
    getAuthHeaders(),
  );
};
// homepage settings
export const getHomepageSettingsAPI = async () => {
  return await commonAPI(
    "GET",
    `${SERVERURL}/admin/homepageSettings`,
    "",
    getAuthHeaders(),
  );
};
// edit
export const updateHomepageSettingsAPI = async (reqBody) => {
  return await commonAPI(
    "PUT",
    `${SERVERURL}/admin/homepageSettings/edit`,
    reqBody,
    getAuthHeaders(),
  );
};
