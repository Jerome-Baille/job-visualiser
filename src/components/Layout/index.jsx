import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout = () => {
    return (
        <div className="app">
            <div className="page">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout