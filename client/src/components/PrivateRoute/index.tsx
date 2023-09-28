import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
    name,
    redirectPath = '/',
    children,
  }: {
    name: string,
    redirectPath?: string,
    children?: React.ReactNode
  }) => {
    if (!name) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default PrivateRoute;