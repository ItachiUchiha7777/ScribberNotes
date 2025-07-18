import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initial = {} }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');

  useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, content });
    if (!initial._id) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="box">
      <h2 className="title is-4">{initial._id ? 'Edit Note' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Note title"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea 
              className="textarea" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Note content"
              rows="5"
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary" type="submit">
              {initial._id ? 'Update Note' : 'Save Note'}
            </button>
          </div>
          {initial._id && (
            <div className="control">
              <button 
                type="button" 
                className="button is-light"
                onClick={() => {
                  setTitle('');
                  setContent('');
                  onSubmit({ _id: null });
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;