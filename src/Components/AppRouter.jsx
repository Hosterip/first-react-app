import React, {useContext} from 'react';
import {Route, Routes, redirect} from "react-router-dom";

import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "../UI/loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    if(isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.component}
                        path={route.path}
                        exact={route.exact}/>
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.component}
                        path={route.path}
                        exact={route.exact}/>)}
            </Routes>
    )
};

export default AppRouter;