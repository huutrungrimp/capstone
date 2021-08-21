import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import {createPost} from '../store/actions/postActions';
import authServices from '../store/services/authServices';

const PostForm = ({createPost, history}) => {

    const[post, setPost] = useState({        
        username: authServices().username?(authServices().username.toLowerCase()):(''),
        title: '',
        content: ''
    });

    const onChange = e => {
        console.log(post);
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(post)
        createPost(post);
        history.push('/posts')
    };

    return (
        <div className='container'>
            <h2>Create a New Post</h2>
            <Form className='form'>
               
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='title'
                        value={post.title}
                        onChange={onChange}
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                        type="text" 
                        name='content'
                        value={post.content}
                        onChange={onChange}                    
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Create
                </Button>
            </Form>          
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        state
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        createPost: (post) => {dispatch(createPost(post))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
