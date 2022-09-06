import { Button } from "react-bootstrap";
import { logout } from "../../services/auth";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogout = (event) => {
        event.preventDefault();

        logout().then(() => {
            setShowSuccess(true)

            setTimeout(() => {
                navigate('/login');
            }, 2500)
        })
    }

    return(
        <>
        <div className="main-container">
            <Toast 
                onClose={() => setShowSuccess(false)} 
                show={showSuccess} 
                delay={2500} 
                autohide
            >
                <Toast.Header className="toast-header--success">
                    <strong className="me-auto">
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <span>  Success !</span>
                    </strong>
                    
                </Toast.Header>
                <Toast.Body>Farewell my friend ! <br/> You will be redirected to the Login page.</Toast.Body>
            </Toast>

            <div className="connexion-container">
                <h1>Logout</h1>
                <p>Are you sure you want to log out ?</p>

                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div> 
    </>
    )
}
export default Logout;