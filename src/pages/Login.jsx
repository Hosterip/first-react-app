import React, {useContext} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem("auth", "true")
    }
    return (
        <div>
           <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="enter username"/>
                <MyInput type="password" placeholder="enter password"/>
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;