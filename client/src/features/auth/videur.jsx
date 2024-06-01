import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useSessionQuery } from "../api/auth";
import { userHasAuthenticated } from "./slice";
import { useEffect } from "react";

export const UnauthenticatedRoute = ({ children }) => {
  const redirect = querystring("redirect");
  const { data: user, isLoading } = useSessionQuery();
  
  if (!isLoading) {
    if (user) { // if the server whoami throws
      return <Navigate to={redirect || "/"} />;
    }

    return children;
  }
};

export const AuthenticatedRoute = ({ children }) => {
  const { pathname, search } = useLocation();
  const { data: user, error, isLoading } = useSessionQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !isAuthenticated) {
      dispatch(userHasAuthenticated(user));
    }
  }, [user, isAuthenticated, dispatch]); 

  if (!isLoading) {
    if (error) { // if the server whoami throws
      return <Navigate to={`/login?redirect=${pathname}${search}`} />;
    }

    return children;
  }
};

function querystring(name, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
