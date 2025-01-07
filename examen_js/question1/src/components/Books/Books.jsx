import { useContext, useState } from "react";
import Book from "components/Book/Book.jsx";
import { Context as BookContext } from "contexts/BookContext.jsx";

const Books = () => {
  const { books } = useContext(BookContext);
  const [authorFilter, setAuthorFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  const handleAuthorFilterChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
      book.author.toLowerCase().startsWith(authorFilter.toLowerCase()) &&
      book.title.toLowerCase().startsWith(titleFilter.toLowerCase())
  );

  return (
      <div>
        <h1>Voici la liste des livres :</h1>
        <div>
          <label htmlFor="author-filter">Filtrer par auteur :</label>
          <input
              type="text"
              id="author-filter"
              value={authorFilter}
              onChange={handleAuthorFilterChange}
          />
        </div>
        <div>
          <label htmlFor="title-filter">Filtrer par titre :</label>
          <input
              type="text"
              id="title-filter"
              value={titleFilter}
              onChange={handleTitleFilterChange}
          />
        </div>
        {filteredBooks.map((book, index) => (
            <Book key={index} book={book} />
        ))}
      </div>
  );
};

export default Books;