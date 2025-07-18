const NoteItem = ({ note, onEdit, onDelete }) => (
  <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{note.title}</p>
        </div>
      </div>
      <div className="content">
        {note.content}
        <br />
        <time className="is-size-7 has-text-grey" dateTime={note.updatedAt}>
          {new Date(note.updatedAt).toLocaleString()}
        </time>
      </div>
    </div>
    <footer className="card-footer">
      <button 
        className="card-footer-item button is-text" 
        onClick={() => onEdit(note)}
      >
        <span className="icon">
          <i className="fas fa-edit"></i>
        </span>
        <span>Edit</span>
      </button>
      <button 
        className="card-footer-item button is-text has-text-danger" 
        onClick={() => onDelete(note._id)}
      >
        <span className="icon">
          <i className="fas fa-trash"></i>
        </span>
        <span>Delete</span>
      </button>
    </footer>
  </div>
);

export default NoteItem;