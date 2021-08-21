import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

const PostList = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/posts/").then((res) => {
      setPosts(res.data);
    });
  }, []);

  console.log(posts);

  const formatYmd = date => date.toISOString().slice(0, 10);

  formatYmd(new Date());

  return (
    <div>
      {posts === undefined
        ? ""
        : posts.map((post) => (
            <div>                    
                <Container>
                  <Row>
                    <Col sm={6}>
                    <h4><Link to={`/posts/${post.id}`}>{post.title}</Link></h4>
                    </Col>
                    <Col sm={6}>by {post.username.username} on {formatYmd(new Date(post.dated_on))}</Col>
                  </Row>
                </Container>
            </div>
          ))}
    </div>
  );
};

export default PostList;
