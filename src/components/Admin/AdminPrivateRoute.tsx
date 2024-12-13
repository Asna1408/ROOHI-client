import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
    const { currentAdmin } = useSelector((state: any)=> state.admin || { currentAdmin: null });
  return currentAdmin ? <Outlet /> : <Navigate to={"/Superadmin/login"} />
}

export default AdminPrivateRoute