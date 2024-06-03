import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, protectedRoutes, RouteName } from "./Routes";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import NotFound from "../features/misc/pages/NotFound";

const AllRoutes = () => {
  const isUser = useSelector((state) => state.persistedReducers.auth.isUser);
  return (
    <>
      {isUser && <Navbar />}
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              isUser ? (
                <Navigate to={RouteName.product.PRODUCT} replace />
              ) : (
                route.component
              )
            }
          />
        ))}
        <>
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                isUser ? (
                  route.component
                ) : (
                  <Navigate to={RouteName.auth.LOGIN} replace />
                )
              }
            />
          ))}
        </>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
