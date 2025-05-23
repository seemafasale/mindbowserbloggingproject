
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import API from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Latest Posts</h2>
      <div className="row g-4">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

