import React, { ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";

interface Note {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface MainProps {
  activeNote: Note | null;
  onUpdateNote: (updatedNote: Note) => void;
}

const Main: React.FC<MainProps> = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field: keyof Note, value: string) => {
    if (activeNote) {
      onUpdateNote({
        ...activeNote,
        [field]: value,
        lastModified: Date.now(),
      });
    }
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Título da nota"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Escreva sua nota aqui..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;