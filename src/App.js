import React from 'react';
import * as BooksAPI from './BooksAPI';
import Search from './Search.js';
import BookList from './BookList.js';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((ret) => {
        // Take a copy of current state and the book to be updated
        const books = [...this.state.books];
        const bookUpdated = {...book};
        // Update book with new shelf
        bookUpdated.shelf = shelf;
        // Get the array index where the updated book lives and update
        const idx = books.findIndex(elem => elem.id === book.id);
        // When book is found update (or remove)
        if(idx >= 0) {
          shelf === 'none' ? books.splice(idx, 1) : books[idx] = bookUpdated;
        }
        // If book is new (no index yet), add to books
        else {
          books.push(bookUpdated);
        }

        // Set new state
        this.setState((currentState) => ({
          books
        }));
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
            onUpdate={this.updateBook}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            books={this.state.books}
            onUpdate={this.updateBook}
          />
        )}/>
      </div>
      )
    }
  }


export default BooksApp;
