
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
        navigate('/login');
      } else {
        console.error('Error fetching posts:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center text-primary">📋 Your Blog Posts</h1>

      <div className="d-flex justify-content-end mb-4">
        <Link
          to="/create"
          className="btn btn-primary"
        >
          ➕ Create New Post
        </Link>
      </div>

      <div className="row gy-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-truncate" style={{ maxHeight: '6em', overflow: 'hidden' }}>
                    {post.content}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/edit/${post.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available. Create one now!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

