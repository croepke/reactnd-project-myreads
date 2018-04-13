import React, { Component } from 'react';
import Book from './Book.js';

class Bookshelf extends Component {

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            // When Bookshelf used to display search results: Don't filter
            this.props.books
              .filter((book) => (this.props.search === true ? true : book.shelf === this.props.shelf))
              .map((book) => (<Book key={book.id} details={book} onUpdate={this.props.onUpdate} />))
          }
        </ol>
      </div>

    );
  }

}

export default Bookshelf;
