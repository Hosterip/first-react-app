import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import cl from "./Navbar.module.css"
import MyButton from "../button/MyButton";
import {AuthContext} from "../../context";
const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
    }
    return (
        <div className={cl.navbar}>
            {isAuth ? <MyButton onClick={logout}>Exit</MyButton> : ""}
            <div className={cl.navbar__content}>
                <Link to="/about">About</Link>
                <Link to="/">Main</Link>
                <Link to="/posts">Posts</Link>
            </div>
        </div>
    );
};
export default Navbar;