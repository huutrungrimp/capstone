import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { userLogin } from '../../store/actions/authActions';


const LoginForm = ({userLogin, history}) => {
    console.log(history)

    const[details, setDetails] = useState({
        username: '',
        password: '',
    });

    const onChange = e => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault(); 
        userLogin(details);     
        history.push('/');
    };

    console.log(details)

    return (
        <div className='container'>
            <h4>Login</h4>
            <Form className='form'>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        name='username'
                        value={details.username}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name='password'
                        value={details.password}
                        onChange={onChange}
                        />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>            
        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return {
        userLogin: (details) => {dispatch(userLogin(details));
        }
    }
}

export default connect(null, mapDispatchToProps) (LoginForm)
