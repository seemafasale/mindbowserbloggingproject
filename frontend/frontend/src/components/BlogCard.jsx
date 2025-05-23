
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5">{post.title}</h3>
        <p className="card-text">{post.content.slice(0, 100)}...</p>
        <p className="text-muted small">By {post.author}</p>
        <Link to={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary mt-2">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

