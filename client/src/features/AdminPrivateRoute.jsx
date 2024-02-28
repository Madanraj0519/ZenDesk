import {useSelector} from "react-redux";
import { Outlet, Navigate} from "react-router-dom";


const AdminPrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user);
    // console.log(currentUser);

    return currentUser ? <Outlet /> : <Navigate to={'/'} />
}

export default AdminPrivateRoute;