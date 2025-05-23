
import React, { useState } from 'react';
import API from '../services/api';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', form);
      alert('Post created');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Create New Post</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Content"
          rows="6"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Create
      </button>
    </form>
  );
};

export default CreatePost;

