import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const UnauthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const redirect = querystring("redirect");

  if (isAuthenticated) {
    return <Navigate to={redirect || "/dashboard"} />;
  }

  return children;
}

export const AuthenticatedRoute = ({ children }) => {
  const { pathname, search } = useLocation();
  const {isAuthenticated} = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }

  return children;
}

function querystring(name, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
