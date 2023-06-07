import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";



export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        allowedRoles.includes(auth?.type)
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/error" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}