import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';

const Home = () => {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/notes', {
          headers: { 'x-auth-token': token }
        });
        const data = await res.json();
        if (Array.isArray(data)) setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  const addNote = async (noteData) => {
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token 
        },
        body: JSON.stringify(noteData)
      });
      const data = await res.json();
      setNotes([data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (noteData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteData._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'x-auth-token': token 
        },
        body: JSON.stringify(noteData)
      });
      const data = await res.json();
      setNotes(notes.map(note => note._id === data._id ? data : note));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <NoteForm 
              onSubmit={editingNote ? updateNote : addNote} 
              initial={editingNote || { title: '', content: '' }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        {isLoading ? (
          <div className="has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-spinner fa-pulse fa-3x"></i>
            </span>
          </div>
        ) : notes.length === 0 ? (
          <div className="notification is-light has-text-centered">
            No notes yet. Create your first note above!
          </div>
        ) : (
          <div className="columns is-multiline">
            {notes.map((note) => (
              <div className="column is-one-third" key={note._id}>
                <NoteItem 
                  note={note} 
                  onEdit={() => setEditingNote(note)}
                  onDelete={deleteNote}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;