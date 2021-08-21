import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import authServices from "../store/services/authServices";

const MyPosts = () => {

  const [posts, setPosts] = useState([]);
  const user = authServices().username;
  console.log(user);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/posts/").then((res) => {
      const myPosts = res.data.filter(
        (post) => post.username.username === user
      );
      console.log(myPosts);
      setPosts(myPosts);
    });
  }, [user]);

  return (
    <div className="container">
        {(posts===undefined)?(''):(posts.map((post) => (
            <div>
                 <li><Link to={"/posts/" + post.id}>{post.title}</Link></li>
            </div>
        )))}
     
    </div>
  );
};

export default MyPosts;
