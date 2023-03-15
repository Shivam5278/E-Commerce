import { Navigate } from "react-router-dom";
const Protected = ({ isAuthenticated, children }) => {
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
