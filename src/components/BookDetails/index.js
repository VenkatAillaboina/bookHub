import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {bookData} = this.state
    const {
      title,
      authorName,
      coverPic,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookData

    return (
      <div className="book-details-card">
        <div className="book-info-container">
          <img src={coverPic} alt={title} className="cover-pic" />
          <div className="book-text-info">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <div className="book-details-rating-container">
              <p className="book-details-rating-text">Avg Rating</p>
              <BsFillStarFill className="book-details-star-icon" />
              <p className="book-details-rating-value">{rating}</p>
            </div>
            <p className="book-details-status">
              Status: <span className="status-text">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="about-section">
          <h2 className="about-heading">About Author</h2>
          <p className="about-text">{aboutAuthor}</p>
        </div>
        <div className="about-section">
          <h2 className="about-heading">About Book</h2>
          <p className="about-text">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView onRetry={this.getBookDetails} />

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">{this.renderBookDetails()}</div>
        <Footer />
      </>
    )
  }
}

export default BookDetails
