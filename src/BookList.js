import React, { Component } from 'react';
import Bookshelf from './Bookshelf.js';
import { Link } from 'react-router-dom';

class BookList extends Component {

  render() {
    return (
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
                books={this.props.books}
                onUpdate={this.props.onUpdate}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <Bookshelf
                shelf='wantToRead'
                books={this.props.books}
                onUpdate={this.props.onUpdate}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <Bookshelf
                shelf='read'
                books={this.props.books}
                onUpdate={this.props.onUpdate}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
