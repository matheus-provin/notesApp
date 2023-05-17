import React from "react";

interface Note {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface SidebarProps {
  notes: Note[];
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  activeNote: string;
  setActiveNote: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notas</h1>
        <button onClick={onAddNote}>Adicionar</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote ? "active" : ""}`}
            onClick={() => setActiveNote(id)}
            key={id}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Excluir</button>
            </div>

            <p>{body && body.substr(0, 100) + "..."}</p>
            <p className="note-meta">
              Última modificação:{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
