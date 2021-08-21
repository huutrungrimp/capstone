import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authServices from "../store/services/authServices";

const PostDetail = (props) => {
  console.log(props);
  const postID = props.match.params.id;
  const [post, setPost] = useState({});
  const username = authServices() === undefined ? "" : authServices().username;
  console.log(username);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/${postID}`).then((res) => {
      setPost(res.data);
    });
  }, [postID]);
  //   console.log(post.username.username)
  const postUser =
    post === undefined
      ? ""
      : post.username === undefined
      ? ""
      : post.username.username;
  console.log(postUser);

  return (
    <div className="container">
      <h4>Post Details</h4>
      <div class="row">
        <div class="col-2" style={{ fontSize: "18px", fontWeight: "bold" }}>
          {post.title}
        </div>
        {postUser !== username ? (
          ""
        ) : (
          <div class="col-4">
            <div class="row">
              <div
                class="col-2"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                <Link to={`/posts/${post.id}/delete`}>Delete</Link>
              </div>
              <div
                class="col-2"
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >
                <Link to={`/posts/${post.id}/update`}>Update</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
