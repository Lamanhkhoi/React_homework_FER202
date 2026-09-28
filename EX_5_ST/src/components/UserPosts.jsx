import { useState, useEffect } from "react";

export default function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, [userId]); 
  
  return (
    <div>
      <h2>Posts of user {userId}</h2>
      {posts.map((post) => (
        <div key={post.id} className="card mb-2 p-2">
          <h5>{post.title}</h5>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}