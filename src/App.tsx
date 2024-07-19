import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/Auth/AuthLayout";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import BookSearchPage from "./pages/MainPage/BookSearch/BookSearchPage";
import { MainLayoutRoutes } from "./routes/route";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<MainLayout />}>
            <Route path="book" element={<BookSearchPage />} />
            {MainLayoutRoutes.map((page) => (
              <Route path={page.url} element={page.component} key={page.url} />
            ))}
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
