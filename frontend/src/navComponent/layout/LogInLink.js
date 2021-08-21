import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LogInLink = () => {    

    return (
        <Nav>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        </Nav>
    )
}

export default LogInLink;
