import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatePost } from '../store/actions/postActions';
import authServices from '../store/services/authServices';
import axios from 'axios'

const UpdatePost = (props) => {
    console.log(props);
    const postID = props.match.params.id;
    console.log(postID)

    const[post, setPost] = useState({
        title: '',        
        content: '',
    });

    console.log(authServices().username);
    

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/posts/${postID}`)
        .then(res => {
            console.log(res.data);
            const post = res.data;
            setPost(post);                  
        })
    }, [postID])  

    console.log(post)

    const onChange = e => {
        console.log(post);
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.updatePost(post);
        props.history.push('/posts');
    };

    return (
        <div className='mainClass'>           
            
            <h4>Update Course</h4>
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
                    Update
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
        updatePost: (post) => {dispatch(updatePost(post))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdatePost)
