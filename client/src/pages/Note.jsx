import React, { useState } from 'react';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setNotes([...notes, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", backgroundColor: "#fafafa", margin: 0, padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "24px", color: "#333", marginBottom: "20px" }}>Note Taking App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your note"
          style={{ flex: "1", padding: "10px", borderRadius: "6px", border: "2px solid #ccc", fontSize: "16px" }}
        />
        <button type="submit" style={{ backgroundColor: "#4caf50", color: "white", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Add Note</button>
      </form>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", maxWidth: "800px" }}>
        {notes.map((note, index) => (
          <div key={index} style={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "6px", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{note}</span>
            <button onClick={() => handleDelete(index)} style={{ backgroundColor: "#d9534f", color: "white", padding: "5px 10px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
