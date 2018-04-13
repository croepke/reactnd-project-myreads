import React, { Component } from 'react';

class Book extends Component {

  render() {
    const { details, onUpdate } = this.props;
    const thumbnail = 'imageLinks' in details ? details.imageLinks.thumbnail : '';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={details.shelf} onChange={(event) => onUpdate(details, event.target.value)}>
                <option value="base" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{details.title}</div>
          <div className="book-authors">{details.authors ? details.authors[0] : ''}</div>
        </div>
      </li>
    );
  }
}

export default Book;
