import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/Auth/AuthLayout";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import BookSearchPage from "./pages/MainPage/BookSearch/BookSearchPage";
import { MainLayoutRoutes } from "./routes/route";
import useMessage from "antd/es/message/useMessage";
import { UserProvider } from "./context/UserContext";

function App() {
  const message = useMessage();
  return (
    <>
      {message[1]}
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="" element={<MainLayout />}>
              <Route path="book" element={<BookSearchPage />} />
              {MainLayoutRoutes.map((page) => (
                <Route
                  path={page.url}
                  element={page.component}
                  key={page.url}
                />
              ))}
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
