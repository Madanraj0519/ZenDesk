import {useSelector} from "react-redux";
import { Outlet, Navigate} from "react-router-dom";

const EmployeePrivateRoute = () => {
    const { currentEmployee } = useSelector(state => state.employee);
    // console.log(currentUser);

    return currentEmployee ? <Outlet /> : <Navigate to={'/'} />
}

export default EmployeePrivateRoute