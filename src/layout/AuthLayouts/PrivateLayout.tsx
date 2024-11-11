import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


export function PrivateLayout() {
    const loginedUser = useSelector((s: RootState) => s.user.loginedUser);

    if (!loginedUser) {
        return <Navigate to={'/login'} replace />
    }

    return <Outlet />
    
}