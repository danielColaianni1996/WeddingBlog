import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AdministrationPage } from "./pages/AdministrationPage";
import { WeddingBlogPage } from "./pages/WeddingBlogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/weddingBlog" replace />} />
      <Route path="/weddingBlog" element={<WeddingBlogPage />} />
      <Route path="/administration" element={<AdministrationPage />} />
      <Route path="*" element={<Navigate to="/weddingBlog" replace />} />
    </Routes>
  );
}

export default App;
