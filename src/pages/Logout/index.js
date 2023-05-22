import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import {authen} from "../../action/authen"
import { useDispatch } from "react-redux";
function Logout(){
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const handleLogout = ()=>{
        dispatch(authen(false));
        deleteAllCookies();    
        navigate("/login");
    }
    return(
        <>
            <a onClick={handleLogout}>Logout</a>
        </>
    )
}
export default Logout