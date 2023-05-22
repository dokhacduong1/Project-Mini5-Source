import { Link, NavLink } from "react-router-dom";
import "./Header.scss"
import { getCookie } from "../../../helpers/cookie";
import Logout from "../../../pages/Logout";
import Icon, { BarsOutlined  } from '@ant-design/icons';
import HeaderBar from "../HeaderBar";

function Header() {
    const token = getCookie("token");
    return (
        <>
            <header className='header'>
                <div className='header__logo'>
                    <Link to={"/"}>Logo</Link>
                </div>
                {
                    token &&
                    (
                        <div className="header__menu">
                            <NavLink to={"/"}>
                                Home
                            </NavLink>
                            <NavLink to={"topic"}>
                                Topic
                            </NavLink>
                            <NavLink to={"answers"}>
                                Answers
                            </NavLink>
                        </div>
                    )
                }

                <div className="header__account">
                    {
                        token ?
                            (
                                <>
                                    <Logout />
                                </>
                            )
                            :
                            (
                                <>
                                    <NavLink to={"login"}>
                                        Login
                                    </NavLink>
                                    <NavLink to={"register"}>
                                        Register
                                    </NavLink>
                                </>
                            )
                    }

                </div>
               <div className="header__bar">
                    <HeaderBar token = {token}/>
               </div>
            </header>
        </>
    )
}
export default Header