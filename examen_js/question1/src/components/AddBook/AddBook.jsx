import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Context as BookContext} from "contexts/BookContext.jsx";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [state, setState] = useState("to_read");
  const { addBook } = useContext(BookContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = { title, author, state };
    try {
      await addBook(newBook);
      navigate("/books");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
        </div>
        <div>
          <label htmlFor="author">Auteur :</label>
          <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
          />
        </div>
        <div>
          <label htmlFor="state">État :</label>
          <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
          >
            <option value="read">lu</option>
            <option value="to_read">à lire</option>
            <option value="reading">en cours de lecture</option>
          </select>
        </div>
        <button type="submit">Ajouter le livre</button>
      </form>
  );
};

export default AddBook;