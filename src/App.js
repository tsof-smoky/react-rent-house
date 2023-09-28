import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes, userRoutes, adminRoutes } from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.userLogin);
  const role = currentUser.user?.data?.role;

  const Render = (Routes) => {
    return Routes.map((route, index) => {
      const Page = route.component;
      let Layout = DefaultLayout;

      if (route.layout) {
        Layout = route.layout;
      } else if (route.layout === null) {
        Layout = Fragment;
      }

      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  };
  return (
    <>
      <div className="App">
        <Router>
          <ScrollToTop />
          <Routes>
            {role
              ? role === "admin"
                ? Render(adminRoutes)
                : Render(userRoutes)
              : Render(publicRoutes)}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
