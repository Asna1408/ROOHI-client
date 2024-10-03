import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";

const AdminPrivateRoute = () => {
    const { currentAdmin } = useSelector((state: RootState)=> state.admin || { currentAdmin: null });

  return currentAdmin ? <Outlet /> : <Navigate to={"/Superadmin/login"} />
}

export default AdminPrivateRoute