import { Link } from "react-router-dom";

const NotLogged = () => {
    return (
        <div className="d-flex align-items-center justify-content-center mt-5">
            <div className="text-center">
                <p className="fs-3"> 
                    <span className="text-danger">
                        Oops!&nbsp;
                    </span> 
                    You are not authorised here.
                </p>
                <p className="lead">
                    Please login to access this page.
                  </p>
                <Link to='/auth' className="btn btn-primary">Login</Link>
            </div>
        </div>
    );
}

export default NotLogged;