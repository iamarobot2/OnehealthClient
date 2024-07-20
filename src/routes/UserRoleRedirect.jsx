import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoleRedirect = () => {
    const user = useSelector((state) => state.auth.user);
    if (user?.role === "healthcareprovider") {
      return <Navigate to="/hcp-dashboard" replace="true" />;
    }
    else if(user?.role === "user")
      {
        return <Navigate to="/user-dashboard" replace="true" />;
      }
    if(!user)
      {
        return <Navigate to="/home" replace />;
      }
  };

  export default UserRoleRedirect