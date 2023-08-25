import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div className="background-container">
            <div className="d-flex align-items-center justify-content-center mt-5">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">
                        404
                    </h1>
                    <p className="fs-3">
                        <span className="text-danger">
                            Oops!&nbsp;
                        </span>
                        Page not found.
                    </p>
                    <p className="lead">
                        The page you are looking for does not exist.
                    </p>
                    <Link to='/' className="btn btn-primary btn-go-home">Go Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Page404;