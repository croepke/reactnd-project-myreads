import React from 'react';
import * as BooksAPI from './BooksAPI';
import Search from './Search.js';
import Bookshelf from './Bookshelf.js';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
        books[idx] = bookUpdated;
        // Set new state
        this.setState((currentState) => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Bookshelf
                    shelf='currentlyReading'
                    books={this.state.books}
                    onUpdate={this.updateBook}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Bookshelf
                    shelf='wantToRead'
                    books={this.state.books}
                    onUpdate={this.updateBook}
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Bookshelf
                    shelf='read'
                    books={this.state.books}
                    onUpdate={this.updateBook}
                  />
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
