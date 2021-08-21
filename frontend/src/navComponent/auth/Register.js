import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import {userRegister} from '../../store/actions/authActions';
import { connect } from 'react-redux';


const Register = ({userRegister, history}) => {

    const[details, setDetails] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const onChange = e => {
        console.log(details);
        setDetails({
            ...details,
            [e.target.name]: e.target.value.trim()
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
        userRegister(details);
        history.push('/welcome');
    };


    return (
        <div className='container'>
            <h4>Register</h4>
            <Form className='form'>
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        name='username'
                        value={details.username}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        name='email'
                        value={details.email}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name='password'
                        value={details.password}
                        onChange={onChange}
                        />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password" 
                        name='password2'
                        value={details.password2}
                        onChange={onChange}
                        />
                </Form.Group>

                
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>          
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        userRegister: (details) => {dispatch(userRegister(details))
        }
    }
}


export default connect(null, mapDispatchToProps) (Register)
