import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deletePost } from '../store/actions/postActions';


const DeletePost = (props) => {

    console.log(props)

    const postID = props.match.params.id;
    const handleSubmit = (e) => {
        e.preventDefault(); 
        props.deletePost(postID);   
        props.history.push('/posts');
    };

    return (
        <div className='mainClass'>
            <p>Are your sure to Delete</p>
            <Button variant="primary" onClick={handleSubmit}>
                Yes
            </Button>          
            <Button variant="primary" onClick={props.history.goBack}>
                No
            </Button>  
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {    
    return {        
        deletePost: (postID) => {dispatch(deletePost(postID))
        }
    }
}


export default connect(null, mapDispatchToProps)(DeletePost)
