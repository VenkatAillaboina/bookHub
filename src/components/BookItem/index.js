import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookDetails

  return (
    <li className="book-item">
      <Link to={`/books/${id}`} className="book-item-link">
        <img className="book-item-cover-pic" src={coverPic} alt={title} />
        <div className="book-item-details">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-item-author">{authorName}</p>
          <div className="book-item-rating-container">
            <p className="book-item-rating-text">Avg Rating</p>
            <BsFillStarFill className="book-item-star-icon" />
            <p className="book-item-rating-value">{rating}</p>
          </div>
          <p className="book-item-status">
            Status: <span className="book-item-status-value">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookItem
