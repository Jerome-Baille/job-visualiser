import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

/* Services */
import { getTokenAndUserId } from '../../services/auth';

/* Components import */
import Header from '../Header';

export const AuthContext = React.createContext();

export default function Layout() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});

    useEffect (() => {
        getTokenAndUserId().then(res => {
            if(res && res.token !== ""){
                setIsAuth(true);
                setUser(res);
            } else {
                setIsAuth(false);
                setUser({});
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="app">
            <div className="page">
                <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
                    <Header />
                    <Outlet />
                </AuthContext.Provider>
            </div>
        </div>
    )
}