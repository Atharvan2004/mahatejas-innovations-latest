import { useSelector } from "react-redux";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      navigate('/signin')
    } else if (isAdmin) {
      if (user && user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
        navigate('/signin')
      } else {
        return <>{children}</>
      }
    } else {
      return <>{children}</>
    }
  }

};
ProtectedRoute.propTypes = {
  children: propTypes.any.isRequired,
  isAdmin: propTypes.bool,
};

export default ProtectedRoute;
