import React from 'react';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



const LogOutLink = () => {

    return (  
        <div>
            <Nav>            
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </div>      

    )
}

export default LogOutLink;

