import React, { Component } from 'react';
import Book from './Book.js';

class Bookshelf extends Component {

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { this.props.books
              .filter((book) => (book.shelf === this.props.shelf))
              .map((book) => (<Book key={book.id} details={book} onUpdate={this.props.onUpdate} />))
          }
        </ol>
      </div>

    );
  }

}

export default Bookshelf;
