
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      setForm({ title: res.data.title, content: res.data.content });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, form);
      alert('Post updated');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Failed to update post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4" style={{ maxWidth: '600px' }}>
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
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-warning w-100">
        Update
      </button>
    </form>
  );
};

export default EditPost;

