import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

/* Services */
import { getTokenAndUserId } from '../../services/authService';

/* Components import */
import Header from '../Header';
import Sidebar from '../Sidebar';
import ToastComponent from '../Toast';
import { ToastProvider } from '../../contexts/ToastContext';

// Create context
export const AuthContext = React.createContext();

export default function Layout() {
    // State variables
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});

    // Fetch user token and id on mount
    useEffect(() => {
        const fetchTokenAndUserId = async () => {
            try {
                const res = await getTokenAndUserId();
                setIsAuth(!!res.accessToken);
                setUser(!!res.accessToken ? res : {});
            } catch (error) {
                console.error(error);
            }
        };
        fetchTokenAndUserId();
    }, [])

    return (
        <ToastProvider>
            <div className="app">
                <div className="page">
                    {/* Provide context to child components */}
                    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
                        <Header />
                        <div className='home'>
                            <Sidebar />
                            <Outlet />
                        </div>
                    </AuthContext.Provider>
                    <ToastComponent />
                </div>
            </div>
        </ToastProvider >
    );
}