import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/Auth/AuthLayout";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import { MainLayoutRoutes } from "./routes/route";
import useMessage from "antd/es/message/useMessage";
import { UserProvider } from "./context/UserContext";
import ErrorPage from "./components/ErrorPage";

function App() {
  const message = useMessage();
  return (
    <>
      {message[1]}
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              path=""
              element={<MainLayout />}
              errorElement={<ErrorPage />}
            >
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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
