import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI.js';
import Bookshelf from './Bookshelf.js';

class Search extends Component {

  state = {
    query: '',
    // Holds the search results
    searchBooks: []
  }

  /**
  * @description Return the shelf for the given book (if exists)
  * @param {string} book - A book from the search API
  */
  getShelf = (book) => {
    // 1. Determine index in books state handed over from App.js
    const idx = this.props.books.findIndex(elem => elem.id === book.id);
    // 2. If book was found return the shelf, else none
    return idx >= 0 ? this.props.books[idx].shelf : 'none';
  }

  /**
  * @description Merges the searchBooks state with the shelves for the books
  * @param {string} books - Books from the search API
  */
  mergeShelfState = (books) => {
    if('error' in books) {
      return books.items;
    }

    // Get shelf state for each book result
    books = books
      .map((book) => {
        book.shelf = this.getShelf(book);
        return book;
      }
    )
    return books;
  }

  /**
  * @description Update query state and retrieve search results
  * @param {string} query - Search query
  */
  handleQueryUpdate = (query) => {

    // Update query
    this.setState(() => ({
      query: query.trim()
    }));

    // Trigger API search only with more than 2 characters
    if(query.length>=2) {
      BooksAPI.search(this.state.query)
      .then((searchBooks) => {
        // update results with merged in shelves from parent state
        this.setState(() => ({
          searchBooks: this.mergeShelfState(searchBooks)
        }))
      });
    }
    // else: reset
    else {
      this.setState({searchBooks: []});
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleQueryUpdate(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Bookshelf
              books={this.mergeShelfState(this.state.searchBooks)}
              onUpdate={this.props.onUpdate}
              search={true}/>
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
