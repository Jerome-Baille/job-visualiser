import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-content">
                <Spinner animation="border" variant="primary" /> 
                <h1>Loading...</h1>
            </div>
        </div>
    )
}

export default LoadingSpinner