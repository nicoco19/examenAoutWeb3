import React, { useEffect, useState } from "react";
import BookService from "services/books.js";
import { v4 as uuidv4 } from "uuid";

const Context = React.createContext(null);

const ProviderWrapper = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await BookService.getAll();
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const updateBookState = async (id, newState) => {
    console.log(`Updating state for book with id ${id}: ${newState}`);
    try {
      await BookService.update(id, { state: newState });
      console.log(`Updated state for book with id ${id}: ${newState}`);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, state: newState } : book
        )
      );
    } catch (error) {
      console.error(`Failed to update state for book with id ${id}:`, error);
    }
  };

  const addBook = async (newBook) => {
    console.log('Adding book:', {newBook});
    newBook.id = uuidv4();
    try {
      await BookService.create(newBook);
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error(`Failed to add book:`, error);
    }
  };

  const removeBook = async (id) => {
    console.log('Removing book:', {id});
    try {
      await BookService.remove(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error(`Failed to remove book:`, error);
    }
  }

  const exposedValue = {
    books,
    updateBookState,
    addBook,
    removeBook
  };

  return <Context.Provider value={exposedValue}>{children}</Context.Provider>;
};

export { Context, ProviderWrapper };