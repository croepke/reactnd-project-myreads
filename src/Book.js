import React, { Component } from 'react';

class Book extends Component {

  render() {
    const { details } = this.props;
    console.log(details);
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${details.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={details.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{details.title}</div>
          <div className="book-authors">{details.authors[0]}</div>
        </div>
      </li>
    );
  }
}

export default Book;
