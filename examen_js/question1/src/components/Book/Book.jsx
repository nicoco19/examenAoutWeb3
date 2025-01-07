import { useContext, useState } from "react";
import { Context as BookContext } from "contexts/BookContext.jsx";
import {useNavigate} from "react-router-dom";

const Book = ({ book }) => {
  const { updateBookState, removeBook } = useContext(BookContext);
  const [selectedState, setSelectedState] = useState(book.state);
  const navigate = useNavigate();


  const handleUpdateClick = () => {
    console.log(`Updated state for ${book.title}: ${selectedState}`);
    console.log(`book.id: ${book.id}`);
    console.log(`selectedState: ${selectedState}`);
    updateBookState(book.id, selectedState);
     navigate("/books");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleDeleteClick = () => {
    console.log(`Deleting book with id ${book.id}`);
    removeBook(book.id);
    navigate("/books");
  };

  return (
      <div className={"card"} >
        <h2>{book.title}</h2>
        <p>L’auteur du livre : {book.author}</p>
        <label htmlFor={`book-state-${book.id}`}>État du livre :</label>
        <select
            id={`book-state-${book.id}`}
            value={selectedState}
            onChange={handleStateChange}
        >
          <option value="read">lu</option>
          <option value="to_read">à lire</option>
          <option value="reading">en cours de lecture</option>
        </select>
        <button onClick={handleUpdateClick}>Mettre à jour l’état</button>
        <br/>
        <button onClick={handleDeleteClick}>delete</button>
      </div>
  );
};

export default Book;